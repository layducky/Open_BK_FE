import { useTestMutations } from "@/hooks/mutations/useTestMutation";

interface HandleTestProps {
    unitID: string;
    refetchTests?: () => void;
    setNewTestID?: (id: string) => void;
    setIsOpen: (open: boolean) => void;
}

export const useHandleTest = ({ unitID, refetchTests, setNewTestID, setIsOpen }: HandleTestProps) => {
    const { createMutation, deleteMutation } = useTestMutations(unitID);

    const handleCreateTest = (data: any) => {
        createMutation.mutate(data, {
            onSuccess: (newTest) => {
                if (setNewTestID && newTest?.testID) {
                    setNewTestID(newTest.testID);
                }
                refetchTests?.();
            },
            onError: (error) => {
                console.error("Error creating test:", error);
                alert("Failed to create test. Please try again.");
            },
            }
        );
    };

    const handleDeleteTest = (testID: string) => {
        if (confirm("Are you sure you want to delete this test?")) {
            deleteMutation.mutate(testID, {
                onSuccess: () => {
                    refetchTests?.();
                    setIsOpen(false);
                },
                onError: (error) => {
                    console.error("Error deleting test:", error);
                    alert("Failed to delete test. Please try again.");
                },
            });
        }
    };

    return {
        handleCreateTest,
        handleDeleteTest,
    };
};