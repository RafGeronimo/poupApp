import { ITransaction, IUser } from "../../types";
import { api } from "..";
import { updateUser } from "../users";

export const getTransactions = async (): Promise<ITransaction[]> => {
  const { data } = await api.get<ITransaction[]>("/transactions");
  return data;
};

export const createTransaction = async (
  transaction: Omit<ITransaction, "id" | "userId">,
  user: Omit<IUser, "name">
): Promise<{ transaction: ITransaction; newDailyBalance: number }> => {
  const { data } = await api.post<ITransaction>("/transactions", { ...transaction, userId: user.id });

  const transactions = await getTransactions();
  const balance: number = transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.value : acc - transaction.value;
  }, 0);

  const newDailyBalance = user.income / 30 + balance;

  try {
    await updateUser(user.id, { dailyBalance: newDailyBalance });
  } catch (error) {
    console.error("Error updating user", error);
  }

  return { transaction: data, newDailyBalance };
};
