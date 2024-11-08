import type { NodeRenderGraph } from "core/FrameGraph/Node/nodeRenderGraph";
import { Observable } from "core/Misc/observable";
import { LogEntry } from "./components/log/logComponent";
import type { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import type { Nullable } from "core/types";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import type { NodeRenderGraphBlock } from "core/FrameGraph/Node/nodeRenderGraphBlock";
import type { FilesInput } from "core/Misc/filesInput";
import { PreviewType } from "./components/preview/previewType";
import type { Scene } from "core/scene";
export declare class GlobalState {
    hostElement: HTMLElement;
    hostDocument: Document;
    hostWindow: Window;
    stateManager: StateManager;
    onBuiltObservable: Observable<void>;
    onResetRequiredObservable: Observable<boolean>;
    onZoomToFitRequiredObservable: Observable<void>;
    onReOrganizedRequiredObservable: Observable<void>;
    onLogRequiredObservable: Observable<LogEntry>;
    onIsLoadingChanged: Observable<boolean>;
    onLightUpdated: Observable<void>;
    onFrame: Observable<void>;
    onAnimationCommandActivated: Observable<void>;
    onImportFrameObservable: Observable<any>;
    onPopupClosedObservable: Observable<void>;
    onGetNodeFromBlock: (block: NodeRenderGraphBlock) => GraphNode;
    onDropEventReceivedObservable: Observable<DragEvent>;
    previewType: PreviewType;
    previewFile: File;
    envType: PreviewType;
    envFile: File;
    listOfCustomPreviewFiles: File[];
    rotatePreview: boolean;
    lockObject: LockObject;
    hemisphericLight: boolean;
    directionalLight0: boolean;
    directionalLight1: boolean;
    pointerOverCanvas: boolean;
    onRefreshPreviewMeshControlComponentRequiredObservable: Observable<void>;
    filesInput: FilesInput;
    scene: Scene;
    noAutoFillExternalInputs: boolean;
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    private _nodeRenderGraph;
    /**
     * Gets the current node render graph
     */
    get nodeRenderGraph(): NodeRenderGraph;
    /**
     * Sets the current node material
     */
    set nodeRenderGraph(nodeRenderGraph: NodeRenderGraph);
    constructor(scene: Scene);
    storeEditorData(serializationObject: any, frame?: Nullable<GraphFrame>): void;
}
