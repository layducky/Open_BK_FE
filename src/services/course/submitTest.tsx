import { apiClientWithAuth } from "../apiClient";

export const submitAnswers = async (testID: string, answers: Record<string, string>) => {
    try {
        const res = await apiClientWithAuth.post(`/test/${testID}/submit`, {
            answers,
        });

        return res.data;
    } catch (error) {
        throw new Error("Failed to submit answers");
    }
};
