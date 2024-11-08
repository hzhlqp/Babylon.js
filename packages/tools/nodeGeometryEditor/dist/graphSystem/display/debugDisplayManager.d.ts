import type { IDisplayManager, VisualContentDescription } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
export declare class DebugDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(_nodeData: INodeData, _contentArea: HTMLDivElement): void;
    updateFullVisualContent(data: INodeData, visualContent: VisualContentDescription): void;
}
