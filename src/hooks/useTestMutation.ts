import { toast } from "react-hot-toast";
import { TestEntity } from "@/type/test.entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTest, DeleteTest, UpdateTest } from "@/services/course/test";

export const useTestMutations = (testID: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: TestEntity) => CreateTest(testID, data),
    onMutate: async (newTest) => {
      await queryClient.cancelQueries({ queryKey: ["tests", testID] });

      const previousTests = queryClient.getQueryData<TestEntity[]>(["tests", testID]) || [];

      const optimisticTest: TestEntity = {
        ...newTest,
        testID: `temp-${Date.now()}`,
      };
      queryClient.setQueryData(["tests", testID], [...previousTests, optimisticTest]);

      return { previousTests };
    },
    onSuccess: (newTestFromServer) => {
      queryClient.setQueryData(["tests", testID], (old: TestEntity[] | undefined) =>
        old
          ? old.map((t) =>
              t.testID === `temp-${Date.now()}` ? newTestFromServer : t
            )
          : [newTestFromServer]
      );
      toast.success("Test created successfully!");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["tests", testID], context?.previousTests);
      toast.error(error.message || "Failed to create test");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tests", testID] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (deleteID: string) => DeleteTest(deleteID),
    onMutate: async (deleteID) => {
      await queryClient.cancelQueries({ queryKey: ["tests", testID] });

      const previousTests = queryClient.getQueryData<TestEntity[]>(["tests", testID]) || [];

      queryClient.setQueryData(
        ["tests", testID],
        previousTests.filter((t) => t.testID !== deleteID)
      );

      return { previousTests };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["tests", testID], context?.previousTests);
      toast.error(error.message || "Failed to delete test");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tests", testID] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ updateID, data }: { updateID: string; data: TestEntity }) =>
      UpdateTest(updateID, data),
    onMutate: async ({ updateID, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tests", testID] });

      const previousTests = queryClient.getQueryData<TestEntity[]>(["tests", testID]) || [];

      queryClient.setQueryData(
        ["tests", testID],
        previousTests.map((t) => (t.testID === updateID ? { ...t, ...data } : t))
      );

      return { previousTests };
    },
    onSuccess: () => {
      toast.success("Test updated successfully!");
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["tests", testID], context?.previousTests);
      toast.error(error.message || "Failed to update test");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tests", testID] });
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};