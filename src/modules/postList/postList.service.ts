import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { MODULE_API, MODULE_TAG, MODULE_URL } from './postList.constants';
import { IPost } from './postList.types';

export const postAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: [MODULE_TAG],
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], { limit: number, page: number }>({
      query: ({limit = 10, page = 1}) => ({
        url: MODULE_URL,
        params: {
          _limit: limit,
          _page: page,
        }
      }),
      providesTags: result => [MODULE_TAG]
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: MODULE_URL,
        method: 'POST',
        body: post
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `${MODULE_URL}/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `${MODULE_URL}/${post.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [MODULE_TAG]
    })
  })
});

export default postAPI;