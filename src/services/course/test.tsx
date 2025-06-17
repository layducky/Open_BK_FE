import { apiClientWithAuth } from "../apiClient";

export const createTest = async (testData: any) => {
    try {
        const { unitID, testName, description, duration } = testData;
        const res = await apiClientWithAuth.post(`/course/collab/test/${unitID}`, {
            testName, description, duration
        });
        if (res.status !== 201) {
            throw new Error(res.data?.message || "Failed to create test");
        }

        return res.data;
    } catch (error) {
        throw new Error("Failed to submit anss");
    }
};

export const deleteTest = async (testID: string) => {
    try {
        const res = await apiClientWithAuth.delete(`/course/collab/test/${testID}`);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(res.data?.message || "Failed to delete test");
        }
    } catch (error) {
        throw new Error("Failed to delete test");
    }
};
export const updateTest = async (testID: string, data: any) => {
    try {
        const res = await apiClientWithAuth.put(`/course/collab/test/${testID}`, {
            data
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to update test");
    }
}
