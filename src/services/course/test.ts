import { SubmissionEntity } from "@/type/submission.entity";
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

export const getUserTest = async (testID: string) => {
    try {
        const res = await apiClientWithAuth.get(`/user/test/${testID}`);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(res.data?.message || "Failed to get user's test");
        }
    } catch (error) {
        throw new Error("Failed to get user's test");
    }
};

export const createSubmission = async (userTestID: string) => {
    try {
        const res = await apiClientWithAuth.post(`/user/test/submit/${userTestID}`);
        if (res.status === 201) {
            return res.data;
        } else {
            throw new Error(res.data?.message || "Failed to create submission");
        }
    } catch (error) {
        throw new Error("Failed to create submission");
    }
}

export const updateSubmission = async (submissionID: string, data: SubmissionEntity) => {
    try {
        const res = await apiClientWithAuth.put(`/user/test/submit/${submissionID}`, {
            ...data
        });
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(res.data?.message || "Failed to update submission");
        }
    } catch (error) {
        throw new Error("Failed to update submission");
    }
};

export const getSubmissionReview = async (submissionID: string) => {
    try {
        const res = await apiClientWithAuth.get(`/user/test/submit/review/${submissionID}`);
        if (res.status === 200) return res.data;
        throw new Error(res.data?.message || "Failed to get submission review");
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to get submission review");
    }
};