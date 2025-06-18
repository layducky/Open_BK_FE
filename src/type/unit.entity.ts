export class UnitEntity {
    unitID: string;
    courseID: string;
    numericalOrder: number; 
    unitName: string; 
    description?: string;
    createdAt: string;
    updatedAt: string;
    unit_tests: { testID: string; testName: string }[];

    constructor(data: Partial<UnitEntity> & { unit_tests?: { testID: string; testName: string }[] }) {
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
    }
}
