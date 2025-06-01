export interface IUser {
  id: number;
  name: string;
  income: number;
}

export interface ITransaction {
  id: number;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  date: string;
}
