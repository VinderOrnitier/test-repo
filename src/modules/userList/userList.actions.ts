import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';
// import * as CONSTANTS from './userList.constants';
// import IAction from '../../interfaces/IAction';

// import getResponseErrorMessage from '../../helpers/getResponseErrorMassage';
// import { AppDispatch } from './../../store/store';
// import { userSlice } from './userList.reducer';
import { IUser } from './userList.types';

// export const fetchUserRequest = (): IAction => ({
//   type: CONSTANTS.USERS_REQUEST,
// })

// export const fetchUserSuccess = (users: IUserState): IAction => ({
//   type: CONSTANTS.USERS_SUCCESS,
//   payload: users
// })

// export const fetchUserFailure = (error: any): IAction => ({
//   type: CONSTANTS.USERS_FAILURE,
//   payload: error,
//   error,
// })

// export const fetchUsers = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
//   dispatch: ThunkDispatch<{}, {}, AnyAction>,
//   getState: () => any,
// ): Promise<void> => {
//   try {
//     dispatch(fetchUserRequest());
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users')
//     const users = response.data
//     setTimeout(() => { // simulate long loading
//       dispatch(fetchUserSuccess(users));
//     }, 500)
//   } catch (error) {
//     dispatch(fetchUserFailure(getResponseErrorMessage(error)));
//   }
// }

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.fetchUsersRequest());
//     const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
//     setTimeout(() => {
//       // simulate long loading
//       dispatch(userSlice.actions.fetchUsersSuccess(response.data));
//     }, 1000);
//   } catch (e) {
//     dispatch(userSlice.actions.fetchUsersFailure(e.message));
//   }
// };

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Can\'t load users :(');
    }
  }
)