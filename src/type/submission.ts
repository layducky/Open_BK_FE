export class SubmissionEntity {
    submissionID?: string;
    testID?: string;
    studentID?: string;
    status?: 'pending' | 'submitted' | 'graded';
    duration?: number;
    numQuests?: number;
    numRightAns?: number;
    totalScore?: number;
    timeTaken?: number;
    submittedAt?: string;
    updatedAt?: string;
    createdAt?: string;

    constructor(data: Partial<SubmissionEntity>) {
        this.submissionID = data.submissionID || "";
        this.testID = data.testID || "";
        this.studentID = data.studentID || "";
        this.status = data.status || 'pending';
        this.duration = data.duration ?? 0;
        this.numQuests = data.numQuests ?? 0;
        this.numRightAns = data.numRightAns ?? 0;
        this.totalScore = data.totalScore ?? -1;
        this.timeTaken = data.timeTaken ?? 0;
        this.submittedAt = data.submittedAt
            ? new Date(data.submittedAt).toLocaleString("de-DE")
            : "-";
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}
