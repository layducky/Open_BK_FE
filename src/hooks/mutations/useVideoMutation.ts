import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo, deleteVideo } from "@/services/course/video";
import { toast } from "react-hot-toast";

const ALLOWED_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov"];

export const useVideoMutations = (unitID: string, courseID?: string) => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadVideo(unitID, file),
    onSuccess: () => {
      toast.success("Video uploaded successfully!");
      if (courseID) {
        queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
        queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload video");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (videoID: string) => deleteVideo(videoID),
    onSuccess: () => {
      toast.success("Video deleted successfully!");
      if (courseID) {
        queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
        queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete video");
    },
  });

  const isAllowedFile = (file: File): boolean => {
    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  return { uploadMutation, deleteMutation, isAllowedFile };
};
