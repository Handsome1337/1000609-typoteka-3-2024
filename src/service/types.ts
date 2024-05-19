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

interface CategoryDataService {
  findAll(): string[];
}

interface CommentDataService {
  create(post: Article, comment: Comment): Comment;
  findAll(post: Article): Comment[];
  drop(post: Article, commentId: string): Comment | null;
}

interface PostDataService {
  create(post: Article): Article;
  findAll(): Article[];
  findOne(id: string): Article | undefined;
  update(id: string, post: Article): Article | null;
  drop(id: string): Article | null;
}

interface SearchDataService {
  findAll(searchText: string): Article[];
}

export {
  Comment,
  Article,
  CategoryDataService,
  CommentDataService,
  PostDataService,
  SearchDataService
};
