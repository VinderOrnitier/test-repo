export interface IState {
  list: []
}

export interface IUserState {
  users: any;
  loading: boolean;
  error: any;
}

export interface IUsers {
  users: any;
  loading: boolean;
  error: any;
}

export interface IPost {
  userId?: number
  id?: number
  title?: string
  body?: string
}