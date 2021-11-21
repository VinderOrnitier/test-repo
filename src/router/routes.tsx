import React from 'react';
import { GUARD, PATH } from '../constants';
import { GalleryContainer } from '../modules/gallery';
import { LoginContainer } from '../modules/login';
import { MainContainer } from '../modules/main';
import { PostDetailsContainer } from '../modules/postDetails';
import { PostListContainer } from '../modules/postList';
import { TodoListContainer } from '../modules/todoList';
import { UsersListContainer } from '../modules/userList';

const getRoutes = () => [
  {
    path: PATH.LOGIN,
    exact: true,
    component: LoginContainer,
    loading: 'Custom loading for home page...',
    error: 'Custom error for home page',
  },
  {
    path: PATH.ROOT,
    exact: true,
    component: MainContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.GALLERY,
    exact: true,
    component: GalleryContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.POSTS,
    exact: true,
    component: PostListContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.POST,
    exact: true,
    component: PostDetailsContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.USERS, // just for test reasons
    exact: true,
    component: UsersListContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.TODOS, // just for test reasons
    exact: true,
    component: TodoListContainer,
    error: 'Custom error for home page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: '*',
    component: () => (<div className="text-center text-3xl font-bold">Page not found 404</div>),
    ignoreGlobal: true,
  },
];

export default getRoutes