// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import { reducer as listReduser, MODULE_NAME as LIST_MODULE_NAME } from '../modules/userList'
// import { reducer as todoReduser, MODULE_NAME as TODO_MODULE_NAME } from '../modules/todoList'
import { reducer as userReducer } from '../modules/userList'
import { service as todoAPI } from '../modules/todoList';

export const createRootReducer = combineReducers({
  // [LIST_MODULE_NAME]: listReduser,
  // [TODO_MODULE_NAME]: todoReduser,
  userReducer,
  [todoAPI.reducerPath]: todoAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: createRootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware)
  })
}

export type RootState = ReturnType<typeof createRootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export const store = createStore(createRootReducer, applyMiddleware(thunk))