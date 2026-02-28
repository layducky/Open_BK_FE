import { apiClientWithAuth } from "../apiClient";

export const uploadVideo = async (unitID: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiClientWithAuth.post(`/course/collab/video/${unitID}`, formData);

  if (res.status !== 201) {
    throw new Error(res.data?.message || "Failed to upload video");
  }
  return res.data;
};

export const deleteVideo = async (videoID: string) => {
  const res = await apiClientWithAuth.delete(`/course/collab/video/${videoID}`);
  if (res.status !== 200) {
    throw new Error(res.data?.message || "Failed to delete video");
  }
  return res.data;
};

export const getVideoViewUrl = async (videoID: string): Promise<string> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/course/public/video/${videoID}/view`,
    { credentials: "include" }
  );
  if (!res.ok) {
    throw new Error("Failed to get video URL");
  }
  const data = await res.json();
  return data.url;
};
