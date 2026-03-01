import { useVideoMutations } from "@/hooks/mutations/useVideoMutation";
import { useMultipartVideoUpload } from "@/hooks/useMultipartVideoUpload";

interface HandleVideoProps {
  unitID: string;
  courseID?: string;
  refetchUnits?: () => void;
  setIsOpen: (open: boolean) => void;
}

export const useHandleVideo = ({
  unitID,
  courseID,
  refetchUnits,
  setIsOpen,
}: HandleVideoProps) => {
  const { deleteMutation, isAllowedFile } = useVideoMutations(unitID, courseID);
  const { upload, progress, status, isUploading } = useMultipartVideoUpload({
    unitID,
    courseID,
    refetchUnits,
    setIsOpen,
  });

  const handleUploadVideo = (file: File) => {
    if (!isAllowedFile(file)) {
      alert("Invalid file type. Allowed: .mp4, .webm, .ogg, .mov");
      return;
    }
    upload(file);
  };

  const handleDeleteVideo = (videoID: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteMutation.mutate(videoID, {
        onSuccess: () => {
          refetchUnits?.();
        },
      });
    }
  };

  return {
    handleUploadVideo,
    handleDeleteVideo,
    isUploading,
    progress,
    status,
    isAllowedFile,
  };
};
