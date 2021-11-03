export interface IState {
  list: []
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserState {
  users: IUser[];
  loading: boolean;
  error: any;
}

export const initialState: IUserState = {
  users: [],
  loading: false,
  error: '',
}
