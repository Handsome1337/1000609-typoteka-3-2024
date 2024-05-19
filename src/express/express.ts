import express from 'express';
import mainRoutes from './routes/main-routes.js';
import myRoutes from './routes/my-routes.js';
import articlesRoutes from './routes/articles-routes.js';

const DEFAULT_PORT = 8080;

const app = express();

app.use('/', mainRoutes);
app.use('/my', myRoutes);
app.use('/articles', articlesRoutes);

app.listen(DEFAULT_PORT);
