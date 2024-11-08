import type { IDisplayManager } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
export declare class RemapDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    private _extractInputValue;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}
