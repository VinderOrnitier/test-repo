import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { MODULE_API, MODULE_TAG, MODULE_URL } from './postDetails.constants';
import { IComments, IPost } from './postDetails.types';

export const postAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: [MODULE_TAG],
  endpoints: (build) => ({
    fetchPost: build.query<IPost, string>({
      query: (id) => ({
        url: `${MODULE_URL}/${id}`,
      }),
      providesTags: result => [MODULE_TAG]
    }),
    fetchComments: build.query<IComments, string>({
      query: (id) => ({
        url: `${MODULE_URL}/${id}?_embed=comments`,
      }),
      providesTags: result => [MODULE_TAG]
    }),
  })
});

export default postAPI;