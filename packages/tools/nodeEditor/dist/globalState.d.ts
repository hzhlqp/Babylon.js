import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import { Observable } from "core/Misc/observable";
import { LogEntry } from "./components/log/logComponent";
import type { NodeMaterialBlock } from "core/Materials/Node/nodeMaterialBlock";
import { PreviewType } from "./components/preview/previewType";
import { Color4 } from "core/Maths/math.color";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import type { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import type { Nullable } from "core/types";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import type { FilesInput } from "core/Misc/filesInput";
export declare class GlobalState {
    hostElement: HTMLElement;
    hostDocument: Document;
    hostWindow: Window;
    stateManager: StateManager;
    onBuiltObservable: Observable<void>;
    onResetRequiredObservable: Observable<boolean>;
    onClearUndoStack: Observable<void>;
    onZoomToFitRequiredObservable: Observable<void>;
    onReOrganizedRequiredObservable: Observable<void>;
    onLogRequiredObservable: Observable<LogEntry>;
    onIsLoadingChanged: Observable<boolean>;
    onLightUpdated: Observable<void>;
    onBackgroundHDRUpdated: Observable<void>;
    onPreviewBackgroundChanged: Observable<void>;
    onBackFaceCullingChanged: Observable<void>;
    onDepthPrePassChanged: Observable<void>;
    onAnimationCommandActivated: Observable<void>;
    onImportFrameObservable: Observable<any>;
    onPopupClosedObservable: Observable<void>;
    onDropEventReceivedObservable: Observable<DragEvent>;
    onGetNodeFromBlock: (block: NodeMaterialBlock) => GraphNode;
    previewType: PreviewType;
    previewFile: File;
    envType: PreviewType;
    envFile: File;
    particleSystemBlendMode: number;
    listOfCustomPreviewFiles: File[];
    rotatePreview: boolean;
    backgroundColor: Color4;
    backFaceCulling: boolean;
    depthPrePass: boolean;
    lockObject: LockObject;
    hemisphericLight: boolean;
    directionalLight0: boolean;
    directionalLight1: boolean;
    backgroundHDR: boolean;
    controlCamera: boolean;
    _mode: NodeMaterialModes;
    _engine: number;
    pointerOverCanvas: boolean;
    filesInput: FilesInput;
    onRefreshPreviewMeshControlComponentRequiredObservable: Observable<void>;
    /** Gets the mode */
    get mode(): NodeMaterialModes;
    /** Sets the mode */
    set mode(m: NodeMaterialModes);
    /** Gets the engine */
    get engine(): number;
    /** Sets the engine */
    set engine(e: number);
    private _nodeMaterial;
    /**
     * Gets the current node material
     */
    get nodeMaterial(): NodeMaterial;
    /**
     * Sets the current node material
     */
    set nodeMaterial(nodeMaterial: NodeMaterial);
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    constructor();
    storeEditorData(serializationObject: any, frame?: Nullable<GraphFrame>): void;
}
