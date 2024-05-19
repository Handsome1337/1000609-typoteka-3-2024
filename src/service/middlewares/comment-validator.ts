import type { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST_MESSAGE_TEXT, HttpCode } from '../../constants.js';

const commentKeys = ['text'];

export default (req: Request, res: Response, next: NextFunction): void => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BadRequest).send(BAD_REQUEST_MESSAGE_TEXT);
    return;
  }

  return next();
};
