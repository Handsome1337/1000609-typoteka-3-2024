import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HttpCode } from '../constants.js';
import mainRoutes from './routes/main-routes.js';
import myRoutes from './routes/my-routes.js';
import articlesRoutes from './routes/articles-routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PORT = 8080;
const PUBLIC_DIR = 'public';

const app = express();

app.set('views', resolve(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(express.static(resolve(__dirname, PUBLIC_DIR)));
app.use('/', mainRoutes);
app.use('/my', myRoutes);
app.use('/articles', articlesRoutes);
app.use((_req, res) => res.status(HttpCode.BadRequest).render('errors/400'));
app.use(((_err, _req, res, _next) =>
  res.status(HttpCode.InternalServerError).render('errors/500')) as ErrorRequestHandler);

app.listen(DEFAULT_PORT);
