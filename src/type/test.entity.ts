export class TestEntity {
    testID?: string;
    unitID?: string;
    testName?: string;
    numQuests?: number;
    duration?: number;
    description?: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: Partial<TestEntity>) {
        this.testID = data.testID || "";
        this.unitID = data.unitID || "";
        this.testName = data.testName || "";
        this.numQuests = data.numQuests || 0;
        this.duration = data.duration || 0;
        this.description = data.description || "";
        this.createdAt = data.createdAt
            ? new Date(data.createdAt).toLocaleString("de-DE")
            : "-";
        this.updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toLocaleString("de-DE")
            : "-";
    }
}
