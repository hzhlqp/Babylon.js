import * as React from "react";
import type { GlobalState } from "./globalState";
import type { Nullable } from "core/types";
import type { IInspectorOptions } from "core/Debug/debugLayer";
import "./main.scss";
import type { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import type { IEditorData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeLocationInfo";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
import { NodeRenderGraphBlock } from "core/FrameGraph/Node/nodeRenderGraphBlock";
interface IGraphEditorProps {
    globalState: GlobalState;
}
interface IGraphEditorState {
    showPreviewPopUp: boolean;
    message: string;
    isError: boolean;
}
interface IInternalPreviewAreaOptions extends IInspectorOptions {
    popup: boolean;
    original: boolean;
    explorerWidth?: string;
    inspectorWidth?: string;
    embedHostWidth?: string;
}
export declare class GraphEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
    private _graphCanvasRef;
    private _diagramContainerRef;
    private _graphCanvas;
    private _diagramContainer;
    private _startX;
    private _moveInProgress;
    private _leftWidth;
    private _rightWidth;
    private _previewManager;
    private _mouseLocationX;
    private _mouseLocationY;
    private _onWidgetKeyUpPointer;
    private _previewHost;
    private _popUpWindow;
    private _externalTextures;
    appendBlock(dataToAppend: NodeRenderGraphBlock | INodeData, recursion?: boolean): GraphNode;
    addValueNode(type: string): GraphNode;
    componentDidMount(): void;
    componentWillUnmount(): void;
    constructor(props: IGraphEditorProps);
    zoomToFit(): void;
    private _setExternalInputs;
    buildRenderGraph(): void;
    build(ignoreEditorData?: boolean): void;
    loadGraph(): void;
    showWaitScreen(): void;
    hideWaitScreen(): void;
    reOrganize(editorData?: Nullable<IEditorData>, isImportingAFrame?: boolean): void;
    onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onWheel: (evt: WheelEvent) => void;
    resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
    buildColumnLayout(): string;
    emitNewBlock(blockType: string, targetX: number, targetY: number): GraphNode | undefined;
    dropNewBlock(event: React.DragEvent<HTMLDivElement>): void;
    handlePopUp: () => void;
    handleClosingPopUp: () => void;
    initiatePreviewArea: (canvas?: HTMLCanvasElement) => void;
    createPopUp: () => void;
    createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
    createPreviewMeshControlHost: (options: IInternalPreviewAreaOptions, parentControl: Nullable<HTMLElement>) => void;
    createPreviewHost: (options: IInternalPreviewAreaOptions, parentControl: Nullable<HTMLElement>) => void;
    fixPopUpStyles: (document: Document) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
