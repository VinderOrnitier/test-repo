import { createSelector } from "reselect";
import { MODULE_NAME } from './login.constants';
import { IUserState } from "./login.types";

const selectState = (state: { [MODULE_NAME]: IUserState }): IUserState => state[MODULE_NAME];

export const getUserList = createSelector(selectState, (state: IUserState): IUserState => ({
  users: state.users,
  loading: state.loading,
  error: state.error
}));