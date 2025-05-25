'use client';
import axios from "axios";

const apiClientWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  
});

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


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClientWithAuth, apiClient };
