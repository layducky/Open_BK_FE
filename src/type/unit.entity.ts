export interface UnitDocument {
    documentID: string;
    documentName: string;
    downloadUrl: string;
}

export class UnitEntity {
    unitID: string;
    courseID: string;
    numericalOrder: number; 
    unitName: string; 
    description?: string;
    createdAt: string;
    updatedAt: string;
    contentUpdatedAt?: string;
    unit_tests: { testID: string; testName: string }[];
    unit_documents?: UnitDocument[];

    constructor(data: Partial<UnitEntity> & { unit_tests?: { testID: string; testName: string }[]; unit_documents?: UnitDocument[] }) {
        this.unitID = data.unitID || "";
        this.courseID = data.courseID || "";
        this.numericalOrder = data.numericalOrder || 0;
        this.unitName = data.unitName || "";
        this.description = data.description || "";
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
        this.unit_tests = data.unit_tests || [];
        this.unit_documents = data.unit_documents || [];
    }
}
