import { Router } from 'express';
import { HttpCode } from '../../constants.js';
import type { SearchDataService } from '../types.js';

export default (app: Router, service: SearchDataService): void => {
  const route = Router();

  app.use('/search', route);

  route.get('/', (req, res) => {
    const query = req.query.query;

    if (!query || typeof query !== 'string') {
      return res.status(HttpCode.BadRequest).json([]);
    }

    const searchResults = service.findAll(query);
    const searchStatus = searchResults.length > 0 ? HttpCode.Ok : HttpCode.NotFound;

    res.status(searchStatus).json(searchResults);
  });
};
