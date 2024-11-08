import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import type { IDisplayManager } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
export declare class InputDisplayManager implements IDisplayManager {
    getHeaderClass(nodeData: INodeData): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    static GetBaseType(type: NodeMaterialBlockConnectionPointTypes): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}
