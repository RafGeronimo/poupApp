import { createContext, ReactNode, useState } from "react";
import { IUser } from "../types";
import { useQuery } from "@tanstack/react-query";
import { createUser, getUsers } from "../api/users";

interface MainProviderProps {
  children: ReactNode;
}

interface MainContextProps {
  user?: IUser;
  createNewUser: (user: Omit<IUser, "id">) => Promise<void>;
}

export const MainContext = createContext<MainContextProps | undefined>(undefined);
const MainProvider = ({ children }: MainProviderProps) => {
  const [user, setUser] = useState<IUser>();

  useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      try {
        const userList = await getUsers();
        setUser(userList[0]);
      } catch (error) {
        console.error(`Error fetching users data: ${error}`);
        return undefined;
      }
    },
  });

  const createNewUser = async (user: Omit<IUser, "id">) => {
    try {
      const newUser = await createUser(user);
      setUser(newUser);
    } catch (error) {
      console.error(`Error creating new user: ${error}`);
    }
  };

  return <MainContext.Provider value={{ user, createNewUser }}>{children}</MainContext.Provider>;
};

export default MainProvider;
