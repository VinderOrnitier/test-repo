import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as CONSTANTS from './todoList.constants'
import IAction from '../../interfaces/IAction';
import { ITodoState } from './todoList.types';
import axios from "axios";
import getResponseErrorMessage from "../../helpers/getResponseErrorMassage";

export const fetchTodoRequest = (): IAction => ({
  type: CONSTANTS.TODO_REQUEST,
})

export const fetchTodoSuccess = (todos: ITodoState): IAction => ({
  type: CONSTANTS.TODO_SUCCESS,
  payload: todos
})

export const fetchTodoFailure = (error: any): IAction => ({
  type: CONSTANTS.TODO_FAILURE,
  payload: error,
  error,
})

export const setTodoPage = (page: number): any => ({
  type: CONSTANTS.SET_TODO_PAGE,
  payload: page, // eslint-disable-line
})

export const fetchTodo = (page = 1, itemsLimit = 10): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any,
): Promise<void> => {
  try {
    dispatch(fetchTodoRequest());
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
      params: { _page: page, _limit: itemsLimit }
    })
    const todos = response.data
    setTimeout(() => { // simulate long loading
      dispatch(fetchTodoSuccess(todos));
    }, 500)
  } catch (error) {
    dispatch(fetchTodoFailure(getResponseErrorMessage(error)));
  }
}

export const setPage = (page: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  dispatch(setTodoPage(page));
}