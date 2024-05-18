import chalk from 'chalk';
import { createServer } from 'node:http';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { HttpCode, MOCKS_FILE_NAME } from '../../constants.js';
import type { Article, Command } from './types.js';

const DEFAULT_PORT = 3000;
const NOT_FOUND_MESSAGE_TEXT = 'Не найдено';

const sendResponse = (res: ServerResponse, statusCode: number, message: string): void => {
  const template = `<!Doctype html>
<html lang="ru">
  <head>
    <title>With love from Node</title>
  </head>
  <body>${message}</body>
</html>`;

  res
    .writeHead(statusCode, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    .end(template);
};

const onClientConnect = (req: IncomingMessage, res: ServerResponse): void => {
  switch (req.url) {
    case '/':
      readFile(MOCKS_FILE_NAME)
        .then((fileContent) => {
          const mocks: Article[] = JSON.parse(fileContent.toString());
          const message = mocks.map(({ title }) => `<li>${title}</li>`).join('');
          sendResponse(res, HttpCode.Ok, `<ul>${message}</ul>`);
        })
        .catch(() => {
          sendResponse(res, HttpCode.NotFound, NOT_FOUND_MESSAGE_TEXT);
        });

      break;
    default:
      sendResponse(res, HttpCode.NotFound, NOT_FOUND_MESSAGE_TEXT);
      break;
  }
};

const command: Command = {
  name: '--server',
  run(args) {
    const port = args?.[0] ? Number.parseInt(args[0], 10) || DEFAULT_PORT : DEFAULT_PORT;

    createServer(onClientConnect)
      .listen(port)
      .on('listening', () => {
        console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on('error', ({ message }) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  }
};

export default command;
