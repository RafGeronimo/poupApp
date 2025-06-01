import { ITransaction } from "../../types";
import { api } from "..";

export const getTransactions = async (): Promise<ITransaction[]> => {
  const { data } = await api.get<ITransaction[]>("/transactions");
  return data;
};

export const createTransaction = async (transaction: Omit<ITransaction, "id">): Promise<ITransaction> => {
  const { data } = await api.post<ITransaction>("/transactions", transaction);
  return data;
};
