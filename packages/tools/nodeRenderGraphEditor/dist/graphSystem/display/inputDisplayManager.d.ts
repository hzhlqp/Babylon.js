import type { IDisplayManager } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
export declare class InputDisplayManager implements IDisplayManager {
    getHeaderClass(_nodeData: INodeData): string;
    getHeaderText(nodeData: INodeData): string;
    shouldDisplayPortLabels(): boolean;
    static GetBaseType(type: NodeRenderGraphBlockConnectionPointTypes): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}
