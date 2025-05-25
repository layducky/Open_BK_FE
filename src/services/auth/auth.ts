import { apiClient } from "@/services/apiClient";

export const signUp = async (data: any) => {
  const { data: { userID } } = await apiClient.post("/auth/signup", data, {
    withCredentials: true,
  });
  userID && sessionStorage.setItem("userID", userID);

};

export const login = async (data: any) => {
  const { data: { userID } } = await apiClient.post("/auth/login", data, {
    withCredentials: true,
  });
  userID && sessionStorage.setItem("userID", userID);
};

export const logout = async () => {
  await apiClient.post("/auth/logout", {}, {
    withCredentials: true,
  });
  sessionStorage.removeItem("userID");
};
