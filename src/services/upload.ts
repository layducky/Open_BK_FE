import { apiClientWithAuth } from "./apiClient";

export const uploadCourseThumbnail = async (data: any) => {
  const response = await apiClientWithAuth.patch("/upload/course", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Đổi Content-Type
    },
  });
  return response.data;
};

export const uploadProfilePic = async (data: any) => {
  const response = await apiClientWithAuth.post("/upload/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
