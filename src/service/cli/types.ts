interface Command {
  name: `--${string}`;
  run(args?: string[]): void | Promise<void>;
}

interface Comment {
  id: string;
  text: string;
}

interface Article {
  id: string;
  title: string;
  createdDate: string;
  announce: string;
  fullText: string;
  categories: string[];
  comments: Comment[];
}

export { Command, Comment, Article };
