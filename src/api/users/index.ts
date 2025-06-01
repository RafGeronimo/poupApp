import { IUser } from "../../types";
import { api } from "..";

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>("/users");
  return data;
};

export const createUser = async (user: Omit<IUser, "id">): Promise<IUser> => {
  const { data } = await api.post<IUser>("/users", user);
  return data;
};
