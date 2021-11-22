import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducer as userReducer } from '../modules/userList';
import { service as todoAPI } from '../modules/todoList';
import { service as postAPI } from '../modules/postList';
import { service as postDetailsAPI } from '../modules/postDetails';
import { service as galleryAPI } from '../modules/gallery';

export const createRootReducer = combineReducers({
  userReducer, // base Redux functionality with reduxjs/toolkit examples
  [todoAPI.reducerPath]: todoAPI.reducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [postDetailsAPI.reducerPath]: postDetailsAPI.reducer,
  [galleryAPI.reducerPath]: galleryAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: createRootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        todoAPI.middleware,
        postAPI.middleware,
        postDetailsAPI.middleware,
        galleryAPI.middleware,
      ]),
  });
};

export type RootState = ReturnType<typeof createRootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
