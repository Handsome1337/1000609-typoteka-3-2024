import { Router } from 'express';

const articlesRouter = Router();

articlesRouter.get('/add', (_req, res) => res.render('articles/post'));
articlesRouter.get('/category/:id', (_req, res) =>
  res.render('articles/articles-by-category')
);
articlesRouter.get('/:id', (_req, res) => res.render('articles/post-detail'));
articlesRouter.get('/edit/:id', (_req, res) => res.render('articles/post-detail'));

export default articlesRouter;
