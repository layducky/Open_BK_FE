// hooks/useQuestionMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuestion, deleteQuestion } from "@/services/course/question";
import { toast } from "react-hot-toast";
import { QuestionEntity } from "@/domain/question.entity";

export const useQuestionMutations = (unitID: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: QuestionEntity) => createQuestion(data),
    onMutate: async (newQuestion) => {
      await queryClient.cancelQueries({ queryKey: ["questions", unitID] });

      const previousQuestions = queryClient.getQueryData<QuestionEntity[]>(["questions", unitID]) || [];

      const optimisticQuestion: QuestionEntity = {
        ...newQuestion,
        questionID: `temp-${Date.now()}`,
      };
      queryClient.setQueryData(["questions", unitID], [...previousQuestions, optimisticQuestion]);

      return { previousQuestions };
    },
    onSuccess: (newQuestionFromServer) => {
      queryClient.setQueryData(["questions", unitID], (old: QuestionEntity[] | undefined) =>
        old
          ? old.map((q) =>
              q.questionID === `temp-${Date.now()}` ? newQuestionFromServer : q
            )
          : [newQuestionFromServer]
      );
      toast.success("Question created successfully!");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["questions", unitID], context?.previousQuestions);
      toast.error(error.message || "Failed to create question");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", unitID] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (questionID: string) => deleteQuestion(questionID),
    onMutate: async (questionID) => {
      await queryClient.cancelQueries({ queryKey: ["questions", unitID] });

      const previousQuestions = queryClient.getQueryData<QuestionEntity[]>(["questions", unitID]) || [];

      queryClient.setQueryData(
        ["questions", unitID],
        previousQuestions.filter((q) => q.questionID !== questionID)
      );

      return { previousQuestions };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["questions", unitID], context?.previousQuestions);
      toast.error(error.message || "Failed to delete question");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", unitID] });
    },
  });

  return { createMutation, deleteMutation };
};