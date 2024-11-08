import type { IDisplayManager } from "shared-ui-components/nodeGraphSystem/interfaces/displayManager";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
import type { Nullable } from "core/types";
import type { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
export declare class InputDisplayManager implements IDisplayManager {
    private _hasHighlights;
    getHeaderClass(nodeData: INodeData): string;
    getHeaderText(nodeData: INodeData): string;
    shouldDisplayPortLabels(): boolean;
    static GetBaseType(type: NodeGeometryBlockConnectionPointTypes): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
    onSelectionChanged(nodeData: INodeData, selectedData: Nullable<INodeData>, manager: StateManager): void;
    onDispose(nodeData: INodeData, manager: StateManager): void;
}
