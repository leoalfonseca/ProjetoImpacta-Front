import { UserProps } from './user';

export type ProductProps = {
  id?: string;
  name?: string;
  description?: string;
  stock?: number;
  userId?: string;
  user?: UserProps;
};

export type StockProps = {
  amount: number;
};
