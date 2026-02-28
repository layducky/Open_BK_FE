import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDocument, deleteDocument } from "@/services/course/document";
import { toast } from "react-hot-toast";

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".txt", ".docx"];

export const useDocumentMutations = (unitID: string, courseID?: string) => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadDocument(unitID, file),
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
      if (courseID) {
        queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
        queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload document");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (documentID: string) => deleteDocument(documentID),
    onSuccess: () => {
      toast.success("Document deleted successfully!");
      if (courseID) {
        queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
        queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete document");
    },
  });

  const isAllowedFile = (file: File): boolean => {
    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  return { uploadMutation, deleteMutation, isAllowedFile };
};
