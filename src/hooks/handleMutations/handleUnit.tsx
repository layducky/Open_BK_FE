import { useUnitMutations } from "@/hooks/mutations/useUnitMutation";
import { UnitEntity } from "@/type/unit.entity";

interface HandleUnitProps {
    courseID: string;
    refetchUnits?: () => void;
    setNewUnitID?: (id: string) => void;
    setIsOpen: (open: boolean) => void;
}

export const useHandleUnit = ({ courseID, refetchUnits, setNewUnitID, setIsOpen }: HandleUnitProps) => {
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
                alert("Failed to create unit. Please try again.");
            },
            }
        );
    };

    const handleDeleteUnit = (unitID: string) => {
        if (confirm("Are you sure you want to delete this unit?")) {
            deleteMutation.mutate(unitID, {
                onSuccess: () => {
                    refetchUnits?.();
                    setIsOpen(false);
                },
                onError: (error) => {
                    console.error("Error deleting unit:", error);
                    alert("Failed to delete unit. Please try again.");
                },
            });
        }
    };

    return {
        handleCreateUnit,
        handleDeleteUnit,
    };
};