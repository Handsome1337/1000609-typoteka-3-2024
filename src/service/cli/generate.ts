import chalk from 'chalk';
import { nanoid } from 'nanoid';
import { readFile, writeFile } from 'node:fs/promises';
import {
  CommentsRestrict,
  ExitCode,
  MAX_ID_LENGTH,
  MOCKS_FILE_NAME
} from '../../constants.js';
import { getRandomInt, getRandomDate, shuffleAndSlice } from '../../utils.js';
import type { Article, Comment } from '../types.js';
import type { Command } from './types.js';

const DEFAULT_ARTICLES_COUNT = 1;
const MAX_ARTICLES_COUNT = 1000;
const MAX_ANNOUNCE_COUNT = 5;

const FILE_TITLES_PATH = './data/titles.txt';
const FILE_SENTENCES_PATH = './data/sentences.txt';
const FILE_CATEGORIES_PATH = './data/categories.txt';
const FILE_COMMENTS_PATH = './data/comments.txt';

const readContent = async (filePath: string): Promise<string[]> => {
  try {
    const content = await readFile(filePath, 'utf8');
    return content.trim().split('\n');
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count: number, comments: string[]): Comment[] =>
  Array.from({ length: count }, () => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffleAndSlice(comments).join(' ')
  }));

const generateMockData = ({
  count,
  titles,
  sentences,
  categories,
  comments
}: {
  count: number;
  titles: string[];
  sentences: string[];
  categories: string[];
  comments: string[];
}): Article[] =>
  Array.from({ length: count }, () => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffleAndSlice(sentences, MAX_ANNOUNCE_COUNT).join(' '),
    fullText: shuffleAndSlice(sentences).join(' '),
    categories: shuffleAndSlice(categories),
    comments: generateComments(
      getRandomInt(CommentsRestrict.Min, CommentsRestrict.Max),
      comments
    )
  }));

const command: Command = {
  name: '--generate',
  async run(args) {
    const count = args?.[0]
      ? Number.parseInt(args[0], 10) || DEFAULT_ARTICLES_COUNT
      : DEFAULT_ARTICLES_COUNT;
    const [titles, sentences, categories, comments] = await Promise.all([
      readContent(FILE_TITLES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    if (count > MAX_ARTICLES_COUNT) {
      console.error(chalk.red('Не больше 1000 публикаций'));
      process.exit(ExitCode.Error);
    }

    const content = JSON.stringify(
      generateMockData({ count, titles, sentences, categories, comments })
    );

    try {
      await writeFile(MOCKS_FILE_NAME, content);
      console.info(chalk.green('Операция выполнена успешно. Файл создан.'));
    } catch {
      console.error(chalk.red('Не удаётся записать данные в файл...'));
      process.exit(ExitCode.Error);
    }
  }
};

export default command;
