"use server";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (data: any) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  await apiClient.post("/auth/logout", {});
  // const cookieStore = await cookies();
  // cookieStore.delete("accessToken");
};
