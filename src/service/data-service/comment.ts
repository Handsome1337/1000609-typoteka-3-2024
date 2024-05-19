import { nanoid } from 'nanoid';
import { MAX_ID_LENGTH } from '../../constants.js';
import type { Article, Comment, CommentDataService } from '../types.js';

class CommentService implements CommentDataService {
  create(post: Article, comment: Comment): Comment {
    const newComment = Object.assign({ id: nanoid(MAX_ID_LENGTH) }, comment);

    post.comments.push(newComment);
    return newComment;
  }

  findAll(post: Article): Comment[] {
    return post.comments;
  }

  drop(post: Article, commentId: string): Comment | null {
    const dropComment = post.comments.find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    post.comments = post.comments.filter((item) => item.id !== commentId);

    return dropComment;
  }
}

export default CommentService;
