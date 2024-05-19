interface Command {
  name: `--${string}`;
  run(args?: string[]): void | Promise<void>;
}

export { Command };
