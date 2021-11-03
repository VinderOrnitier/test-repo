// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import { reducer as listReduser, MODULE_NAME as LIST_MODULE_NAME } from '../modules/userList'
import userReducer from '../modules/userList/userList.reducer'
import { reducer as todoReduser, MODULE_NAME as TODO_MODULE_NAME } from '../modules/todoList'


export const createRootReducer = combineReducers({
  // [LIST_MODULE_NAME]: listReduser,
  userReducer,
  [TODO_MODULE_NAME]: todoReduser,
})

export type RootState = ReturnType<typeof createRootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export const store = createStore(createRootReducer, applyMiddleware(thunk))

export const setupStore = () => {
  return configureStore({
    reducer: createRootReducer
  })
}