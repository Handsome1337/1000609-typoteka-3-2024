import type { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST_MESSAGE_TEXT, HttpCode } from '../../constants.js';

const postKeys = ['category', 'announce', 'fullText', 'title', 'createdDate'];

export default (req: Request, res: Response, next: NextFunction): void => {
  const newPost = req.body;
  const keys = Object.keys(newPost);
  const keysExists = postKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BadRequest).send(BAD_REQUEST_MESSAGE_TEXT);
    return;
  }

  return next();
};
