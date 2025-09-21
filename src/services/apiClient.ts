'use client';
import axios from "axios";

const server_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const apiClient = axios.create({
  baseURL: server_url,
  headers: { "Content-Type": "application/json" },
});

const getApiClientWithAuth = () => {
  if (typeof window === "undefined") {
    // Return a client without Authorization header during SSR
    return axios.create({
      baseURL: server_url,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }
  const accessToken = sessionStorage.getItem("accessToken");
  return axios.create({
    baseURL: server_url,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    withCredentials: true,
  });
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

apiClientWithAuth.interceptors.response.use(
  (response) => {
      return response;
    },
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 500) {
        alert('Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.');
      }
    } else if (error.request) {
      alert('Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
    } else {
      alert('Có lỗi xảy ra: ' + error.message);
    }
    return error.response;
    // Promise.reject({status: error.status, massage: error.message})
  }
);

export { apiClientWithAuth, apiClient };
