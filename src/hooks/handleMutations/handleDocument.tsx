import { useDocumentMutations } from "@/hooks/mutations/useDocumentMutation";
import { showAlert } from "@/lib/alertService";
import { showConfirm } from "@/lib/confirmService";

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
      showAlert("Invalid file type. Allowed: .pdf, .doc, .txt, .docx", "warning");
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
    showConfirm("Are you sure you want to delete this document?", () => {
      deleteMutation.mutate(documentID, {
        onSuccess: () => {
          refetchUnits?.();
        },
      });
    }, { variant: "danger", confirmLabel: "Delete", title: "Delete document" });
  };

  return {
    handleUploadDocument,
    handleDeleteDocument,
    isUploading: uploadMutation.isPending,
    isAllowedFile,
  };
};
