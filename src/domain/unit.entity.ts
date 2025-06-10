export class UnitEntity {
    unitID?: string;
    courseID?: string;
    numericalOrder?: number; 
    unitName?: string; 
    description?: string;
    numQuests?: number;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<UnitEntity>) {
        this.unitID = data.unitID || "";
        this.courseID = data.courseID || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.unitName = data.unitName || "";
        this.description = data.description || "";
        this.numQuests = data.numQuests || 0;
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}
