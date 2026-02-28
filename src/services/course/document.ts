import { apiClientWithAuth } from "../apiClient";

export const uploadDocument = async (unitID: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiClientWithAuth.post(`/course/collab/document/${unitID}`, formData);

  if (res.status !== 201) {
    throw new Error(res.data?.message || "Failed to upload document");
  }
  return res.data;
};

export const deleteDocument = async (documentID: string) => {
  const res = await apiClientWithAuth.delete(`/course/collab/document/${documentID}`);
  if (res.status !== 200) {
    throw new Error(res.data?.message || "Failed to delete document");
  }
  return res.data;
};
