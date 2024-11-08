import type { IDisplayManager } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
/**
 *
 */
export declare class MeshAttributeExistsDisplayManager implements IDisplayManager {
    getHeaderClass(nodeData: INodeData): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(): void;
}
