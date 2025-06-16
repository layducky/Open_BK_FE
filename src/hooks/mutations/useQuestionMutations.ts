// hooks/useQuestionMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, deleteQuestion } from "@/services/course/question";
import { toast } from "react-hot-toast";
import { QuestionEntity } from "@/type/question.entity";

export const useQuestionMutations = (testID: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: QuestionEntity) => createQuestion(data),
    onMutate: async (newQuestion) => {
      await queryClient.cancelQueries({ queryKey: ["questions", testID] });

      const previousQuestions = queryClient.getQueryData<QuestionEntity[]>(["questions", testID]) || [];

      const optimisticQuestion: QuestionEntity = {
        ...newQuestion,
        questionID: `temp-${Date.now()}`,
      };
      queryClient.setQueryData(["questions", testID], [...previousQuestions, optimisticQuestion]);

      return { previousQuestions };
    },
    onSuccess: (newQuestionFromServer) => {
      queryClient.setQueryData(["questions", testID], (old: QuestionEntity[] | undefined) =>
        old
          ? old.map((q) =>
              q.questionID === `temp-${Date.now()}` ? newQuestionFromServer : q
            )
          : [newQuestionFromServer]
      );
      toast.success("Question created successfully!");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["questions", testID], context?.previousQuestions);
      toast.error(error.message || "Failed to create question");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", testID] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (questionID: string) => deleteQuestion(questionID),
    onMutate: async (questionID) => {
      await queryClient.cancelQueries({ queryKey: ["questions", testID] });

      const previousQuestions = queryClient.getQueryData<QuestionEntity[]>(["questions", testID]) || [];

      queryClient.setQueryData(
        ["questions", testID],
        previousQuestions.filter((q) => q.questionID !== questionID)
      );

      return { previousQuestions };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["questions", testID], context?.previousQuestions);
      toast.error(error.message || "Failed to delete question");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", testID] });
    },
  });


  return { createMutation, deleteMutation };
};