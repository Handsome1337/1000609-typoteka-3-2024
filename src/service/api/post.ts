import { Router } from 'express';
import type { Request, Response } from 'express';
import { HttpCode, NOT_FOUND_MESSAGE_TEXT } from '../../constants.js';
import { postValidator, postExist, commentValidator } from '../middlewares/index.js';
import type { CommentDataService, PostDataService } from '../types.js';

export default (
  app: Router,
  postService: PostDataService,
  commentService: CommentDataService
): void => {
  const route = Router();

  app.use('/articles', route);

  route.get('/', (_req, res) => {
    const posts = postService.findAll();
    res.status(HttpCode.Ok).json(posts);
  });

  route.get('/:articleId', (req, res) => {
    const { articleId: postId } = req.params;
    const post = postService.findOne(postId);

    if (!post) {
      return res.status(HttpCode.NotFound).send(`Не найдено ${postId}`);
    }

    res.status(HttpCode.Ok).json(post);
  });

  route.post('/', postValidator, (req, res) => {
    const post = postService.create(req.body);
    res.status(HttpCode.Created).json(post);
  });

  route.put('/:articleId', postValidator, (req, res) => {
    const { articleId: postId } = req.params;
    const existPost = postService.findOne(postId);

    if (!existPost) {
      return res.status(HttpCode.NotFound).send(`Не найдено ${postId}`);
    }

    const updatedPost = postService.update(postId, req.body);
    res.status(HttpCode.Ok).json(updatedPost);
  });

  route.delete('/:articleId', (req, res) => {
    const { articleId: postId } = req.params;
    const post = postService.drop(postId);

    if (!post) {
      return res.status(HttpCode.NotFound).send(NOT_FOUND_MESSAGE_TEXT);
    }

    res.status(HttpCode.Ok).json(post);
  });

  route.get('/:articleId/comments', postExist(postService), (_req, res) => {
    const { post } = res.locals;
    const comments = commentService.findAll(post);

    res.status(HttpCode.Ok).json(comments);
  });

  route.delete('/:articleId/comments/:commentId', postExist(postService), (req, res) => {
    const { post } = res.locals;
    const { commentId } = req.params;
    const deletedComment = commentService.drop(post, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NotFound).send(NOT_FOUND_MESSAGE_TEXT);
    }

    res.status(HttpCode.Ok).json(deletedComment);
  });

  route.post(
    '/:articleId/comments',
    [postExist(postService), commentValidator],
    (req: Request, res: Response) => {
      const { post } = res.locals;
      const comment = commentService.create(post, req.body);

      res.status(HttpCode.Created).json(comment);
    }
  );
};
