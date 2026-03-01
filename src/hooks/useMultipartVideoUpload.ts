"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  initVideoUpload,
  uploadChunkToS3,
  completeVideoUpload,
  abortVideoUpload,
} from "@/services/course/video";
import {
  createChunks,
  calculateTotalParts,
  CHUNK_SIZE,
  UPLOAD_CONCURRENCY,
} from "@/utils/videoChunking";

const MAX_RETRIES = 3;

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  return results;
}

export type UploadStatus = "idle" | "preparing" | "uploading" | "finalizing";

interface UseMultipartVideoUploadProps {
  unitID: string;
  courseID?: string;
  refetchUnits?: () => void;
  setIsOpen?: (open: boolean) => void;
}

export const useMultipartVideoUpload = ({
  unitID,
  courseID,
  refetchUnits,
  setIsOpen,
}: UseMultipartVideoUploadProps) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [isUploading, setIsUploading] = useState(false);

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setProgress(0);
      setStatus("preparing");

      const totalParts = calculateTotalParts(file.size, CHUNK_SIZE);
      const chunks = createChunks(file, CHUNK_SIZE);
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      const fileType = ext.slice(1);

      let uploadId: string | null = null;
      let videoID: string | null = null;
      let fileKey: string | null = null;

      try {
        const initRes = await initVideoUpload(unitID, totalParts, file.name, file.size);
        uploadId = initRes.uploadId;
        videoID = initRes.videoID;
        fileKey = initRes.fileKey;

        const urlByPart = new Map<number, string>();
        initRes.presignedUrls.forEach((p) => urlByPart.set(p.partNumber, p.url));

        setStatus("uploading");

        const parts: { partNumber: number; etag: string }[] = [];

        const uploadPart = async (chunk: Blob, partIndex: number) => {
          const partNumber = partIndex + 1;
          const url = urlByPart.get(partNumber);
          if (!url) throw new Error(`No presigned URL for part ${partNumber}`);

          let lastError: Error | null = null;
          for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            try {
              const etag = await uploadChunkToS3(url, chunk);
              return { partNumber, etag };
            } catch (e) {
              lastError = e instanceof Error ? e : new Error(String(e));
            }
          }
          throw lastError || new Error("Upload part failed");
        };

        await runWithConcurrency(chunks, UPLOAD_CONCURRENCY, async (chunk, i) => {
          const result = await uploadPart(chunk, i);
          parts.push(result);
          setProgress(Math.round((parts.length / totalParts) * 90));
          return result;
        });

        setStatus("finalizing");
        setProgress(95);

        await completeVideoUpload(
          unitID,
          uploadId,
          videoID,
          fileKey,
          parts,
          file.name,
          fileType
        );

        setProgress(100);
        toast.success("Video uploaded successfully!");
        if (courseID) {
          queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
          queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
        }
        refetchUnits?.();
        setIsOpen?.(false);
      } catch (error) {
        if (uploadId && fileKey) {
          try {
            await abortVideoUpload(unitID, uploadId, fileKey);
          } catch {
            // ignore abort errors
          }
        }
        toast.error(error instanceof Error ? error.message : "Failed to upload video");
        throw error;
      } finally {
        setIsUploading(false);
        setProgress(0);
        setStatus("idle");
      }
    },
    [unitID, courseID, queryClient, refetchUnits, setIsOpen]
  );

  return { upload, progress, status, isUploading };
};
