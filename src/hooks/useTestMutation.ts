import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { submitAnss } from "@/services/course/submitTest";

export const useTestMutations = (testID: string) => {
  
  const submitAnssMutation = useMutation({
    mutationFn: ({ testID, anss }: { testID: string, anss: Record<string, string> }) =>
      submitAnss(testID, anss),
    onSuccess: () => {
      toast.success("Anss submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit anss");
    },
  });

  return {
    submitAnssMutation,
  };
}