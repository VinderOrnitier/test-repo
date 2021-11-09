export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserState {
  users: IUser[];
  loading: boolean;
  error: string;
}

export const initialState: IUserState = {
  users: [],
  loading: false,
  error: '',
}
