import * as React from "react";
import type { GlobalState } from "../globalState";
import { Control } from "gui/2D/controls/control";
import { Vector2, Vector3 } from "core/Maths/math.vector";
import { Scene } from "core/scene";
import { Container } from "gui/2D/controls/container";
import type { ISize } from "core/Maths/math";
import "./workbenchCanvas.scss";
export interface IWorkbenchComponentProps {
    globalState: GlobalState;
}
export declare enum ConstraintDirection {
    NONE = 0,
    X = 2,
    Y = 3
}
export declare class WorkbenchComponent extends React.Component<IWorkbenchComponentProps> {
    private _mouseDown;
    private _rootContainer;
    private _setConstraintDirection;
    private _mouseStartPoint;
    _scene: Scene;
    private _constraintDirection;
    private _panning;
    private _isOverGUINode;
    private _engine;
    private _guiRenderObserver;
    private _doubleClick;
    private _currLeft;
    private _currTop;
    private _controlsHit;
    private _pointerTravelDistance;
    private _processSelectionOnUp;
    private _visibleRegionContainer;
    private _centerZoomMousePosition;
    private _hasPerformedDragZoom;
    private static _addedFonts;
    static get addedFonts(): string[];
    get visibleRegionContainer(): Container;
    private _panAndZoomContainer;
    get panAndZoomContainer(): Container;
    private _trueRootContainer;
    set trueRootContainer(value: Container);
    get trueRootContainer(): Container;
    private _defaultGUISize;
    private _initialPanningOffset;
    private _panningOffset;
    private _zoomFactor;
    private _zoomModeIncrement;
    private _guiSize;
    private _pasteDisabled;
    get guiSize(): ISize;
    get pasteDisabled(): boolean;
    set guiSize(value: ISize);
    applyEditorTransformation(): void;
    removeEditorTransformation(): void;
    private _reframeWindow;
    constructor(props: IWorkbenchComponentProps);
    keyEvent: (evt: KeyboardEvent) => void;
    copyToClipboard(copyFn: (content: string) => void): void;
    cutToClipboard(copyFn: (content: string) => void): void;
    pasteFromClipboard(clipboardContents: string): boolean;
    CopyGUIControl(original: Control): void;
    blurEvent: () => void;
    /**
     * Adds editor observers to control and stores old data in metadata
     * @param guiControl
     */
    addEditorBehavior(guiControl: Control): void;
    /**
     * Removes editor behavior (observables, metadata) from control
     * @param control
     */
    removeEditorBehavior(control: Control): void;
    dispose(): void;
    loadFromJson(serializationObject: any): void;
    /**
     * Load Control from Json then select loaded Control
     * @param serializationObject
     */
    loadControlFromJson(serializationObject: any): void;
    loadFromSnippet(snippetId: string): Promise<void>;
    loadToEditor(): void;
    updateNodeOutlines(): void;
    appendBlock(guiElement: Control): Control;
    private parent;
    private _canClone;
    private _controlToLinkedMeshMap;
    private _observersMap;
    private _saveObservables;
    private _restoreObservables;
    private _copyEditorGUIToLiveGUI;
    private _reorderGrid;
    private _isNotChildInsert;
    private _adjustParentingIndex;
    isSelected(value: boolean, guiNode: Control): void;
    clicked: boolean;
    _onMove(guiControl: Control, evt: Vector2, startPos: Vector2): void;
    onMove(evt: React.PointerEvent): void;
    private _screenToTexturePosition;
    private getScaledPointerPosition;
    startPanning(): void;
    endPanning(): void;
    processSelection(): void;
    onDown(evt: React.PointerEvent<HTMLElement>): void;
    onUp(evt: React.PointerEvent): void;
    private _syncConnectedLines;
    private _copyLiveGUIToEditorGUI;
    createGUICanvas(embed?: boolean): void;
    synchronizeLiveGUI(): void;
    addControls(scene: Scene): void;
    panning(): void;
    moveControls(moveHorizontal: boolean, amount: number): void;
    zoomWheel(event: React.WheelEvent): void;
    private _panZoomToCenter;
    zoomDrag(event: React.MouseEvent): void;
    zooming(delta: number): void;
    zeroIfClose(vec: Vector3): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
