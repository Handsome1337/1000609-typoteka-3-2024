import chalk from 'chalk';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJsonFile = require('../../../package.json');
import type { Command } from './types.js';

const command: Command = {
  name: '--version',
  run() {
    const version = packageJsonFile.version;
    console.info(chalk.magentaBright(version));
  }
};

export default command;
