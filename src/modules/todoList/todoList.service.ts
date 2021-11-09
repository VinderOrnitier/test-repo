import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { MODULE_API, MODULE_TAG } from './todoList.constants';
import { ITodo } from './todoList.types';

export const todoAPI = createApi({
  reducerPath: MODULE_API,
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: [MODULE_TAG],
  endpoints: (build) => ({
    fetchAllTodos: build.query<ITodo[], number>({
      query: (limit: number = 5) => ({
        url: '/todos',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => [MODULE_TAG]
    }),
    createTodo: build.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    updateTodo: build.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: [MODULE_TAG]
    }),
    deleteTodo: build.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [MODULE_TAG]
    })
  })
});

export default todoAPI;