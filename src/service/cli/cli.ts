import generate from './generate.js';
import help from './help.js';
import version from './version.js';
import server from './server.js';
import type { Command } from './types.js';

const Cli: Record<string, Command> = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server
};

export default Cli;
