import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTest, deleteTest } from "@/services/course/test";
import { toast } from "react-hot-toast";
import { TestEntity } from "@/type/test.entity";

export const useTestMutations = (unitID: string) => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
      mutationFn: (data: TestEntity) => createTest(data),
      onMutate: async (newTest) => {
        await queryClient.cancelQueries({ queryKey: ["tests", unitID] });

        const previousTests = queryClient.getQueryData<TestEntity[]>(["tests", unitID]) || [];

        const tempID = `temp-${Date.now()}`;
        const optimisticTest: TestEntity = {
          ...newTest,
          testID: tempID,
        };

        queryClient.setQueryData(["tests", unitID], [...previousTests, optimisticTest]);

        return { previousTests, tempID };
      },
      onSuccess: (newTestFromServer, _, context) => {
        queryClient.setQueryData(["tests", unitID], (old: TestEntity[] | undefined) =>
          old
          ? old.map((test) =>
            test.testID === context?.tempID ? newTestFromServer : test
            )
          : [newTestFromServer]
        );

        toast.success("Test created successfully!");
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(["tests", unitID], context?.previousTests);
        toast.error(error.message || "Failed to create test");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["tests", unitID] });
      },
    });

    const deleteMutation = useMutation({
      mutationFn: (testID: string) => deleteTest(testID),

      onMutate: async (testID: string) => {
        await queryClient.cancelQueries({ queryKey: ["tests", testID] });

        const previousTests = queryClient.getQueryData<TestEntity[]>(["tests", testID]) || [];

        queryClient.setQueryData(
        ["tests", testID],
        previousTests.filter((test) => test.testID !== testID)
        );

        return { previousTests };
      },

      onError: (error, testID, context) => {
        queryClient.setQueryData(["tests", testID], context?.previousTests);
        toast.error(error?.message || "Failed to delete test.");
      },

      onSettled: (_data, _error, testID) => {
        queryClient.invalidateQueries({ queryKey: ["tests", testID] });
      },
    });


  return { createMutation, deleteMutation };
}