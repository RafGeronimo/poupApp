export interface IUser {
  id: string;
  name: string;
  income: number;
  dailyBalance: number;
}

export interface ITransaction {
  id: string;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  date: string;
}
