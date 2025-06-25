export type SubmissionAnsEntity = {
    questionID: string;
    selectedAns: string;
};

export class SubmissionEntity {
    status: string;
    submission: SubmissionAnsEntity[];

    constructor(status: string, submission: SubmissionAnsEntity[]) {
        this.status = status;
        this.submission = submission;
    }
}
