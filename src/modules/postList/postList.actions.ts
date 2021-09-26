import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { AnyAction } from 'redux';

import * as CONSTANTS from './postList.constants';
import IAction from '../../interfaces/IAction';
import { IUserState } from './postList.types';

import getResponseErrorMessage from '../../helpers/getResponseErrorMassage';

export const fetchUserRequest = (): IAction => ({
  type: CONSTANTS.POSTS_REQUEST,
});

export const fetchUserSuccess = (users: IUserState): IAction => ({
  type: CONSTANTS.POSTS_SUCCESS,
  payload: users,
});

export const fetchUserFailure = (error: any): IAction => ({
  type: CONSTANTS.POSTS_FAILURE,
  payload: error,
  error,
});

export const fetchUsers = (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
    try {
      dispatch(fetchUserRequest());
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;
      setTimeout(() => {
        // simulate long loading
        dispatch(fetchUserSuccess(users));
      }, 500);
    } catch (error) {
      dispatch(fetchUserFailure(getResponseErrorMessage(error)));
    }
  };
