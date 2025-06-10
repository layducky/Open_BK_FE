export class QuestionEntity {
    questionID: string;
    unitID: string;
    numericalOrder: number;
    content?: string;
    explanation?: string;
    correctAns: string;
    ansA?: string;
    ansB?: string;
    ansC?: string;
    ansD?: string;
    // createdAt: string;
    // updatedAt: string;

    constructor(data: Partial<QuestionEntity>) {
        this.questionID = data.questionID || "";
        this.unitID = data.unitID || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.content = data.content || "";
        this.explanation = data.explanation || "";
        this.correctAns = data.correctAns || "";
        this.ansA = data.ansA || "";
        this.ansB = data.ansB || "";
        this.ansC = data.ansC || "";
        this.ansD = data.ansD || "";
        // this.createdAt = data.createdAt
        //     ? new Date(data.createdAt).toLocaleString("de-DE")
        //     : "-";
        // this.updatedAt = data.updatedAt
        //     ? new Date(data.updatedAt).toLocaleString("de-DE")
        //     : "-";
    }
}
