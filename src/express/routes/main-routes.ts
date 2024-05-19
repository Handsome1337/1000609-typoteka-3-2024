import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (req, res) => res.send(req.originalUrl));
mainRouter.get('/register', (req, res) => res.send(req.originalUrl));
mainRouter.get('/login', (req, res) => res.send(req.originalUrl));
mainRouter.get('/search', (req, res) => res.send(req.originalUrl));

export default mainRouter;
