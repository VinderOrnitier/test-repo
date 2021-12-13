import React from 'react';
import { GUARD, PATH } from '../constants';
import { GalleryContainer } from '../modules/gallery';
import { KycContainer } from '../modules/kyc';
import { LoginContainer } from '../modules/login';
import { MainContainer } from '../modules/main';
import { PostDetailsContainer } from '../modules/postDetails';
import { PostListContainer } from '../modules/postList';
import { ProjectDetailsContainer } from '../modules/projectDetails';
import { TodoListContainer } from '../modules/todoList';
import { TransactionsContainer } from '../modules/transactions';
import { UsersListContainer } from '../modules/userList';

const getRoutes = () => [
  {
    path: PATH.LOGIN,
    exact: true,
    component: LoginContainer,
    loading: 'Routes loading for home page...',
    error: 'Routes error for Login page',
  },
  {
    path: PATH.ROOT,
    exact: true,
    component: MainContainer,
    error: 'Routes error for Main page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.GALLERY,
    exact: true,
    component: GalleryContainer,
    error: 'Routes error for Gallery page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.POSTS,
    exact: true,
    component: PostListContainer,
    error: 'Routes error for Post List page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.POST,
    exact: true,
    component: PostDetailsContainer,
    error: 'Routes error for Post Details page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.USERS, // just for test reasons
    exact: true,
    component: UsersListContainer,
    error: 'Routes error for Users List page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.TODOS, // just for test reasons
    exact: true,
    component: TodoListContainer,
    error: 'Routes error for Todo List page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.TRANSACTIONS,
    exact: true,
    component: TransactionsContainer,
    error: 'Routes error for Transactions page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  {
    path: PATH.KYC,
    exact: true,
    component: KycContainer,
    error: 'Custom error for Kyc page',
    meta: {
      [GUARD.AUTH_ONLY]: true
    }
  },
  
  {
    path: PATH.PROJECT_DETAILS,
    exact: true,
    component: ProjectDetailsContainer,
    error: 'Routes error for Project Details page',
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