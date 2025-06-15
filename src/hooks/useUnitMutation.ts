import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUnit, deleteUnit } from "@/services/course/unit";
import { toast } from "react-hot-toast";
import { UnitEntity } from "@/type/unit.entity";

export const useUnitMutations = (courseID: string) => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (data: UnitEntity) => createUnit(data),
        onMutate: async (newUnit) => {
        await queryClient.cancelQueries({ queryKey: ["units", courseID] });

        const previousUnits = queryClient.getQueryData<UnitEntity[]>(["units", courseID]) || [];

        const optimisticUnit: UnitEntity = {
            ...newUnit,
            unitID: `temp-${Date.now()}`,
        };
        queryClient.setQueryData(["units", courseID], [...previousUnits, optimisticUnit]);

        return { previousUnits };
        },
        onSuccess: (newUnitFromServer) => {
        queryClient.setQueryData(["units", courseID], (old: UnitEntity[] | undefined) =>
            old
            ? old.map((q) =>
                q.unitID === `temp-${Date.now()}` ? newUnitFromServer : q
                )
            : [newUnitFromServer]
        );
        toast.success("Unit created successfully!");
        },
        onError: (error, _, context) => {
        queryClient.setQueryData(["units", courseID], context?.previousUnits);
        toast.error(error.message || "Failed to create unit");
        },
        onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["units", courseID] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (unitID: string) => deleteUnit(unitID),

        onMutate: async (unitID: string) => {
            await queryClient.cancelQueries({ queryKey: ["units", courseID] });

            const previousUnits = queryClient.getQueryData<UnitEntity[]>(["units", courseID]) || [];

            queryClient.setQueryData(
            ["units", courseID],
            previousUnits.filter((unit) => unit.unitID !== unitID)
            );

            return { previousUnits };
        },

        onError: (error, _, context) => {
            queryClient.setQueryData(["units", courseID], context?.previousUnits);
            toast.error(error?.message || "Failed to delete unit.");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["units", courseID] });
        },
    });

  return { createMutation, deleteMutation };
}