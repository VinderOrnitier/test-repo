import { createSlice } from '@reduxjs/toolkit';
import IAction from '../../interfaces/IAction';
import * as CONSTANTS from './userList.constants'
import { MODULE_NAME } from './userList.constants';
import { IUserState } from './userList.types';

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null,
}

// export default (state = initialState, action: IAction): IUserState => {
//   switch (action.type) {
//     case CONSTANTS.USERS_REQUEST:
//       return {
//         users: [],
//         loading: true,
//         error: null,
//       }
//     case CONSTANTS.USERS_SUCCESS:
//       return {
//         users: action.payload,
//         loading: false,
//         error: null,
//       }
//     case CONSTANTS.USERS_FAILURE:
//       return {
//         users: [],
//         loading: false,
//         error: action.payload,
//       }
//     default:
//       return state
//   }
// }

const userSlice = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {

  }
})

export default userSlice.reducer;