import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as CONSTANTS from './gallery.constants'
import IAction from '../../interfaces/IAction';
import { IUserState } from './gallery.types';
import axios from "axios";
import getResponseErrorMessage from "../../helpers/getResponseErrorMassage";

export const fetchUserRequest = (): IAction => ({
  type: CONSTANTS.GALLERY_REQUEST,
})

export const fetchUserSuccess = (users: IUserState): IAction => ({
  type: CONSTANTS.GALLERY_SUCCESS,
  payload: users
})

export const fetchUserFailure = (error: any): IAction => ({
  type: CONSTANTS.GALLERY_FAILURE,
  payload: error,
  error,
})

export const fetchUsers = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any,
): Promise<void> => {
  try {
    dispatch(fetchUserRequest());
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    const users = response.data
    setTimeout(() => { // simulate long loading
      dispatch(fetchUserSuccess(users));
    }, 500)
  } catch (error) {
    dispatch(fetchUserFailure(getResponseErrorMessage(error)));
  }
}