import chalk from 'chalk';
import { readFile, writeFile } from 'node:fs/promises';
import { ExitCode } from '../../constants.js';
import { getRandomInt, getRandomDate, shuffleAndSlice } from '../../utils.js';
import type { Article, Command } from './types.js';

const DEFAULT_ARTICLES_COUNT = 1;
const MAX_ARTICLES_COUNT = 1000;
const MAX_ANNOUNCE_COUNT = 5;
const FILE_NAME = 'mocks.json';

const FILE_TITLES_PATH = './data/titles.txt';
const FILE_SENTENCES_PATH = './data/sentences.txt';
const FILE_CATEGORIES_PATH = './data/categories.txt';

const readContent = async (filePath: string): Promise<string[]> => {
  try {
    const content = await readFile(filePath, 'utf8');
    return content.trim().split('\n');
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateMockData = (
  count: number,
  titles: string[],
  sentences: string[],
  categories: string[]
): Article[] =>
  Array.from({ length: count }, () => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffleAndSlice(sentences, MAX_ANNOUNCE_COUNT).join(' '),
    fullText: shuffleAndSlice(sentences).join(' '),
    categories: shuffleAndSlice(categories)
  }));

const command: Command = {
  name: '--generate',
  async run(args) {
    const count = args?.[0]
      ? Number.parseInt(args[0], 10) || DEFAULT_ARTICLES_COUNT
      : DEFAULT_ARTICLES_COUNT;
    const [titles, sentences, categories] = await Promise.all([
      readContent(FILE_TITLES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_CATEGORIES_PATH)
    ]);

    if (count > MAX_ARTICLES_COUNT) {
      console.error(chalk.red('Не больше 1000 публикаций'));
      process.exit(ExitCode.Error);
    }

    const content = JSON.stringify(
      generateMockData(count, titles, sentences, categories)
    );

    try {
      await writeFile(FILE_NAME, content);
      console.info(chalk.green('Операция выполнена успешно. Файл создан.'));
    } catch {
      console.error(chalk.red('Не удаётся записать данные в файл...'));
      process.exit(ExitCode.Error);
    }
  }
};

export default command;
