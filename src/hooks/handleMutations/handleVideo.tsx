import { useVideoMutations } from "@/hooks/mutations/useVideoMutation";

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
  const { uploadMutation, deleteMutation, isAllowedFile } = useVideoMutations(unitID, courseID);

  const handleUploadVideo = (file: File) => {
    if (!isAllowedFile(file)) {
      alert("Invalid file type. Allowed: .mp4, .webm, .ogg, .mov");
      return;
    }
    uploadMutation.mutate(
      { file },
      {
        onSuccess: () => {
          refetchUnits?.();
          setIsOpen(false);
        },
      }
    );
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
    isUploading: uploadMutation.isPending,
    isAllowedFile,
  };
};
