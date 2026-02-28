import { useDocumentMutations } from "@/hooks/mutations/useDocumentMutation";

interface HandleDocumentProps {
  unitID: string;
  courseID?: string;
  refetchUnits?: () => void;
  setIsOpen: (open: boolean) => void;
}

export const useHandleDocument = ({
  unitID,
  courseID,
  refetchUnits,
  setIsOpen,
}: HandleDocumentProps) => {
  const { uploadMutation, deleteMutation, isAllowedFile } = useDocumentMutations(unitID, courseID);

  const handleUploadDocument = (file: File) => {
    if (!isAllowedFile(file)) {
      alert("Invalid file type. Allowed: .pdf, .doc, .txt, .docx");
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

  const handleDeleteDocument = (documentID: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(documentID, {
        onSuccess: () => {
          refetchUnits?.();
        },
      });
    }
  };

  return {
    handleUploadDocument,
    handleDeleteDocument,
    isUploading: uploadMutation.isPending,
    isAllowedFile,
  };
};
