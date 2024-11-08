/// <reference types="react" />
import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import type { LogEntry } from "./components/log/logComponent";
import { Color3 } from "core/Maths/math.color";
import type { WorkbenchComponent } from "./diagram/workbench";
import type { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { Scene } from "core/scene";
import type { Control } from "gui/2D/controls/control";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { ISize } from "core/Maths/math";
import { KeyboardManager } from "./keyboardManager";
export declare enum DragOverLocation {
    ABOVE = 0,
    BELOW = 1,
    CENTER = 2,
    NONE = 3
}
export declare enum GUIEditorTool {
    SELECT = 0,
    PAN = 1,
    ZOOM = 2
}
export declare class GlobalState {
    liveGuiTexture: Nullable<AdvancedDynamicTexture>;
    guiTexture: AdvancedDynamicTexture;
    hostElement: HTMLElement;
    hostDocument: HTMLDocument;
    hostWindow: Window;
    selectedControls: Control[];
    onSelectionChangedObservable: Observable<void>;
    onResizeObservable: Observable<ISize>;
    onBuiltObservable: Observable<void>;
    onResetRequiredObservable: Observable<void>;
    onUpdateRequiredObservable: Observable<void>;
    onLogRequiredObservable: Observable<LogEntry>;
    onErrorMessageDialogRequiredObservable: Observable<string>;
    onIsLoadingChanged: Observable<boolean>;
    onSelectionBoxMoved: Observable<ClientRect | DOMRect>;
    onNewSceneObservable: Observable<Nullable<Scene>>;
    onGuiNodeRemovalObservable: Observable<Control>;
    onPopupClosedObservable: Observable<void>;
    private _backgroundColor;
    private _outlines;
    keys: KeyboardManager;
    private _fromPG;
    /** DO NOT USE: in the process of removing */
    blockKeyboardEvents: boolean;
    onOutlineChangedObservable: Observable<void>;
    controlCamera: boolean;
    selectionLock: boolean;
    workbench: WorkbenchComponent;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
    private _tool;
    private _usePrevSelected;
    private _prevTool;
    onToolChangeObservable: Observable<void>;
    get tool(): GUIEditorTool;
    set tool(newTool: GUIEditorTool);
    get usePrevSelected(): boolean;
    set usePrevSelected(val: boolean);
    restorePreviousTool(): void;
    onFitControlsToWindowObservable: Observable<void>;
    onReframeWindowObservable: Observable<void>;
    onLoadObservable: Observable<File>;
    onSaveObservable: Observable<void>;
    onSaveSelectedControl: Observable<void>;
    onSnippetLoadObservable: Observable<void>;
    onSnippetSaveObservable: Observable<void>;
    onControlLoadObservable: Observable<File>;
    onResponsiveChangeObservable: Observable<boolean>;
    onParentingChangeObservable: Observable<Nullable<Control>>;
    onDropObservable: Observable<void>;
    onPropertyGridUpdateRequiredObservable: Observable<void>;
    onDraggingEndObservable: Observable<void>;
    onDraggingStartObservable: Observable<void>;
    onWindowResizeObservable: Observable<void>;
    onGizmoUpdateRequireObservable: Observable<void>;
    onArtBoardUpdateRequiredObservable: Observable<void>;
    onBackgroundColorChangeObservable: Observable<void>;
    onFontsParsedObservable: Observable<void>;
    onPointerMoveObservable: Observable<import("react").PointerEvent<HTMLCanvasElement>>;
    onPointerUpObservable: Observable<Nullable<PointerEvent | import("react").PointerEvent<HTMLCanvasElement>>>;
    draggedControl: Nullable<Control>;
    draggedControlDirection: DragOverLocation;
    onCopyObservable: Observable<(content: string) => void>;
    onCutObservable: Observable<(content: string) => void>;
    onPasteObservable: Observable<string>;
    isSaving: boolean;
    lockObject: LockObject;
    storeEditorData: (serializationObject: any) => void;
    shiftKeyPressed: boolean;
    customSave?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    customLoad?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    constructor();
    /** adds copy, cut and paste listeners to the host window */
    registerEventListeners(): void;
    get backgroundColor(): Color3;
    get fromPG(): boolean;
    set fromPG(value: boolean);
    set backgroundColor(value: Color3);
    get outlines(): boolean;
    set outlines(value: boolean);
    select(control: Control): void;
    setSelection(controls: Control[]): void;
    private _findParentControlInTexture;
    deleteSelectedNodes(): void;
    isMultiSelectable(control: Control): boolean;
    dispose(): void;
}
