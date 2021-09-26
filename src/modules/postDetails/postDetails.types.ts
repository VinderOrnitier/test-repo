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

export interface IComments {
  postId?: number
  id?: number
  name?: string
  email?: string
  body?: string
}