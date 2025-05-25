export class QuestionEntity {
    questionID: string;
    unitID: string;
    numericalOrder: number;
    content?: string;
    explanation?: string;
    correctAnswer: string;
    answerA?: string;
    answerB?: string;
    answerC?: string;
    answerD?: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<QuestionEntity>) {
        this.questionID = data.questionID || "";
        this.unitID = data.unitID || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.content = data.content || "";
        this.explanation = data.explanation || "";
        this.correctAnswer = data.correctAnswer || "";
        this.answerA = data.answerA || "";
        this.answerB = data.answerB || "";
        this.answerC = data.answerC || "";
        this.answerD = data.answerD || "";
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}
