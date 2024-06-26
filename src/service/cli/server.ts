import chalk from 'chalk';
import express from 'express';
import { HttpCode, NOT_FOUND_MESSAGE_TEXT } from '../../constants.js';
import getRoutes from '../api/api.js';
import type { Command } from './types.js';

const DEFAULT_PORT = 3000;
const API_PREFIX = '/api';

const command: Command = {
  name: '--server',
  async run(args) {
    const port = args?.[0] ? Number.parseInt(args[0], 10) || DEFAULT_PORT : DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(API_PREFIX, await getRoutes());
    app.use((_req, res) => res.status(HttpCode.NotFound).send(NOT_FOUND_MESSAGE_TEXT));

    app
      .listen(port, () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on('error', ({ message }) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  }
};

export default command;
