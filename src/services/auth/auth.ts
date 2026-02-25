"use server";
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_API_URL || "http://backendd:5000/api/v1";
const apiClient = axios.create({
  baseURL: server_url,
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
