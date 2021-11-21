import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './userList.actions';
import * as CONSTANTS from './userList.constants'
import { IUser, IUserState } from './userList.types';

const initialState: IUserState = {
  users: [],
  loading: false,
  error: '',
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

export const userSlice = createSlice({
  name: CONSTANTS.MODULE_NAME,
  initialState,
  reducers: {
    // fetchUsersRequest(state) {
    //   state.loading = true;
    // },
    // fetchUsersSuccess(state, action: PayloadAction<IUser[]>) {
    //   state.loading = false;
    //   state.error = '';
    //   state.users = action.payload;
    // },
    // fetchUsersFailure(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.error = '';
      state.users = action.payload;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export default userSlice.reducer;