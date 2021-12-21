export interface IComments {
  postId?: number
  id?: number
  title?: string
  body?: string
  comments?: Comment[] | undefined
}

export interface IComment {
  postId?: number
  id?: number | number
  name?: string
  email: string
  body?: string
}

export interface Comment extends IComment {
  projectName: string
  photoURL: string
  content: string
  createdAt: Date | string
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}