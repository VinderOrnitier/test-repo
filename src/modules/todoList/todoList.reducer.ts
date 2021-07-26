import IAction from '../../interfaces/IAction';
import * as CONSTANTS from './todoList.constants'
import { ITodoState } from './todoList.types';

const initialState: ITodoState = {
  todos: [],
  loading: false,
  error: null,
  page: 1,
  itemsLimit: 10,
}

export default (state = initialState, action: IAction): ITodoState => {
  switch (action.type) {
    case CONSTANTS.TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CONSTANTS.TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      }
    case CONSTANTS.TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
      
    case CONSTANTS.SET_TODO_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state
  }
}