import { Router } from 'express';
import category from './category.js';
import post from './post.js';
import search from './search.js';
import getMockData from '../lib/get-mock-data.js';
import {
  CategoryService,
  SearchService,
  PostService,
  CommentService
} from '../data-service/index.js';

const getRoutes = async (): Promise<Router> => {
  const app = Router();

  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  post(app, new PostService(mockData), new CommentService());

  return app;
};

export default getRoutes;
