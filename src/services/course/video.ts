import { apiClientWithAuth } from "../apiClient";

export interface InitUploadResponse {
  uploadId: string;
  videoID: string;
  fileKey: string;
  presignedUrls: { partNumber: number; url: string }[];
}

export const initVideoUpload = async (
  unitID: string,
  totalParts: number,
  fileName: string,
  fileSize?: number
): Promise<InitUploadResponse> => {
  const res = await apiClientWithAuth.post(`/course/collab/video/${unitID}/init-upload`, {
    totalParts,
    fileName,
    fileSize,
  });
  if (res.status !== 200) {
    throw new Error(res.data?.message || "Failed to init upload");
  }
  return res.data;
};

export const uploadChunkToS3 = async (
  presignedUrl: string,
  chunk: Blob
): Promise<string> => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    body: chunk,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  if (!res.ok) {
    throw new Error(`Upload part failed: ${res.status}`);
  }
  const etag = res.headers.get("ETag");
  if (!etag) {
    throw new Error("No ETag in response");
  }
  return etag;
};

export const completeVideoUpload = async (
  unitID: string,
  uploadId: string,
  videoID: string,
  fileKey: string,
  parts: { partNumber: number; etag: string }[],
  videoName: string,
  fileType: string
) => {
  const res = await apiClientWithAuth.post(`/course/collab/video/${unitID}/complete-upload`, {
    uploadId,
    videoID,
    fileKey,
    parts,
    videoName,
    fileType,
  });
  if (res.status !== 201) {
    throw new Error(res.data?.message || "Failed to complete upload");
  }
  return res.data;
};

export const abortVideoUpload = async (
  unitID: string,
  uploadId: string,
  fileKey: string
) => {
  await apiClientWithAuth.post(`/course/collab/video/${unitID}/abort-upload`, {
    uploadId,
    fileKey,
  });
};

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
