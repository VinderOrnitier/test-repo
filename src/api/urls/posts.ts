import axios, { AxiosResponse } from 'axios';

const MODULE_NAME = 'posts';

export const getPostsUrl = (): string => `http://localhost:5000/${MODULE_NAME}/`;

export class PostService {
  static async getAll(limit = 10, page = 1): Promise<AxiosResponse> {
    const response = await axios.get(getPostsUrl(), {
      params: {
        _limit: limit,
        _page: page,
      }
    });
    return response;
  }
  static async getPost(id: string): Promise<AxiosResponse> {
    const response = await axios.get(getPostsUrl() + id);
    return response;
  }
  static async getPostComments(id: string): Promise<AxiosResponse> {
    const response = await axios.get(getPostsUrl() + id + '/comments');
    return response;
  }
}
