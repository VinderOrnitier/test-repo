import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { PATH } from '../../constants';
import { MODULE_API, MODULE_TAG } from './transactions.constants';
import { ITransactions } from './transactions.types';

export const todoAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: PATH.SERVER}),
  tagTypes: [MODULE_TAG],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITransactions[], number>({
      query: (limit: number = 5) => ({
        url: '/todos',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => [MODULE_TAG]
    }),
    createTodo: build.mutation<ITransactions, ITransactions>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    updateTodo: build.mutation<ITransactions, ITransactions>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    deleteTodo: build.mutation<ITransactions, ITransactions>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [MODULE_TAG]
    })
  })
});

export default todoAPI;