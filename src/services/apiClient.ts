'use client';
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_API_URL || "http://backendd:5000/api/v1";
const apiClient = axios.create({
  baseURL: server_url,
  headers: { "Content-Type": "application/json" },
});

const getApiClientWithAuth = () => {
  const client = axios.create({
    baseURL: server_url,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  if (typeof window !== "undefined") {
    client.interceptors.request.use((config) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return client;
};

const apiClientWithAuth = getApiClientWithAuth();



apiClientWithAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Promise.reject({status: error.status, massage: error.message})
  }
);

function forceLogoutSessionExpired() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("userID");
  window.location.href = "/api/auth/signout?callbackUrl=/auth/login?sessionExpired=1";
}

apiClientWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        forceLogoutSessionExpired();
        return Promise.reject(error);
      }
      if (statusCode === 500) {
        alert("Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      alert("Không thể kết nối với máy chủ. Vui lòng thử lại sau.");
    } else {
      alert("Có lỗi xảy ra: " + error.message);
    }
    return Promise.reject(error);
  }
);

export { apiClientWithAuth, apiClient };
