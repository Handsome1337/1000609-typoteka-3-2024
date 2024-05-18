interface Command {
  name: `--${string}`;
  run(args?: string[]): void | Promise<void>;
}

interface Article {
  title: string;
  createdDate: string;
  announce: string;
  fullText: string;
  categories: string[];
}

export { Command, Article };
