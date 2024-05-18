import chalk from 'chalk';
import type { Command } from './types.js';

const text = `${chalk.cyan('Программа формирует файл с данными для API.')}
    ${chalk.bold('Гайд')}:
    ${chalk.cyanBright('service.js <command>')}
    ${chalk.bold('Команды')}:
    ${chalk.cyanBright.bold('--version')}:            ${chalk.green('выводит номер версии')}
    ${chalk.cyanBright.bold('--help')}:               ${chalk.green('печатает этот текст')}
    ${chalk.cyanBright.bold('--generate <count>')}:   ${chalk.green('формирует файл mocks.json')}`;

const command: Command = {
  name: '--help',
  run() {
    console.info(text);
  }
};

export default command;
