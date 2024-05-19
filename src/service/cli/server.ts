import chalk from 'chalk';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { HttpCode, MOCKS_FILE_NAME } from '../../constants.js';
import type { Command } from './types.js';

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE_TEXT = 'Не найдено';

const { Router } = express;

const command: Command = {
  name: '--server',
  run(args) {
    const port = args?.[0] ? Number.parseInt(args[0], 10) || DEFAULT_PORT : DEFAULT_PORT;

    const postsRouter = Router();
    postsRouter.get('/', async (_req, res) => {
      try {
        const fileContent = await readFile(MOCKS_FILE_NAME);
        const mocks = JSON.parse(fileContent.toString());
        res.json(mocks);
      } catch {
        res.send([]);
      }
    });

    const app = express();
    app.use(express.json());
    app.use('/posts', postsRouter);
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
