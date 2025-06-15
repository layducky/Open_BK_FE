import { TestEntity } from "@/type/test.entity";
import { apiClientWithAuth } from "../apiClient";

export const CreateTest = async (unitID: string, data: TestEntity) => {
    try {
        const res = await apiClientWithAuth.post(`/course/collab/test/${unitID}`, {
            data
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to submit anss");
    }
};

export const DeleteTest = async (testID: string) => {
    try {
        const res = await apiClientWithAuth.delete(`/course/collab/test/${testID}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to delete test");
    }
};
export const UpdateTest = async (testID: string, data: TestEntity) => {
    try {
        const res = await apiClientWithAuth.put(`/course/collab/test/${testID}`, {
            data
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to update test");
    }
}
