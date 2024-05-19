import type { Article, SearchDataService } from '../types.js';

class SearchService implements SearchDataService {
  constructor(private posts: Article[]) {}

  findAll(searchText: string): Article[] {
    return this.posts.filter((post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

export default SearchService;
