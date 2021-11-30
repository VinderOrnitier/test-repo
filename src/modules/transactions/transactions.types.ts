export interface ITodoState {
  todos: any;
  loading: boolean;
  error: any;
  page: number | any;
  itemsLimit: number;
}

export interface ITransactions {
  uid?: number | null;
  id: number | null;
  name: string;
  completed?: boolean;
  amount: string | number | undefined;
}