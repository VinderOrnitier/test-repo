export interface ITodoState {
  todos: any;
  loading: boolean;
  error: any;
  page: number | any;
  itemsLimit: number;
}

export interface ITodo {
  userId?: number | null;
  id: number | null;
  title: string;
  completed?: boolean;
}