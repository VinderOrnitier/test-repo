import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { PATH } from '../../constants';
import { MODULE_API, MODULE_TAG, MODULE_URL } from './projectDetails.constants';
import { IComments, IPost } from './projectDetails.types';

export const postAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: PATH.SERVER}),
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