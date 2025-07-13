import { IUser } from "../../types";
import { api } from "..";

export const getUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>("/users");
  return data;
};

export const createUser = async (user: Omit<IUser, "id" | "dailyBalance">): Promise<IUser> => {
  const dailyBalance = user.income / 30;
  const { data } = await api.post<IUser>("/users", { ...user, dailyBalance });
  return data;
};

export const updateUser = async (userId: string, userData: Partial<IUser>) => {
  const { data } = await api.patch<IUser>(`/users/${userId}`, { ...userData });
  return data;
};
