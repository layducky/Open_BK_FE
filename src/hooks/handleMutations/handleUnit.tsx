import { useUnitMutations } from "@/hooks/mutations/useUnitMutation";
import { showAlert } from "@/lib/alertService";
import { showConfirm } from "@/lib/confirmService";

interface HandleUnitProps {
    courseID: string;
    refetchUnits?: () => void;
    setNewUnitID?: (id: string) => void;
}

export const useHandleUnit = ({ courseID, refetchUnits, setNewUnitID }: HandleUnitProps) => {
    const { createMutation, deleteMutation } = useUnitMutations(courseID);

    const handleCreateUnit = (data: any) => {
        createMutation.mutate(data, {
            onSuccess: (newUnit) => {
                if (setNewUnitID && newUnit?.unitID) {
                    setNewUnitID(newUnit.unitID);
                }
                refetchUnits?.();
            },
            onError: (error) => {
                console.error("Error creating unit:", error);
                showAlert("Failed to create unit. Please try again.", "error");
            },
            }
        );
    };

    const handleDeleteUnit = (unitID: string) => {
        showConfirm("Are you sure you want to delete this unit?", () => {
            deleteMutation.mutate(unitID, {
                onSuccess: () => {
                    refetchUnits?.();
                },
                onError: (error) => {
                    console.error("Error deleting unit:", error);
                    showAlert("Failed to delete unit. Please try again.", "error");
                },
            });
        }, { variant: "danger", confirmLabel: "Delete", title: "Delete unit" });
    };

    return {
        handleCreateUnit,
        handleDeleteUnit,
    };
};