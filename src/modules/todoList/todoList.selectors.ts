import { createSelector } from "reselect";
import { MODULE_NAME } from './todoList.constants';
import { ITodoState } from "./todoList.types";

const selectState = (state: { [MODULE_NAME]: ITodoState }): ITodoState => state[MODULE_NAME];

export const getTodoList = createSelector(selectState, (state: ITodoState): ITodoState => ({
  todos: state.todos,
  loading: state.loading,
  error: state.error,
  page: state.page,
  itemsLimit: state.itemsLimit,
}));