export interface ITodoState {
  todos: any;
  loading: boolean;
  error: any;
  page: number | any;
  itemsLimit: number;
}

export interface ITransactions {
  uid?: string;
  id: string;
  name: string | undefined;
  completed?: boolean;
  amount: number;
}