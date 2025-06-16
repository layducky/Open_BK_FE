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

            const tempID = `temp-${Date.now()}`;
            const optimisticUnit: UnitEntity = {
                ...newUnit,
                unitID: tempID,
            };

            queryClient.setQueryData(["units", courseID], [...previousUnits, optimisticUnit]);

            return { previousUnits, tempID };
        },
        onSuccess: (newUnitFromServer, _, context) => {
            // queryClient.setQueryData(["units", courseID], (old: UnitEntity[] | undefined) =>
            //     old
            //     ? old.map((q) =>
            //         q.unitID === `temp-${Date.now()}` ? newUnitFromServer : q
            //         )
            //     : [newUnitFromServer]
            // );
            // toast.success("Unit created successfully!");
            queryClient.setQueryData(["units", courseID], (old: UnitEntity[] | undefined) =>
                old
                ? old.map((unit) =>
                    unit.unitID === context?.tempID ? newUnitFromServer : unit
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
            await queryClient.cancelQueries({ queryKey: ["units", unitID] });

            const previousUnits = queryClient.getQueryData<UnitEntity[]>(["units", unitID]) || [];

            queryClient.setQueryData(
            ["units", unitID],
            previousUnits.filter((unit) => unit.unitID !== unitID)
            );

            return { previousUnits };
        },

        onError: (error, unitID, context) => {
            queryClient.setQueryData(["units", unitID], context?.previousUnits);
            toast.error(error?.message || "Failed to delete unit.");
        },

        onSettled: (_data, _error, unitID) => {
            queryClient.invalidateQueries({ queryKey: ["units", unitID] });
        },
    });

  return { createMutation, deleteMutation };
}