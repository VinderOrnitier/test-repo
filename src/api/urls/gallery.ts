import axios, { AxiosResponse } from 'axios';

const MODULE_NAME = 'photos';

export const getGalleryUrl = (): string => `https://jsonplaceholder.typicode.com/${MODULE_NAME}/`;

export class GalleryService {
  static async getAll(limit = 10, page = 1): Promise<AxiosResponse> {
    const response = await axios.get(getGalleryUrl(), {
      params: {
        _limit: limit,
        _page: page,
      }
    });
    return response;
  }
}
