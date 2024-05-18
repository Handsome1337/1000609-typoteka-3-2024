import chalk from 'chalk';
import { writeFile } from 'node:fs/promises';
import { ExitCode } from '../../constants.js';
import { getRandomInt, getRandomDate, shuffleAndSlice } from '../../utils.js';
import type { Article, Command } from './types.js';

const DEFAULT_ARTICLES_COUNT = 1;
const MAX_ARTICLES_COUNT = 1000;
const MAX_ANNOUNCE_COUNT = 5;
const FILE_NAME = 'mocks.json';

const TITLES: string[] = [
  'Ёлки. История деревьев',
  'Как перестать беспокоиться и начать жить',
  'Как достигнуть успеха не вставая с кресла',
  'Обзор новейшего смартфона',
  'Лучшие рок-музыканты 20-века',
  'Как начать программировать',
  'Учим HTML и CSS',
  'Что такое золотое сечение',
  'Как собрать камни бесконечности',
  'Борьба с прокрастинацией',
  'Рок — это протест',
  'Самый лучший музыкальный альбом этого года'
];

const SENTENCES: string[] = [
  'Ёлки — это не просто красивое дерево.',
  'Это прочная древесина.',
  'Первая большая ёлка была установлена только в 1938 году.',
  'Вы можете достичь всего.',
  'Стоит только немного постараться и запастись книгами.',
  'Этот смартфон — настоящая находка.',
  'Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',
  'Золотое сечение — соотношение двух величин, гармоническая пропорция.',
  'Собрать камни бесконечности легко, если вы прирожденный герой.',
  'Освоить вёрстку несложно.',
  'Возьмите книгу новую книгу и закрепите все упражнения на практике.',
  'Бороться с прокрастинацией несложно.',
  'Просто действуйте.',
  'Маленькими шагами.',
  'Программировать не настолько сложно, как об этом говорят.',
  'Простые ежедневные упражнения помогут достичь успеха.',
  'Это один из лучших рок-музыкантов.',
  'Он написал больше 30 хитов.',
  'Из под его пера вышло 8 платиновых альбомов.',
  'Процессор заслуживает особого внимания.',
  'Он обязательно понравится геймерам со стажем.',
  'Рок-музыка всегда ассоциировалась с протестами.',
  'Так ли это на самом деле?',
  'Достичь успеха помогут ежедневные повторения.',
  'Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
  'Как начать действовать?',
  'Для начала просто соберитесь.',
  'Игры и программирование разные вещи.',
  'Не стоит идти в программисты, если вам нравятся только игры.',
  'Альбом стал настоящим открытием года.',
  'Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.'
];

const CATEGORIES: string[] = [
  'Деревья',
  'За жизнь',
  'Без рамки',
  'Разное',
  'IT',
  'Музыка',
  'Кино',
  'Программирование',
  'Железо'
];

const generateMockData = (count: number): Article[] =>
  Array.from({ length: count }, () => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffleAndSlice(SENTENCES, MAX_ANNOUNCE_COUNT).join(' '),
    fullText: shuffleAndSlice(SENTENCES).join(' '),
    categories: shuffleAndSlice(CATEGORIES)
  }));

const command: Command = {
  name: '--generate',
  async run(args) {
    const count = args?.[0]
      ? Number.parseInt(args[0], 10) || DEFAULT_ARTICLES_COUNT
      : DEFAULT_ARTICLES_COUNT;

    if (count > MAX_ARTICLES_COUNT) {
      console.error(chalk.red('Не больше 1000 публикаций'));
      process.exit(ExitCode.Error);
    }

    const content = JSON.stringify(generateMockData(count));

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
