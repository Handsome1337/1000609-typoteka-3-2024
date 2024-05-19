import { Router } from 'express';

const myRouter = Router();

myRouter.get('/', (req, res) => res.send(req.originalUrl));
myRouter.get('/comments', (req, res) => res.send(req.originalUrl));
myRouter.get('/categories', (req, res) => res.send(req.originalUrl));

export default myRouter;
