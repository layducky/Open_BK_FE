export class TestEntity {
    testID: string;
    unitID: string;
    testName: string;
    numQuests: number;
    duration: number;
    maxAttempts: number;
    description?: string;
    openDate?: string | null;
    closeDate?: string | null;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<TestEntity>) {
        this.testID = data.testID || "";
        this.unitID = data.unitID || "";
        this.testName = data.testName || "";
        this.numQuests = data.numQuests || 0;
        this.duration = data.duration || 0;
        this.maxAttempts = data.maxAttempts ?? 0;
        this.description = data.description || "";
        this.openDate = data.openDate ?? null;
        this.closeDate = data.closeDate ?? null;
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}

export class UserTestEntity {
    userTestID: string;
    testName: string;
    numericalOrder: number;
    status: string;
    maxAttempts: number;
    totalScore?: number | null;
    duration: number;
    numQuests: number;
    submissions: SubmissionStatusEntity[];

    constructor(data: Partial<UserTestEntity>) {
        this.userTestID = data.userTestID || "";
        this.testName = data.testName || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.status = data.status || "";
        this.maxAttempts = data.maxAttempts ?? 0;
        this.totalScore = data.totalScore ?? null;
        this.duration = data.duration ?? 0;
        this.numQuests = data.numQuests ?? 0;
        this.submissions = (data.submissions || []).map(
            (s) => new SubmissionStatusEntity(s)
        );
    }
};

export class SubmissionStatusEntity {
    submissionID: string;
    numericalOrder: number;
    status: string;
    numRightAns: number;
    totalScore: number;
    timeTaken?: number | null;
    submittedAt?: string | null;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<SubmissionStatusEntity>) {
        this.submissionID = data.submissionID || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.status = data.status || "";
        this.numRightAns = data.numRightAns || 0;
        this.totalScore = data.totalScore ?? -1;
        this.timeTaken = data.timeTaken ?? null;
        this.submittedAt = data.submittedAt ?? null;
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}
