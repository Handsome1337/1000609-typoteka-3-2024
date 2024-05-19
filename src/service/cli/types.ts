interface Command {
  name: `--${string}`;
  run(args?: string[]): void | Promise<void>;
}

interface Article {
  id: string;
  title: string;
  createdDate: string;
  announce: string;
  fullText: string;
  categories: string[];
}

export { Command, Article };
