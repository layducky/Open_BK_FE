import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { submitAnswers } from "@/services/course/submitTest";

export const useTestMutations = (testID: string) => {
  
  const submitAnswersMutation = useMutation({
    mutationFn: ({ testID, answers }: { testID: string, answers: Record<string, string> }) =>
      submitAnswers(testID, answers),
    onSuccess: () => {
      toast.success("Answers submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit answers");
    },
  });

  return {
    submitAnswersMutation,
  };
}