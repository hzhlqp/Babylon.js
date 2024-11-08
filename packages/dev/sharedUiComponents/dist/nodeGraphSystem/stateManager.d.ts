import type { Vector2 } from "core/Maths/math.vector";
import { Observable } from "core/Misc/observable";
import type { Nullable } from "core/types";
import type { FrameNodePort } from "./frameNodePort";
import type { GraphFrame } from "./graphFrame";
import type { GraphNode } from "./graphNode";
import type { INodeContainer } from "./interfaces/nodeContainer";
import type { INodeData } from "./interfaces/nodeData";
import type { IPortData } from "./interfaces/portData";
import type { ISelectionChangedOptions } from "./interfaces/selectionChangedOptions";
import type { NodePort } from "./nodePort";
import type { HistoryStack } from "../historyStack";
import type { Scene } from "core/scene";
export declare class StateManager {
    data: any;
    hostDocument: Document;
    lockObject: any;
    modalIsDisplayed: boolean;
    historyStack: HistoryStack;
    onSearchBoxRequiredObservable: Observable<{
        x: number;
        y: number;
    }>;
    onSelectionChangedObservable: Observable<Nullable<ISelectionChangedOptions>>;
    onFrameCreatedObservable: Observable<GraphFrame>;
    onUpdateRequiredObservable: Observable<any>;
    onGraphNodeRemovalObservable: Observable<GraphNode>;
    onSelectionBoxMoved: Observable<ClientRect | DOMRect>;
    onCandidateLinkMoved: Observable<Nullable<Vector2>>;
    onCandidatePortSelectedObservable: Observable<Nullable<FrameNodePort | NodePort>>;
    onNewNodeCreatedObservable: Observable<GraphNode>;
    onRebuildRequiredObservable: Observable<void>;
    onNodeMovedObservable: Observable<GraphNode>;
    onErrorMessageDialogRequiredObservable: Observable<string>;
    onExposePortOnFrameObservable: Observable<GraphNode>;
    onGridSizeChanged: Observable<void>;
    onNewBlockRequiredObservable: Observable<{
        type: string;
        targetX: number;
        targetY: number;
        needRepositioning?: boolean | undefined;
        smartAdd?: boolean | undefined;
    }>;
    onHighlightNodeObservable: Observable<{
        data: any;
        active: boolean;
    }>;
    onPreviewCommandActivated: Observable<boolean>;
    exportData: (data: any, frame?: Nullable<GraphFrame>) => string;
    isElbowConnectionAllowed: (nodeA: FrameNodePort | NodePort, nodeB: FrameNodePort | NodePort) => boolean;
    isDebugConnectionAllowed: (nodeA: FrameNodePort | NodePort, nodeB: FrameNodePort | NodePort) => boolean;
    applyNodePortDesign: (data: IPortData, element: HTMLElement, img: HTMLImageElement, pip: HTMLDivElement) => void;
    storeEditorData: (serializationObject: any, frame?: Nullable<GraphFrame>) => void;
    getEditorDataMap: () => {
        [key: number]: number;
    };
    getScene?: () => Scene;
    createDefaultInputData: (rootData: any, portData: IPortData, nodeContainer: INodeContainer) => Nullable<{
        data: INodeData;
        name: string;
    }>;
}
