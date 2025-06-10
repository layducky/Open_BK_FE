import { apiClientWithAuth } from "../apiClient";

export const submitAnss = async (testID: string, anss: Record<string, string>) => {
    try {
        const res = await apiClientWithAuth.post(`/test/${testID}/submit`, {
            anss,
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to submit anss");
    }
};
