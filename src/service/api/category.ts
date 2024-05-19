import { Router } from 'express';
import { HttpCode } from '../../constants.js';
import type { CategoryDataService } from '../types.js';

export default (app: Router, service: CategoryDataService): void => {
  const route = Router();

  app.use('/categories', route);

  route.get('/', (_req, res) => {
    const categories = service.findAll();
    res.status(HttpCode.Ok).json(categories);
  });
};
