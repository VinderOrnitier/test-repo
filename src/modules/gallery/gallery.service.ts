import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { PATH } from '../../constants';
import { MODULE_API, MODULE_TAG, MODULE_URL } from './gallery.constants';
import { IPhoto } from './gallery.types';

export const galleryAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: PATH.SERVER}),
  tagTypes: [MODULE_TAG],
  endpoints: (build) => ({
    fetchAllPhotos: build.query<IPhoto[], { limit: number, page: number }>({ // IPhoto[], { limit: number, page: number }
      query: ({limit = 10, page = 1}) => ({
        url: MODULE_URL,
        params: {
          _limit: limit,
          _page: page,
        }
      }),
      providesTags: result => [MODULE_TAG]
    }),
  })
});

export default galleryAPI;