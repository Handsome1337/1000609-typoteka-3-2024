import type { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../constants.js';
import type { PostDataService } from '../types.js';

export default (service: PostDataService) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { articleId: postId } = req.params;
    const post = service.findOne(postId);

    if (!post) {
      res.status(HttpCode.NotFound).send(`Публикация ${postId} не найдена`);
      return;
    }

    res.locals.post = post;
    return next();
  };
