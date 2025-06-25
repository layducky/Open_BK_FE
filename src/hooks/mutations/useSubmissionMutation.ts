import { useMutation } from "@tanstack/react-query";
import { updateSubmission } from "@/services/course/test";
import { toast } from "react-hot-toast";
import { SubmissionEntity } from "@/type/submission.entity";

export const useSubmissionMutation = (submissionID: string) => {

  const updateMutation = useMutation({
    mutationFn: (data: SubmissionEntity) => updateSubmission(submissionID, data),
    onSuccess: () => {
      toast.success("Submission updated!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update submission.");
    },
  });

  return { updateMutation };
};
