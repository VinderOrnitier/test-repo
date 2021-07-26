import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { reducer as listReduser, MODULE_NAME as LIST_MODULE_NAME } from '../modules/userList'
import { reducer as todoReduser, MODULE_NAME as TODO_MODULE_NAME } from '../modules/todoList'

// import { persistStore, persistReducer } from "redux-persist";

// export default (): { store: any; persistor: any } => {
//   const composer: Function = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose,
//   const store: anyy = createStore(
//     persistReducer,
//   );
//   const persistor = persistStore(store);
//   fetchDictionaries(store);
//   return { store, persistor }
// }

export const createRootReducer = combineReducers({
  [LIST_MODULE_NAME]: listReduser,
  [TODO_MODULE_NAME]: todoReduser,
})

export type RootState = ReturnType<typeof createRootReducer>

export const store = createStore(createRootReducer, applyMiddleware(thunk))