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

export class NotEnrolledError extends Error {
  courseID: string | null;
  constructor(message: string, courseID: string | null) {
    super(message);
    this.name = "NotEnrolledError";
    this.courseID = courseID;
  }
}

export const getUserTest = async (testID: string) => {
  const res = await apiClientWithAuth.get(`/user/test/${testID}`);
  if (res.status === 200) return res.data;
  if (res.status === 403 && (res as any).data?.courseID != null) {
    throw new NotEnrolledError(
      (res as any).data?.message || "You must enroll to access this test",
      (res as any).data?.courseID
    );
  }
  throw new Error((res as any).data?.message || "Failed to get user's test");
};

export interface CreateSubmissionResult {
  submissionID: string;
  startedAt?: string;
  duration?: number;
  serverTime?: number;
}

export interface OngoingSubmissionError {
  code: "ONGOING_SUBMISSION";
  message: string;
  submissionID: string;
}

export const createSubmission = async (userTestID: string): Promise<CreateSubmissionResult> => {
    try {
        const res = await apiClientWithAuth.post(`/user/test/submit/${userTestID}`);
        if (res.status === 201) return res.data;
        if (res.status === 409 && res.data?.code === "ONGOING_SUBMISSION") {
            const err: OngoingSubmissionError = {
                code: "ONGOING_SUBMISSION",
                message: res.data?.message || "You have an ongoing attempt",
                submissionID: res.data?.submissionID,
            };
            throw err;
        }
        throw new Error(res.data?.message || "Failed to create submission");
    } catch (e: any) {
        if (e?.code === "ONGOING_SUBMISSION") throw e;
        if (e?.response?.status === 409 && e?.response?.data?.code === "ONGOING_SUBMISSION") {
            throw {
                code: "ONGOING_SUBMISSION",
                message: e.response.data?.message || "You have an ongoing attempt",
                submissionID: e.response.data?.submissionID,
            } as OngoingSubmissionError;
        }
        throw e instanceof Error ? e : new Error("Failed to create submission");
    }
};

export const forceEndAndCreate = async (userTestID: string): Promise<CreateSubmissionResult> => {
    const res = await apiClientWithAuth.post(`/user/test/submit/${userTestID}/force-end-and-create`);
    if (res.status === 201) return res.data;
    throw new Error(res.data?.message || "Failed to force end and create");
};

export const getOngoingAnswers = async (submissionID: string): Promise<{ answers: { questionID: string; selectedAns: string }[] }> => {
    const res = await apiClientWithAuth.get(`/user/test/submit/ongoing/${submissionID}`);
    if (res.status === 200) return res.data;
    throw new Error((res as any).data?.message || "Failed to get ongoing answers");
};

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const saveDraftKeepalive = (submissionID: string, data: SubmissionEntity) => {
    if (typeof window === "undefined") return;
    const token = sessionStorage.getItem("accessToken");
    const url = `${getBaseUrl()}/user/test/submit/${submissionID}`;
    const body = JSON.stringify(data);
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
        keepalive: true,
    }).catch(() => {});
};

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

export interface SubmissionTiming {
  startedAt: string;
  duration: number;
  serverTime: number;
}

export const getSubmissionTiming = async (submissionID: string): Promise<SubmissionTiming> => {
  const res = await apiClientWithAuth.get(`/user/test/submit/timing/${submissionID}`);
  if (res.status === 200) return res.data;
  throw new Error((res as any).data?.message || "Failed to get submission timing");
};