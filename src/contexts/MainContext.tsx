import { createContext, ReactNode, useState } from "react";
import { ITransaction, IUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../api/users";
import { createTransaction, getTransactions } from "../api/transactions";

interface MainProviderProps {
  children: ReactNode;
}

interface MainContextProps {
  user: IUser | null;
  createNewUser: (user: Omit<IUser, "id" | "dailyBalance">) => Promise<void>;
  transactions: ITransaction[];
  createNewTransaction: (transaction: Omit<ITransaction, "id" | "userId">) => Promise<void>;
}

export const MainContext = createContext<MainContextProps | undefined>(undefined);

const MainProvider = ({ children }: MainProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      try {
        const userList = await getUsers();
        setUser(userList[0]);
      } catch (error) {
        console.error(`Error fetching users data: ${error}`);
      }
    },
  });

  useQuery({
    queryKey: ["getTransactions"],
    queryFn: async () => {
      try {
        const transactionsList = await getTransactions();
        setTransactions(transactionsList);
      } catch (error) {
        console.error(`Error fetching user transactions: ${error}`);
      }
    },
  });

  const createNewUser = async (user: Omit<IUser, "id" | "dailyBalance">) => {
    try {
      const newUser = await createUser(user);
      setUser(newUser);
    } catch (error) {
      console.error(`Error creating new user: ${error}`);
    }
  };

  const createNewTransaction = async (transaction: Omit<ITransaction, "id" | "userId">) => {
    try {
      if (!user) throw Error("User must exist");
      const { transaction: newTransaction, newDailyBalance } = await createTransaction(transaction, user);
      setTransactions((prev) => [...prev, newTransaction]);
      setUser((prev) => (prev ? { ...prev, dailyBalance: newDailyBalance } : null));
    } catch (error) {
      console.error(error);
    }
  };

  const value = { user, createNewUser, transactions, createNewTransaction };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
