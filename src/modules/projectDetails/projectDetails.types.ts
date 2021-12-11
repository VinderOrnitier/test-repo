export interface IComments {
  postId?: number
  id?: number
  title?: string
  body?: string
  comments?: IComment[]
}

export interface IComment {
  postId?: number
  id?: number
  name?: string
  email?: string
  body?: string
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}