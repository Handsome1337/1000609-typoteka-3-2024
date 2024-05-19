import type { Article, CategoryDataService } from '../types.js';

class CategoryService implements CategoryDataService {
  constructor(private posts: Article[]) {}

  findAll(): string[] {
    const categories = this.posts.reduce((acc, post) => {
      post.categories.forEach((category) => acc.add(category));
      return acc;
    }, new Set<string>());

    return [...categories];
  }
}

export default CategoryService;
