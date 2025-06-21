export class SelectionOption {
    label: string;
    action: () => void;
    color: string;
    textColor: string;

    constructor(data: Partial<SelectionOption>) {
        this.label = data.label || "Default Label";
        this.action = data.action || (() => console.log("Default action executed"));
        this.color = data.color || "hover:bg-gray-100";
        this.textColor = data.textColor || "hover:text-black-800";
    }
}