import { nanoid } from 'nanoid';
import { MAX_ID_LENGTH } from '../../constants.js';
import type { Article, PostDataService } from '../types.js';

class PostService implements PostDataService {
  constructor(private posts: Article[]) {}

  create(post: Article): Article {
    const newPost = Object.assign({ id: nanoid(MAX_ID_LENGTH), comments: [] }, post);

    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Article[] {
    return this.posts;
  }

  findOne(id: string): Article | undefined {
    return this.posts.find((item) => item.id === id);
  }

  update(id: string, post: Article): Article | null {
    const oldPost = this.posts.find((item) => item.id === id);

    return oldPost ? Object.assign(oldPost, post) : null;
  }

  drop(id: string): Article | null {
    const post = this.posts.find((item) => item.id === id);

    if (!post) {
      return null;
    }

    this.posts = this.posts.filter((item) => item.id !== id);
    return post;
  }
}

export default PostService;
