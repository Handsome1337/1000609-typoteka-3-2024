import { Router } from 'express';

const myRouter = Router();

myRouter.get('/', (_req, res) => res.render('user/my'));
myRouter.get('/comments', (_req, res) => res.render('user/comments'));
myRouter.get('/categories', (_req, res) => res.render('user/all-categories'));

export default myRouter;
