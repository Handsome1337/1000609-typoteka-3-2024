import { ExitCode } from '../constants.js';
import Cli from './cli/cli.js';

const DEFAULT_COMMAND = '--help';
const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (!userArguments.length || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.Success);
}

Cli[userCommand].run(userArguments.slice(1));
