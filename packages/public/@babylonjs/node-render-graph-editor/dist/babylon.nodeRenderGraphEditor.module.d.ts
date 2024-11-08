
declare module "@babylonjs/node-render-graph-editor/serializationTools" {
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { Nullable } from "@babylonjs/core/types";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { NodeRenderGraph } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraph";
export class SerializationTools {
    static UpdateLocations(renderGraph: NodeRenderGraph, globalState: GlobalState, frame?: Nullable<GraphFrame>): void;
    static Serialize(renderGraph: NodeRenderGraph, globalState: GlobalState, frame?: Nullable<GraphFrame>): string;
    static Deserialize(serializationObject: any, globalState: GlobalState): void;
    static AddFrameToRenderGraph(serializationObject: any, globalState: GlobalState, currentRenderGraph: NodeRenderGraph): void;
}

}
declare module "@babylonjs/node-render-graph-editor/portal" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
interface IPortalProps {
    globalState: GlobalState;
}
export class Portal extends React.Component<IPortalProps> {
    render(): React.ReactPortal;
}
export {};

}
declare module "@babylonjs/node-render-graph-editor/nodeRenderGraphEditor" {
import { NodeRenderGraph } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraph";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Scene } from "@babylonjs/core/scene";
/**
 * Interface used to specify creation options for the node editor
 */
export interface INodeEditorOptions {
    nodeRenderGraph: NodeRenderGraph;
    hostScene?: Scene;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    customLoadObservable?: Observable<any>;
}
/**
 * Class used to create a node editor
 */
export class NodeRenderGraphEditor {
    private static _CurrentState;
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options: INodeEditorOptions): void;
}

}
declare module "@babylonjs/node-render-graph-editor/index" {
export * from "@babylonjs/node-render-graph-editor/nodeRenderGraphEditor";

}
declare module "@babylonjs/node-render-graph-editor/graphEditor" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { Nullable } from "@babylonjs/core/types";
import { IInspectorOptions } from "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/node-render-graph-editor/main.scss";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { IEditorData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { NodeRenderGraphBlock } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlock";
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
export class GraphEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
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

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/globalState" {
import { NodeRenderGraph } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraph";
import { Observable } from "@babylonjs/core/Misc/observable";
import { LogEntry } from "@babylonjs/node-render-graph-editor/components/log/logComponent";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { Nullable } from "@babylonjs/core/types";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { NodeRenderGraphBlock } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlock";
import { FilesInput } from "@babylonjs/core/Misc/filesInput";
import { PreviewType } from "@babylonjs/node-render-graph-editor/components/preview/previewType";
import { Scene } from "@babylonjs/core/scene";
export class GlobalState {
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

}
declare module "@babylonjs/node-render-graph-editor/blockTools" {
import { Scene } from "@babylonjs/core/scene";
import { NodeRenderGraphBlockConnectionPointTypes } from "@babylonjs/core/FrameGraph/Node/Types/nodeRenderGraphTypes";
import { NodeRenderGraphOutputBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/outputBlock";
import { NodeRenderGraphInputBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/inputBlock";
import { NodeRenderGraphElbowBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/elbowBlock";
import { NodeRenderGraphTeleportInBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Teleport/teleportInBlock";
import { NodeRenderGraphTeleportOutBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Teleport/teleportOutBlock";
import { NodeRenderGraphBlackAndWhitePostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/blackAndWhitePostProcessBlock";
import { NodeRenderGraphBloomPostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/bloomPostProcessBlock";
import { NodeRenderGraphBlurPostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/blurPostProcessBlock";
import { NodeRenderGraphCircleOfConfusionPostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/circleOfConfusionPostProcessBlock";
import { NodeRenderGraphDepthOfFieldPostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/depthOfFieldPostProcessBlock";
import { NodeRenderGraphExtractHighlightsPostProcessBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/PostProcesses/extractHighlightsPostProcessBlock";
import { NodeRenderGraphClearBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Textures/clearBlock";
import { NodeRenderGraphCopyTextureBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Textures/copyTextureBlock";
import { NodeRenderGraphGenerateMipmapsBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Textures/generateMipmapsBlock";
import { NodeRenderGraphObjectRendererBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Rendering/objectRendererBlock";
import { NodeRenderGraphGeometryRendererBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Rendering/geometryRendererBlock";
import { NodeRenderGraphCullObjectsBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Rendering/cullObjectsBlock";
import { NodeRenderGraphGUIBlock } from "@babylonjs/gui/2D/FrameGraph/renderGraphGUIBlock";
import { FrameGraph } from "@babylonjs/core/FrameGraph/frameGraph";
/**
 * Static class for BlockTools
 */
export class BlockTools {
    static GetBlockFromString(data: string, frameGraph: FrameGraph, scene: Scene): NodeRenderGraphTeleportInBlock | NodeRenderGraphTeleportOutBlock | NodeRenderGraphOutputBlock | NodeRenderGraphElbowBlock | NodeRenderGraphInputBlock | NodeRenderGraphClearBlock | NodeRenderGraphCopyTextureBlock | NodeRenderGraphGenerateMipmapsBlock | NodeRenderGraphBlackAndWhitePostProcessBlock | NodeRenderGraphBloomPostProcessBlock | NodeRenderGraphBlurPostProcessBlock | NodeRenderGraphGUIBlock | NodeRenderGraphObjectRendererBlock | NodeRenderGraphGeometryRendererBlock | NodeRenderGraphCullObjectsBlock | NodeRenderGraphCircleOfConfusionPostProcessBlock | NodeRenderGraphDepthOfFieldPostProcessBlock | NodeRenderGraphExtractHighlightsPostProcessBlock | null;
    static GetColorFromConnectionNodeType(type: NodeRenderGraphBlockConnectionPointTypes): string;
    static GetConnectionNodeTypeFromString(type: string): NodeRenderGraphBlockConnectionPointTypes.Texture | NodeRenderGraphBlockConnectionPointTypes.TextureBackBuffer | NodeRenderGraphBlockConnectionPointTypes.TextureBackBufferDepthStencilAttachment | NodeRenderGraphBlockConnectionPointTypes.TextureDepthStencilAttachment | NodeRenderGraphBlockConnectionPointTypes.TextureViewDepth | NodeRenderGraphBlockConnectionPointTypes.TextureViewNormal | NodeRenderGraphBlockConnectionPointTypes.TextureAlbedo | NodeRenderGraphBlockConnectionPointTypes.TextureReflectivity | NodeRenderGraphBlockConnectionPointTypes.TextureWorldPosition | NodeRenderGraphBlockConnectionPointTypes.TextureVelocity | NodeRenderGraphBlockConnectionPointTypes.TextureScreenDepth | NodeRenderGraphBlockConnectionPointTypes.TextureWorldNormal | NodeRenderGraphBlockConnectionPointTypes.TextureLocalPosition | NodeRenderGraphBlockConnectionPointTypes.TextureLinearVelocity | NodeRenderGraphBlockConnectionPointTypes.Camera | NodeRenderGraphBlockConnectionPointTypes.ObjectList | NodeRenderGraphBlockConnectionPointTypes.AutoDetect;
    static GetStringFromConnectionNodeType(type: NodeRenderGraphBlockConnectionPointTypes): "" | "Texture" | "Camera" | "TextureBackBuffer" | "TextureBackBufferDepthStencilAttachment" | "TextureDepthStencilAttachment" | "ObjectList" | "TextureNormal" | "TextureAlbedo" | "TextureReflectivity" | "TexturePosition" | "TextureVelocity" | "TextureScreenDepth" | "TextureLocalPosition" | "TextureWorldNormal" | "TextureLinearVelocity" | "TextureDepth";
}

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/textureLineComponent" {
import * as React from "react";
import { BaseTexture } from "@babylonjs/core/Materials/Textures/baseTexture";
interface ITextureLineComponentProps {
    texture: BaseTexture;
    width: number;
    height: number;
    globalState?: any;
    hideChannelSelect?: boolean;
}
export interface ITextureLineComponentState {
    displayRed: boolean;
    displayGreen: boolean;
    displayBlue: boolean;
    displayAlpha: boolean;
    face: number;
}
export class TextureLineComponent extends React.Component<ITextureLineComponentProps, ITextureLineComponentState> {
    private _canvasRef;
    constructor(props: ITextureLineComponentProps);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updatePreview(): void;
    static UpdatePreview(previewCanvas: HTMLCanvasElement, texture: BaseTexture, width: number, options: ITextureLineComponentState, onReady?: () => void, globalState?: any): Promise<void>;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/popup" {
export class Popup {
    static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
    static _CopyStyles(sourceDoc: HTMLDocument, targetDoc: HTMLDocument): void;
}

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/lineWithFileButtonComponent" {
import * as React from "react";
interface ILineWithFileButtonComponentProps {
    title: string;
    closed?: boolean;
    label: string;
    iconImage: any;
    onIconClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
    isExpanded: boolean;
}> {
    private _uploadRef;
    constructor(props: ILineWithFileButtonComponentProps);
    onChange(evt: any): void;
    switchExpandedState(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/lineContainerComponent" {
import * as React from "react";
interface ILineContainerComponentProps {
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;


}
export {};

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/fileButtonLineComponent" {
import * as React from "react";
interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private _uploadRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/draggableLineWithButtonComponent" {
import * as React from "react";
export interface IDraggableLineWithButtonComponent {
    data: string;
    tooltip: string;
    iconImage: any;
    onIconClick: (value: string) => void;
    iconTitle: string;
    lenSuffixToRemove?: number;
}
export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
    constructor(props: IDraggableLineWithButtonComponent);

}

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/draggableLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    data: string;
    tooltip: string;
}
export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/sharedComponents/checkBoxLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
export interface ICheckBoxLineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    isSelected?: () => boolean;
    onSelect?: (value: boolean) => void;
    onValueChanged?: () => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    disabled?: boolean;
    extractValue?: (target: any) => boolean;
}
export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
    isSelected: boolean;
    isDisabled?: boolean;
}> {
    private static _UniqueIdSeed;
    private _uniqueId;
    private _localChange;
    constructor(props: ICheckBoxLineComponentProps);
    shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
        isSelected: boolean;
        isDisabled: boolean;
    }): boolean;
    onChange(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/legacy/legacy" {
export * from "@babylonjs/node-render-graph-editor/index";

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerToTypeLedger" {
export const RegisterTypeLedger: () => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerToPropertyLedger" {
export const RegisterToPropertyTabManagers: () => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerToDisplayLedger" {
export const RegisterToDisplayManagers: () => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerNodePortDesign" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export const RegisterNodePortDesign: (stateManager: StateManager) => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerExportData" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export const RegisterExportData: (stateManager: StateManager) => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerElbowSupport" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export const RegisterElbowSupport: (stateManager: StateManager) => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerDefaultInput" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export const RegisterDefaultInput: (stateManager: StateManager) => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/registerDebugSupport" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export const RegisterDebugSupport: (stateManager: StateManager) => void;

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/connectionPointPortData" {
import { NodeRenderGraphBlock } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlock";
import { NodeRenderGraphConnectionPoint } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlockConnectionPoint";
import { NodeRenderGraphConnectionPointCompatibilityStates } from "@babylonjs/core/FrameGraph/Node/Types/nodeRenderGraphTypes";
import { Nullable } from "@babylonjs/core/types";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { INodeContainer } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { PortDataDirection } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
export class ConnectionPointPortData implements IPortData {
    private _connectedPort;
    private _nodeContainer;
    data: NodeRenderGraphConnectionPoint;
    get name(): string;
    get internalName(): string;
    get isExposedOnFrame(): boolean;
    set isExposedOnFrame(value: boolean);
    get exposedPortPosition(): number;
    set exposedPortPosition(value: number);
    get isConnected(): boolean;
    get connectedPort(): Nullable<IPortData>;
    set connectedPort(value: Nullable<IPortData>);
    get direction(): PortDataDirection;
    get ownerData(): NodeRenderGraphBlock;
    get needDualDirectionValidation(): boolean;
    get hasEndpoints(): boolean;
    get endpoints(): IPortData[];
    constructor(connectionPoint: NodeRenderGraphConnectionPoint, nodeContainer: INodeContainer);
    updateDisplayName(newName: string): void;
    connectTo(port: IPortData): void;
    canConnectTo(port: IPortData): boolean;
    disconnectFrom(port: IPortData): void;
    checkCompatibilityState(port: IPortData): 0 | NodeRenderGraphConnectionPointCompatibilityStates.TypeIncompatible | NodeRenderGraphConnectionPointCompatibilityStates.HierarchyIssue;
    getCompatibilityIssueMessage(issue: number, targetNode: GraphNode, targetPort: IPortData): "" | "Cannot connect two different connection types" | "Source block cannot be connected with one of its ancestors";
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/blockNodeData" {
import { INodeContainer } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { NodeRenderGraphBlock } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlock";
import { NodeRenderGraphTeleportOutBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/Teleport/teleportOutBlock";
export class BlockNodeData implements INodeData {
    data: NodeRenderGraphBlock;
    private _inputs;
    private _outputs;
    private _onBuildObserver;
    /**
     * Gets or sets a callback used to call node visual refresh
     */
    refreshCallback?: () => void;
    get uniqueId(): number;
    get name(): string;
    getClassName(): string;
    get isInput(): boolean;
    get inputs(): IPortData[];
    get outputs(): IPortData[];
    get comments(): string;
    set comments(value: string);
    get executionTime(): number;
    getPortByName(name: string): IPortData | null;
    isConnectedToOutput(): boolean;
    dispose(): void;
    prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
    get invisibleEndpoints(): NodeRenderGraphTeleportOutBlock[] | null;
    constructor(data: NodeRenderGraphBlock, nodeContainer: INodeContainer);
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/teleportOutNodePropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class TeleportOutPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onUpdateRequiredObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/nodePortPropertyComponent" {
import * as React from "react";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    nodePort: NodePort;
}
export class NodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps> {
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    toggleExposeOnFrame(value: boolean): void;

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/inputNodePropertyComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { IPropertyComponentProps } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class InputPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onValueChangedObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;

    setDefaultValue(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/genericNodePropertyComponent" {
import * as React from "react";
import { IPropertyComponentProps } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export const samplingModeList: {
    label: string;
    value: number;
}[];
export const textureFormatList: {
    label: string;
    value: number;
}[];
export const textureTypeList: {
    label: string;
    value: number;
}[];
export const textureDepthStencilFormatList: {
    label: string;
    value: number;
}[];
export class GenericPropertyComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);

}
export class GeneralPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);

}
export class GenericPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/framePropertyComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
export interface IFramePropertyTabComponentProps {
    globalState: GlobalState;
    frame: GraphFrame;
}
export class FramePropertyTabComponent extends React.Component<IFramePropertyTabComponentProps> {
    private _onFrameExpandStateChangedObserver;
    constructor(props: IFramePropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/properties/frameNodePortPropertyComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    globalState: GlobalState;
    frameNodePort: FrameNodePort;
    frame: GraphFrame;
}
export class FrameNodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps, {
    port: FrameNodePort;
}> {
    private _onFramePortPositionChangedObserver;
    private _onSelectionChangedObserver;
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    componentWillUnmount(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/textureDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export class TextureDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/teleportOutDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { Nullable } from "@babylonjs/core/types";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export class TeleportOutDisplayManager implements IDisplayManager {
    private _hasHighlights;
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
    onSelectionChanged(nodeData: INodeData, selectedData: Nullable<INodeData>, manager: StateManager): void;
    onDispose(nodeData: INodeData, manager: StateManager): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/teleportInDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { Nullable } from "@babylonjs/core/types";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export class TeleportInDisplayManager implements IDisplayManager {
    private _hasHighlights;
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
    onSelectionChanged(nodeData: INodeData, selectedData: Nullable<INodeData>, manager: StateManager): void;
    onDispose(nodeData: INodeData, manager: StateManager): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/postProcessDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export class PostProcessDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/outputDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export class OutputDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/inputDisplayManager" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { NodeRenderGraphBlockConnectionPointTypes } from "@babylonjs/core/FrameGraph/Node/Types/nodeRenderGraphTypes";
export class InputDisplayManager implements IDisplayManager {
    getHeaderClass(_nodeData: INodeData): string;
    getHeaderText(nodeData: INodeData): string;
    shouldDisplayPortLabels(): boolean;
    static GetBaseType(type: NodeRenderGraphBlockConnectionPointTypes): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(nodeData: INodeData, contentArea: HTMLDivElement): void;
}

}
declare module "@babylonjs/node-render-graph-editor/graphSystem/display/elbowDisplayManager" {
import { IDisplayManager, VisualContentDescription } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export class ElbowDisplayManager implements IDisplayManager {
    getHeaderClass(): string;
    shouldDisplayPortLabels(): boolean;
    getHeaderText(nodeData: INodeData): string;
    getBackgroundColor(nodeData: INodeData): string;
    updatePreviewContent(_nodeData: INodeData, _contentArea: HTMLDivElement): void;
    updateFullVisualContent(data: INodeData, visualContent: VisualContentDescription): void;
}

}
declare module "@babylonjs/node-render-graph-editor/components/propertyTab/propertyTabComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { Nullable } from "@babylonjs/core/types";
import "@babylonjs/node-render-graph-editor/components/propertyTab/propertyTab.scss";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IPropertyTabComponentProps {
    globalState: GlobalState;
    lockObject: LockObject;
}
interface IPropertyTabComponentState {
    currentNode: Nullable<GraphNode>;
    currentFrame: Nullable<GraphFrame>;
    currentFrameNodePort: Nullable<FrameNodePort>;
    currentNodePort: Nullable<NodePort>;
    uploadInProgress: boolean;
}
export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps, IPropertyTabComponentState> {
    private _onBuiltObserver;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    load(file: File): void;
    loadFrame(file: File): void;
    save(): void;
    customSave(): void;
    saveToSnippetServer(): void;
    loadFromSnippet(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/propertyTab/inputsPropertyTabComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import "@babylonjs/node-render-graph-editor/components/propertyTab/propertyTab.scss";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { NodeRenderGraphInputBlock } from "@babylonjs/core/FrameGraph/Node/Blocks/inputBlock";
interface IInputsPropertyTabComponentProps {
    globalState: GlobalState;
    inputs: NodeRenderGraphInputBlock[];
    lockObject: LockObject;
}
export class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
    constructor(props: IInputsPropertyTabComponentProps);
    processInputBlockUpdate(): void;


}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/preview/previewType" {
export enum PreviewType {
    Sphere = 0,
    Box = 1,
    Cylinder = 2,
    Plane = 3,
    ShaderBall = 4,
    Custom = 5,
    Room = 6
}

}
declare module "@babylonjs/node-render-graph-editor/components/preview/previewMeshControlComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import { PreviewType } from "@babylonjs/node-render-graph-editor/components/preview/previewType";
interface IPreviewMeshControlComponent {
    globalState: GlobalState;
    togglePreviewAreaComponent: () => void;
}
export class PreviewMeshControlComponent extends React.Component<IPreviewMeshControlComponent> {
    private _filePickerRef;
    private _envPickerRef;
    private _onResetRequiredObserver;
    private _onDropEventObserver;
    private _onRefreshPreviewMeshControlComponentRequiredObserver;
    constructor(props: IPreviewMeshControlComponent);
    componentWillUnmount(): void;
    changeMeshType(newOne: PreviewType): void;
    useCustomMesh(evt: any): void;
    useCustomEnv(evt: any): void;
    onPopUp(): void;
    frame(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/preview/previewManager" {
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import "@babylonjs/core/Rendering/depthRendererSceneComponent";
export class PreviewManager {
    private _nodeRenderGraph;
    private _onFrameObserver;
    private _onPreviewCommandActivatedObserver;
    private _onUpdateRequiredObserver;
    private _onRebuildRequiredObserver;
    private _onImportFrameObserver;
    private _onResetRequiredObserver;
    private _onLightUpdatedObserver;
    private _engine;
    private _scene;
    private _globalState;
    private _currentType;
    private _lightParent;
    private _hdrTexture;
    constructor(targetCanvas: HTMLCanvasElement, globalState: GlobalState);
    private _initAsync;
    private _initScene;
    private _reset;
    private _prepareLights;
    private _createNodeRenderGraph;
    private _buildGraph;
    private _frameCamera;
    private _prepareBackgroundHDR;
    private _prepareScene;
    static DefaultEnvironmentURL: string;
    private _refreshPreviewMesh;
    dispose(): void;
}

}
declare module "@babylonjs/node-render-graph-editor/components/preview/previewAreaComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
interface IPreviewAreaComponentProps {
    globalState: GlobalState;
    width: number;
}
export class PreviewAreaComponent extends React.Component<IPreviewAreaComponentProps, {
    isLoading: boolean;
}> {
    private _onIsLoadingChangedObserver;
    private _onResetRequiredObserver;
    constructor(props: IPreviewAreaComponentProps);
    componentWillUnmount(): void;
    _onPointerOverCanvas: () => void;
    _onPointerOutCanvas: () => void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/nodeList/nodeListComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import "@babylonjs/node-render-graph-editor/components/nodeList/nodeList.scss";
interface INodeListComponentProps {
    globalState: GlobalState;
}
export class NodeListComponent extends React.Component<INodeListComponentProps, {
    filter: string;
}> {
    private _onResetRequiredObserver;
    private static _Tooltips;
    private _customFrameList;
    constructor(props: INodeListComponentProps);
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    loadCustomFrame(file: File): void;
    removeItem(value: string): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/log/logComponent" {
import * as React from "react";
import { GlobalState } from "@babylonjs/node-render-graph-editor/globalState";
import "@babylonjs/node-render-graph-editor/components/log/log.scss";
interface ILogComponentProps {
    globalState: GlobalState;
}
export class LogEntry {
    message: string;
    isError: boolean;
    time: Date;
    constructor(message: string, isError: boolean);
}
export class LogComponent extends React.Component<ILogComponentProps, {
    logs: LogEntry[];
}> {
    private _logConsoleRef;
    constructor(props: ILogComponentProps);
    componentDidMount(): void;
    componentDidUpdate(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/stringTools" {
export class StringTools {
    private static _SaveAs;
    private static _Click;
    /**
     * Download a string into a file that will be saved locally by the browser
     * @param document
     * @param content defines the string to download locally as a file
     * @param filename
     */
    static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
}

}
declare module "@babylonjs/node-render-graph-editor/propertyChangedEvent" {
export class PropertyChangedEvent {
    object: any;
    property: string;
    value: any;
    initialValue: any;
    allowNullValue?: boolean;
}

}
declare module "@babylonjs/node-render-graph-editor/historyStack" {
import { IDisposable } from "@babylonjs/core/scene";
/**
 * Class handling undo / redo operations
 */
export class HistoryStack implements IDisposable {
    private _historyStack;
    private _redoStack;
    private _activeData;
    private readonly _maxHistoryLength;
    private _locked;
    private _dataProvider;
    private _applyUpdate;
    /**
     * Gets or sets a boolean indicating if the stack is enabled
     */
    isEnabled: boolean;
    /**
     * Constructor
     * @param dataProvider defines the data provider function
     * @param applyUpdate defines the code to execute when undo/redo operation is required
     */
    constructor(dataProvider: () => any, applyUpdate: (data: any) => void);
    /**
     * Process key event to handle undo / redo
     * @param evt defines the keyboard event to process
     * @returns true if the event was processed
     */
    processKeyEvent(evt: KeyboardEvent): boolean;
    /**
     * Resets the stack
     */
    reset(): void;
    /**
     * Remove the n-1 element of the stack
     */
    collapseLastTwo(): void;
    private _generateJSONDiff;
    private _applyJSONDiff;
    private _copy;
    /**
     * Stores the current state
     */
    store(): void;
    /**
     * Undo the latest operation
     */
    undo(): void;
    /**
     * Redo the latest undo operation
     */
    redo(): void;
    /**
     * Disposes the stack
     */
    dispose(): void;
}

}
declare module "@babylonjs/node-render-graph-editor/copyCommandToClipboard" {
export function copyCommandToClipboard(strCommand: string): void;
export function getClassNameWithNamespace(obj: any): {
    className: string;
    babylonNamespace: string;
};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject" {
/**
 * Class used to provide lock mechanism
 */
export class LockObject {
    /**
     * Gets or set if the lock is engaged
     */
    lock: boolean;
}

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/textBlockPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface ITextBlockPropertyGridComponentProps {
    textBlock: TextBlock;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
    constructor(props: ITextBlockPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/stackPanelPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { StackPanel } from "@babylonjs/gui/2D/controls/stackPanel";
interface IStackPanelPropertyGridComponentProps {
    stackPanel: StackPanel;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
    constructor(props: IStackPanelPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/sliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Slider } from "@babylonjs/gui/2D/controls/sliders/slider";
interface ISliderPropertyGridComponentProps {
    slider: Slider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
    constructor(props: ISliderPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/scrollViewerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { ScrollViewer } from "@babylonjs/gui/2D/controls/scrollViewers/scrollViewer";
interface IScrollViewerPropertyGridComponentProps {
    scrollViewer: ScrollViewer;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
    constructor(props: IScrollViewerPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/rectanglePropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
interface IRectanglePropertyGridComponentProps {
    rectangle: Rectangle;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
    constructor(props: IRectanglePropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/radioButtonPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { RadioButton } from "@babylonjs/gui/2D/controls/radioButton";
interface IRadioButtonPropertyGridComponentProps {
    radioButtons: RadioButton[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
    constructor(props: IRadioButtonPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/linePropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Line } from "@babylonjs/gui/2D/controls/line";
interface ILinePropertyGridComponentProps {
    line: Line;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
    constructor(props: ILinePropertyGridComponentProps);
    onDashChange(value: string): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/inputTextPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { InputText } from "@babylonjs/gui/2D/controls/inputText";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IInputTextPropertyGridComponentProps {
    inputText: InputText;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
    constructor(props: IInputTextPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/imagePropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Image } from "@babylonjs/gui/2D/controls/image";
interface IImagePropertyGridComponentProps {
    image: Image;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
    constructor(props: IImagePropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/imageBasedSliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { ImageBasedSlider } from "@babylonjs/gui/2D/controls/sliders/imageBasedSlider";
interface IImageBasedSliderPropertyGridComponentProps {
    imageBasedSlider: ImageBasedSlider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
    constructor(props: IImageBasedSliderPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/gridPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Grid } from "@babylonjs/gui/2D/controls/grid";
interface IGridPropertyGridComponentProps {
    grid: Grid;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
    constructor(props: IGridPropertyGridComponentProps);



}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/ellipsePropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse";
interface IEllipsePropertyGridComponentProps {
    ellipse: Ellipse;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
    constructor(props: IEllipsePropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/controlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IControlPropertyGridComponentProps {
    control: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
    constructor(props: IControlPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/commonControlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface ICommonControlPropertyGridComponentProps {
    controls?: Control[];
    control?: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
    constructor(props: ICommonControlPropertyGridComponentProps);


}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/colorPickerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { ColorPicker } from "@babylonjs/gui/2D/controls/colorpicker";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IColorPickerPropertyGridComponentProps {
    colorPicker: ColorPicker;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
    constructor(props: IColorPickerPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/tabs/propertyGrids/gui/checkboxPropertyGridComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import { Checkbox } from "@babylonjs/gui/2D/controls/checkbox";
interface ICheckboxPropertyGridComponentProps {
    checkbox: Checkbox;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
    constructor(props: ICheckboxPropertyGridComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/typeLedger" {
import { INodeContainer } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
export class TypeLedger {
    static PortDataBuilder: (port: NodePort, nodeContainer: INodeContainer) => IPortData;
    static NodeDataBuilder: (data: any, nodeContainer: INodeContainer) => INodeData;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/tools" {
import { GraphCanvasComponent } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphCanvas";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLink";
import { FramePortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/types/framePortData";
export const IsFramePortData: (variableToCheck: any) => variableToCheck is FramePortData;
export const RefreshNode: (node: GraphNode, visitedNodes?: Set<GraphNode>, visitedLinks?: Set<NodeLink>, canvas?: GraphCanvasComponent) => void;

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager" {
import { Vector2 } from "@babylonjs/core/Maths/math.vector";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Nullable } from "@babylonjs/core/types";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { INodeContainer } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { ISelectionChangedOptions } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { HistoryStack } from "@babylonjs/node-render-graph-editor/historyStack";
import { Scene } from "@babylonjs/core/scene";
export class StateManager {
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

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/searchBox" {
import * as React from "react";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import "@babylonjs/node-render-graph-editor/nodeGraphSystem/searchBox.scss";
export interface ISearchBoxComponentProps {
    stateManager: StateManager;
}
/**
 * The search box component.
 */
export class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
    isVisible: boolean;
    filter: string;
    selectedIndex: number;
}> {
    private _handleEscKey;
    private _targetX;
    private _targetY;
    private _nodes;
    constructor(props: ISearchBoxComponentProps);
    hide(): void;
    onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    onNewNodeRequested(name: string): void;
    onKeyDown(evt: React.KeyboardEvent): void;

}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/propertyLedger" {
import { ComponentClass } from "react";
import { IPropertyComponentProps } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class PropertyLedger {
    static DefaultControl: ComponentClass<IPropertyComponentProps>;
    static RegisteredControls: {
        [key: string]: ComponentClass<IPropertyComponentProps>;
    };
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort" {
import { Nullable } from "@babylonjs/core/types";
import { Observer } from "@babylonjs/core/Misc/observable";
import { Vector2 } from "@babylonjs/core/Maths/math.vector";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { ISelectionChangedOptions } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
export class NodePort {
    portData: IPortData;
    node: GraphNode;
    protected _element: HTMLDivElement;
    protected _img: HTMLImageElement;
    protected _pip: HTMLDivElement;
    protected _stateManager: StateManager;
    protected _portLabelElement: Element;
    protected _onCandidateLinkMovedObserver: Nullable<Observer<Nullable<Vector2>>>;
    protected _onSelectionChangedObserver: Nullable<Observer<Nullable<ISelectionChangedOptions>>>;
    protected _exposedOnFrame: boolean;
    delegatedPort: Nullable<FrameNodePort>;
    get element(): HTMLDivElement;
    get portName(): string;
    set portName(newName: string);
    get disabled(): boolean;
    hasLabel(): boolean;
    get exposedOnFrame(): boolean;
    set exposedOnFrame(value: boolean);
    get exposedPortPosition(): number;
    set exposedPortPosition(value: number);
    private _isConnectedToNodeOutsideOfFrame;
    refresh(): void;
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager);
    dispose(): void;
    static CreatePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager): NodePort;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLink" {
import { Observable } from "@babylonjs/core/Misc/observable";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphCanvas";
export class NodeLink {
    private _graphCanvas;
    private _portA;
    private _portB?;
    private _nodeA;
    private _nodeB?;
    private _path;
    private _selectionPath;
    private _onSelectionChangedObserver;
    private _isVisible;
    private _isTargetCandidate;
    onDisposedObservable: Observable<NodeLink>;
    get isTargetCandidate(): boolean;
    set isTargetCandidate(value: boolean);
    get isVisible(): boolean;
    set isVisible(value: boolean);
    get portA(): FrameNodePort | NodePort;
    get portB(): FrameNodePort | NodePort | undefined;
    get nodeA(): GraphNode;
    get nodeB(): GraphNode | undefined;
    intersectsWith(rect: DOMRect): boolean;
    update(endX?: number, endY?: number, straight?: boolean): void;
    get path(): SVGPathElement;
    get selectionPath(): SVGPathElement;
    constructor(graphCanvas: GraphCanvasComponent, portA: NodePort, nodeA: GraphNode, portB?: NodePort, nodeB?: GraphNode);
    onClick(evt: MouseEvent): void;
    dispose(notify?: boolean): void;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLedger" {
export class NodeLedger {
    static RegisteredNodeNames: string[];
    static NameFormatter: (name: string) => string;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode" {
/// <reference types="react" />
import { Nullable } from "@babylonjs/core/types";
import { GraphCanvasComponent } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphCanvas";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { NodeLink } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLink";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
export class GraphNode {
    content: INodeData;
    private _visual;
    private _headerContainer;
    private _headerIcon;
    private _headerIconImg;
    private _header;
    private _connections;
    private _optionsContainer;
    private _inputsContainer;
    private _outputsContainer;
    private _content;
    private _comments;
    private _executionTime;
    private _selectionBorder;
    private _inputPorts;
    private _outputPorts;
    private _links;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _stateManager;
    private _onSelectionChangedObserver;
    private _onSelectionBoxMovedObserver;
    private _onFrameCreatedObserver;
    private _onUpdateRequiredObserver;
    private _onHighlightNodeObserver;
    private _ownerCanvas;
    private _isSelected;
    private _displayManager;
    private _isVisible;
    private _enclosingFrameId;
    private _visualPropertiesRefresh;
    addClassToVisual(className: string): void;
    removeClassFromVisual(className: string): void;
    get isVisible(): boolean;
    set isVisible(value: boolean);
    private _upateNodePortNames;
    get outputPorts(): NodePort[];
    get inputPorts(): NodePort[];
    get links(): NodeLink[];
    get gridAlignedX(): number;
    get gridAlignedY(): number;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    get height(): number;
    get id(): number;
    get name(): string;
    get isSelected(): boolean;
    get enclosingFrameId(): number;
    set enclosingFrameId(value: number);
    set isSelected(value: boolean);
    setIsSelected(value: boolean, marqueeSelection: boolean): void;
    get rootElement(): HTMLDivElement;
    constructor(content: INodeData, stateManager: StateManager);
    isOverlappingFrame(frame: GraphFrame): boolean;
    getPortForPortData(portData: IPortData): NodePort | null;
    getPortDataForPortDataContent(data: any): IPortData | null;
    getLinksForPortDataContent(data: any): NodeLink[];
    getLinksForPortData(portData: IPortData): NodeLink[];
    private _refreshFrames;
    _refreshLinks(): void;
    refresh(): void;
    private _onDown;
    cleanAccumulation(useCeil?: boolean): void;
    private _onUp;
    private _onMove;
    renderProperties(): Nullable<JSX.Element>;
    private _forceRebuild;
    appendVisual(root: HTMLDivElement, owner: GraphCanvasComponent): void;
    dispose(): void;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame" {
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphCanvas";
import { Nullable } from "@babylonjs/core/types";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
import { IFrameData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
export enum FramePortPosition {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
export class GraphFrame {
    private readonly _collapsedWidth;
    private static _FrameCounter;
    private static _FramePortCounter;
    private _name;
    private _color;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _width;
    private _height;
    element: HTMLDivElement;
    private _borderElement;
    private _headerElement;
    private _headerTextElement;
    private _headerCollapseElement;
    private _headerCloseElement;
    private _headerFocusElement;
    private _commentsElement;
    private _portContainer;
    private _outputPortContainer;
    private _inputPortContainer;
    private _nodes;
    private _ownerCanvas;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _onSelectionChangedObserver;
    private _onGraphNodeRemovalObserver;
    private _onExposePortOnFrameObserver;
    private _onNodeLinkDisposedObservers;
    private _isCollapsed;
    private _frameInPorts;
    private _frameOutPorts;
    private _controlledPorts;
    private _exposedInPorts;
    private _exposedOutPorts;
    private _id;
    private _comments;
    private _frameIsResizing;
    private _resizingDirection;
    private _minFrameHeight;
    private _minFrameWidth;
    private _mouseXLimit;
    onExpandStateChanged: Observable<GraphFrame>;
    private readonly _closeSVG;
    private readonly _expandSVG;
    private readonly _collapseSVG;
    private readonly _focusSVG;
    get id(): number;
    get isCollapsed(): boolean;
    private _createInputPort;
    private _markFramePortPositions;
    private _createFramePorts;
    private _removePortFromExposedWithNode;
    private _removePortFromExposedWithLink;
    private _createInputPorts;
    private _createOutputPorts;
    redrawFramePorts(): void;
    set isCollapsed(value: boolean);
    get nodes(): GraphNode[];
    get ports(): FrameNodePort[];
    get name(): string;
    set name(value: string);
    get color(): Color3;
    set color(value: Color3);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get comments(): string;
    set comments(comments: string);
    constructor(candidate: Nullable<HTMLDivElement>, canvas: GraphCanvasComponent, doNotCaptureNodes?: boolean);
    private _isFocused;
    /**
     * Enter/leave focus mode
     */
    switchFocusMode(): void;
    refresh(): void;
    addNode(node: GraphNode): void;
    removeNode(node: GraphNode): void;
    syncNode(node: GraphNode): void;
    cleanAccumulation(): void;
    private _onDown;
    move(newX: number, newY: number, align?: boolean): void;
    private _onUp;
    _moveFrame(offsetX: number, offsetY: number): void;
    private _onMove;
    moveFramePortUp(nodePort: FrameNodePort): void;
    private _movePortUp;
    moveFramePortDown(nodePort: FrameNodePort): void;
    private _movePortDown;
    private _initResizing;
    private _cleanUpResizing;
    private _updateMinHeightWithComments;
    private _isResizingTop;
    private _isResizingRight;
    private _isResizingBottom;
    private _isResizingLeft;
    private _onRightHandlePointerDown;
    private _onRightHandlePointerMove;
    private _moveRightHandle;
    private _onRightHandlePointerUp;
    private _onBottomHandlePointerDown;
    private _onBottomHandlePointerMove;
    private _moveBottomHandle;
    private _onBottomHandlePointerUp;
    private _onLeftHandlePointerDown;
    private _onLeftHandlePointerMove;
    private _moveLeftHandle;
    private _onLeftHandlePointerUp;
    private _onTopHandlePointerDown;
    private _onTopHandlePointerMove;
    private _moveTopHandle;
    private _onTopHandlePointerUp;
    private _onTopRightHandlePointerDown;
    private _onTopRightHandlePointerMove;
    private _moveTopRightHandle;
    private _onTopRightHandlePointerUp;
    private _onBottomRightHandlePointerDown;
    private _onBottomRightHandlePointerMove;
    private _moveBottomRightHandle;
    private _onBottomRightHandlePointerUp;
    private _onBottomLeftHandlePointerDown;
    private _onBottomLeftHandlePointerMove;
    private _moveBottomLeftHandle;
    private _onBottomLeftHandlePointerUp;
    private _onTopLeftHandlePointerDown;
    private _onTopLeftHandlePointerMove;
    private _moveTopLeftHandle;
    private _onTopLeftHandlePointerUp;
    private _expandLeft;
    private _expandTop;
    private _expandRight;
    private _expandBottom;
    dispose(): void;
    private _serializePortData;
    serialize(saveCollapsedState: boolean): IFrameData;
    export(): void;
    adjustPorts(): void;
    static Parse(serializationData: IFrameData, canvas: GraphCanvasComponent, map?: {
        [key: number]: number;
    }): GraphFrame;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphCanvas" {
import * as React from "react";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { Nullable } from "@babylonjs/core/types";
import { NodeLink } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { IEditorData, IFrameData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { INodeContainer } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer";
export interface IGraphCanvasComponentProps {
    stateManager: StateManager;
    onEmitNewNode: (nodeData: INodeData) => GraphNode;
}
export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements INodeContainer {
    static readonly NodeWidth: number;
    private readonly _minZoom;
    private readonly _maxZoom;
    private _hostCanvasRef;
    private _hostCanvas;
    private _graphCanvasRef;
    private _graphCanvas;
    private _selectionContainerRef;
    private _selectionContainer;
    private _frameContainerRef;
    private _frameContainer;
    private _svgCanvasRef;
    private _svgCanvas;
    private _rootContainerRef;
    private _rootContainer;
    private _nodes;
    private _links;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _dropPointX;
    private _dropPointY;
    private _selectionStartX;
    private _selectionStartY;
    private _candidateLinkedHasMoved;
    private _x;
    private _y;
    private _zoom;
    private _selectedNodes;
    private _selectedLink;
    private _selectedPort;
    private _candidateLink;
    private _candidatePort;
    private _gridSize;
    private _selectionBox;
    private _selectedFrames;
    private _frameCandidate;
    private _frames;
    private _nodeDataContentList;
    private _altKeyIsPressed;
    private _multiKeyIsPressed;
    private _oldY;
    _frameIsMoving: boolean;
    _isLoading: boolean;
    _targetLinkCandidate: Nullable<NodeLink>;
    private _copiedNodes;
    private _copiedFrames;
    get gridSize(): number;
    set gridSize(value: number);
    get stateManager(): StateManager;
    get nodes(): GraphNode[];
    get links(): NodeLink[];
    get frames(): GraphFrame[];
    get zoom(): number;
    set zoom(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get selectedNodes(): GraphNode[];
    get selectedLink(): Nullable<NodeLink>;
    get selectedFrames(): GraphFrame[];
    get selectedPort(): Nullable<NodePort>;
    get canvasContainer(): HTMLDivElement;
    get hostCanvas(): HTMLDivElement;
    get svgCanvas(): HTMLElement;
    get selectionContainer(): HTMLDivElement;
    get frameContainer(): HTMLDivElement;
    private _selectedFrameAndNodesConflict;
    constructor(props: IGraphCanvasComponentProps);
    populateConnectedEntriesBeforeRemoval(item: GraphNode, items: GraphNode[], inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[]): void;
    automaticRewire(inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[], firstOnly?: boolean): void;
    smartAddOverLink(node: GraphNode, link: NodeLink): void;
    smartAddOverNode(node: GraphNode, source: GraphNode): void;
    deleteSelection(onRemove: (nodeData: INodeData) => void, autoReconnect?: boolean): void;
    handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: INodeData) => any, rootElement: HTMLDivElement): void;
    pasteSelection(copiedNodes: GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: INodeData) => any, selectNew?: boolean): GraphNode[];
    reconnectNewNodes(nodeIndex: number, newNodes: GraphNode[], sourceNodes: GraphNode[], done: boolean[]): void;
    getCachedData(): any[];
    removeDataFromCache(data: any): void;
    createNodeFromObject(nodeData: INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): GraphNode;
    getGridPosition(position: number, useCeil?: boolean): number;
    getGridPositionCeil(position: number): number;
    updateTransform(): void;
    onKeyUp(): void;
    findNodeFromData(data: any): GraphNode;
    reset(): void;
    connectPorts(pointA: IPortData, pointB: IPortData): void;
    removeLink(link: NodeLink): void;
    appendNode(nodeData: INodeData): GraphNode;
    distributeGraph(): void;
    componentDidMount(): void;
    onMove(evt: React.PointerEvent): void;
    onDown(evt: React.PointerEvent<HTMLElement>): void;
    onUp(evt: React.PointerEvent): void;
    onWheel(evt: React.WheelEvent): void;
    zoomToFit(): void;
    processCandidatePort(): void;
    connectNodes(nodeA: GraphNode, pointA: IPortData, nodeB: GraphNode, pointB: IPortData): void;
    drop(newNode: GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
    processEditorData(editorData: IEditorData): void;
    reOrganize(editorData?: Nullable<IEditorData>, isImportingAFrame?: boolean): void;
    addFrame(frameData: IFrameData): void;

}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort" {
import { IDisplayManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Nullable } from "@babylonjs/core/types";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { FramePortPosition } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
export class FrameNodePort extends NodePort {
    portData: IPortData;
    node: GraphNode;
    private _parentFrameId;
    private _isInput;
    private _framePortPosition;
    private _framePortId;
    private _onFramePortPositionChangedObservable;
    get parentFrameId(): number;
    get onFramePortPositionChangedObservable(): Observable<FrameNodePort>;
    get isInput(): boolean;
    get framePortId(): number;
    get framePortPosition(): FramePortPosition;
    set framePortPosition(position: FramePortPosition);
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
    static CreateFrameNodePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/displayLedger" {
export class DisplayLedger {
    static RegisteredControls: {
        [key: string]: any;
    };
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/automaticProperties" {
import { IEditablePropertyOption } from "@babylonjs/core/Decorators/nodeDecorator";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
/**
 * Function used to force a rebuild of the node system
 * @param source source object
 * @param stateManager defines the state manager to use
 * @param propertyName name of the property that has been changed
 * @param notifiers list of notifiers to use
 */
export function ForceRebuild(source: any, stateManager: StateManager, propertyName: string, notifiers?: IEditablePropertyOption["notifiers"]): void;

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/types/framePortData" {
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { FrameNodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/frameNodePort";
export type FramePortData = {
    frame: GraphFrame;
    port: FrameNodePort;
};

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/selectionChangedOptions" {
import { Nullable } from "@babylonjs/core/types";
import { GraphFrame } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/nodePort";
import { FramePortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/types/framePortData";
export interface ISelectionChangedOptions {
    selection: Nullable<GraphNode | NodeLink | GraphFrame | NodePort | FramePortData>;
    forceKeepSelection?: boolean;
    marqueeSelection?: boolean;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/propertyComponentProps" {
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export interface IPropertyComponentProps {
    stateManager: StateManager;
    nodeData: INodeData;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData" {
import { Nullable } from "@babylonjs/core/types";
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
export enum PortDataDirection {
    /** Input */
    Input = 0,
    /** Output */
    Output = 1
}
export interface IPortData {
    data: any;
    name: string;
    internalName: string;
    isExposedOnFrame: boolean;
    exposedPortPosition: number;
    isConnected: boolean;
    direction: PortDataDirection;
    ownerData: any;
    connectedPort: Nullable<IPortData>;
    needDualDirectionValidation: boolean;
    hasEndpoints: boolean;
    endpoints: Nullable<IPortData[]>;
    updateDisplayName: (newName: string) => void;
    canConnectTo: (port: IPortData) => boolean;
    connectTo: (port: IPortData) => void;
    disconnectFrom: (port: IPortData) => void;
    checkCompatibilityState(port: IPortData): number;
    getCompatibilityIssueMessage(issue: number, targetNode: GraphNode, targetPort: IPortData): string;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeLocationInfo" {
export interface INodeLocationInfo {
    blockId: number;
    x: number;
    y: number;
}
export interface IFrameData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number[];
    name: string;
    isCollapsed: boolean;
    blocks: number[];
    comments: string;
}
export interface IEditorData {
    locations: INodeLocationInfo[];
    x: number;
    y: number;
    zoom: number;
    frames?: IFrameData[];
    map?: {
        [key: number]: number;
    };
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData" {
import { Nullable } from "@babylonjs/core/types";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
export interface INodeData {
    data: any;
    name: string;
    uniqueId: number;
    isInput: boolean;
    comments: string;
    executionTime?: number;
    refreshCallback?: () => void;
    prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
    getClassName: () => string;
    dispose: () => void;
    getPortByName: (name: string) => Nullable<IPortData>;
    inputs: IPortData[];
    outputs: IPortData[];
    invisibleEndpoints?: Nullable<any[]>;
    isConnectedToOutput?: () => boolean;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeContainer" {
import { GraphNode } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/graphNode";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
export interface INodeContainer {
    nodes: GraphNode[];
    appendNode(data: INodeData): GraphNode;
}

}
declare module "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/displayManager" {
import { Nullable } from "@babylonjs/core/types";
import { StateManager } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/stateManager";
import { INodeData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "@babylonjs/node-render-graph-editor/nodeGraphSystem/interfaces/portData";
export interface VisualContentDescription {
    [key: string]: HTMLElement;
}
export interface IDisplayManager {
    getHeaderClass(data: INodeData): string;
    shouldDisplayPortLabels(data: IPortData): boolean;
    updatePreviewContent(data: INodeData, contentArea: HTMLDivElement): void;
    updateFullVisualContent?(data: INodeData, visualContent: VisualContentDescription): void;
    getBackgroundColor(data: INodeData): string;
    getHeaderText(data: INodeData): string;
    onSelectionChanged?(data: INodeData, selectedData: Nullable<INodeData>, manager: StateManager): void;
    onDispose?(nodeData: INodeData, manager: StateManager): void;
}

}
declare module "@babylonjs/node-render-graph-editor/lines/vector4LineComponent" {
import * as React from "react";
import { Vector4 } from "@babylonjs/core/Maths/math.vector";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IVector4LineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    step?: number;
    onChange?: (newvalue: Vector4) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    value?: Vector4;
    lockObject: LockObject;
}
export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
    isExpanded: boolean;
    value: Vector4;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector4LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector4;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector4): void;
    updateVector4(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    updateStateW(value: number): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/vector3LineComponent" {
import * as React from "react";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IVector3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector3) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    noSlider?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
    isExpanded: boolean;
    value: Vector3;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector3LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector3;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateVector3(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    onCopyClick(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/vector2LineComponent" {
import * as React from "react";
import { Vector2 } from "@babylonjs/core/Maths/math.vector";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IVector2LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector2) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
    isExpanded: boolean;
    value: Vector2;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector2LineComponentProps);
    shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector2;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector2): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/valueLineComponent" {
import * as React from "react";
interface IValueLineComponentProps {
    label: string;
    value: number;
    color?: string;
    fractionDigits?: number;
    units?: string;
    icon?: string;
    iconLabel?: string;
}
export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
    constructor(props: IValueLineComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/unitButton" {
interface IUnitButtonProps {
    unit: string;
    locked?: boolean;
    onClick?: (unit: string) => void;
}

export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/textLineComponent" {
import * as React from "react";
interface ITextLineComponentProps {
    label?: string;
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    ignoreValue?: boolean;
    additionalClass?: string;
    icon?: string;
    iconLabel?: string;
    tooltip?: string;
}
export class TextLineComponent extends React.Component<ITextLineComponentProps> {
    constructor(props: ITextLineComponentProps);
    onLink(): void;


}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/textInputLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface ITextInputLineComponentProps {
    label?: string;
    lockObject?: LockObject;
    target?: any;
    propertyName?: string;
    value?: string;
    onChange?: (value: string) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    noUnderline?: boolean;
    numbersOnly?: boolean;
    delayInput?: boolean;
    arrows?: boolean;
    arrowsIncrement?: (amount: number) => void;
    step?: number;
    numeric?: boolean;
    roundValues?: boolean;
    min?: number;
    max?: number;
    placeholder?: string;
    unit?: React.ReactNode;
    validator?: (value: string) => boolean;
    multilines?: boolean;
    throttlePropertyChangedNotification?: boolean;
    throttlePropertyChangedNotificationDelay?: number;
    disabled?: boolean;
}
export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    constructor(props: ITextInputLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: string, previousValue: string): void;
    getCurrentNumericValue(value: string): number;
    updateValue(value: string, valueToValidate?: string): void;
    incrementValue(amount: number): void;
    onKeyDown(event: React.KeyboardEvent): void;

}

}
declare module "@babylonjs/node-render-graph-editor/lines/targetsProxy" {
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { Observable } from "@babylonjs/core/Misc/observable";
export const conflictingValuesPlaceholder = "\u2014";
/**
 *
 * @param targets a list of selected targets
 * @param onPropertyChangedObservable
 * @param getProperty
 * @returns a proxy object that can be passed as a target into the input
 */
export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;

}
declare module "@babylonjs/node-render-graph-editor/lines/sliderLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface ISliderLineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    minimum: number;
    maximum: number;
    step: number;
    directValue?: number;
    useEuler?: boolean;
    onChange?: (value: number) => void;
    onInput?: (value: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    decimalCount?: number;
    margin?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
    unit?: React.ReactNode;
    allowOverflow?: boolean;
}
export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
    value: number;
}> {
    private _localChange;
    constructor(props: ISliderLineComponentProps);
    shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
        value: number;
    }): boolean;
    onChange(newValueString: any): void;
    onInput(newValueString: any): void;
    prepareDataToRead(value: number): number;
    onCopyClick(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/radioLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
interface IRadioButtonLineComponentProps {
    onSelectionChangedObservable: Observable<RadioButtonLineComponent>;
    label: string;
    isSelected: () => boolean;
    onSelect: () => void;
    icon?: string;
    iconLabel?: string;
}
export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
    isSelected: boolean;
}> {
    private _onSelectionChangedObserver;
    constructor(props: IRadioButtonLineComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChange(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/popup" {
export class Popup {
    static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
    private static _CopyStyles;
}

}
declare module "@babylonjs/node-render-graph-editor/lines/optionsLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { IInspectableOptions } from "@babylonjs/core/Misc/iInspectable";
export const Null_Value: number;
export interface IOptionsLineProps {
    label: string;
    target: any;
    propertyName: string;
    options: IInspectableOptions[];
    noDirectUpdate?: boolean;
    onSelect?: (value: number | string) => void;
    extractValue?: (target: any) => number | string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    allowNullValue?: boolean;
    icon?: string;
    iconLabel?: string;
    className?: string;
    valuesAreStrings?: boolean;
    defaultIfNull?: number;
}
export class OptionsLine extends React.Component<IOptionsLineProps, {
    value: number | string;
}> {
    private _localChange;
    private _remapValueIn;
    private _remapValueOut;
    private _getValue;
    constructor(props: IOptionsLineProps);
    shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
        value: number;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    setValue(value: string | number): void;
    updateValue(valueString: string): void;
    onCopyClick(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/lines/numericInputComponent" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface INumericInputProps {
    label: string;
    labelTooltip?: string;
    value: number;
    step?: number;
    onChange: (value: number) => void;
    precision?: number;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class NumericInput extends React.Component<INumericInputProps, {
    value: string;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: INumericInputProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: INumericInputProps, nextState: {
        value: string;
    }): boolean;
    updateValue(valueString: string): void;
    onBlur(): void;
    incrementValue(amount: number): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/messageLineComponent" {
import * as React from "react";

interface IMessageLineComponentProps {
    text: string;
    color?: string;
    icon?: any;
}
export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
    constructor(props: IMessageLineComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/matrixLineComponent" {
import * as React from "react";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector";
import { Matrix } from "@babylonjs/core/Maths/math.vector";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IMatrixLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newValue: Matrix) => void;
    onModeChange?: (mode: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    mode?: number;
    lockObject: LockObject;
}
export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
    value: Matrix;
    mode: number;
    angle: number;
}> {
    private _localChange;
    constructor(props: IMatrixLineComponentProps);
    shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
        value: Matrix;
        mode: number;
        angle: number;
    }): boolean;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateMatrix(): void;
    updateRow(value: Vector4, row: number): void;
    updateBasedOnMode(value: number): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/linkButtonComponent" {
import * as React from "react";

interface ILinkButtonComponentProps {
    label: string;
    buttonLabel: string;
    url?: string;
    onClick: () => void;
    icon?: any;
    onIconClick?: () => void;
}
export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
    constructor(props: ILinkButtonComponentProps);
    onLink(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/lineWithFileButtonComponent" {
import * as React from "react";
interface ILineWithFileButtonComponentProps {
    title: string;
    closed?: boolean;
    multiple?: boolean;
    label: string;
    iconImage: any;
    onIconClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
    isExpanded: boolean;
}> {
    private _uploadRef;
    constructor(props: ILineWithFileButtonComponentProps);
    onChange(evt: any): void;
    switchExpandedState(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/lineContainerComponent" {
import * as React from "react";
import { ISelectedLineContainer } from "@babylonjs/node-render-graph-editor/lines/iSelectedLineContainer";
interface ILineContainerComponentProps {
    selection?: ISelectedLineContainer;
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
    isHighlighted: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;

    componentDidMount(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/inputArrowsComponent" {
import * as React from "react";
interface IInputArrowsComponentProps {
    incrementValue: (amount: number) => void;
    setDragging: (dragging: boolean) => void;
}
export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
    private _arrowsRef;
    private _drag;
    private _releaseListener;
    private _lockChangeListener;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/indentedTextLineComponent" {
import * as React from "react";
interface IIndentedTextLineComponentProps {
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    additionalClass?: string;
}
export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
    constructor(props: IIndentedTextLineComponentProps);
    onLink(): void;


}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/iconComponent" {
import * as React from "react";
interface IIconComponentProps {
    icon: string;
    label?: string;
}
export class IconComponent extends React.Component<IIconComponentProps> {

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/iconButtonLineComponent" {
import * as React from "react";
export interface IIconButtonLineComponentProps {
    icon: string;
    onClick: () => void;
    tooltip: string;
    active?: boolean;
}
export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
    constructor(props: IIconButtonLineComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/lines/iSelectedLineContainer" {
export interface ISelectedLineContainer {
    selectedLineContainerTitles: Array<string>;
    selectedLineContainerTitlesNoFocus: Array<string>;
}

}
declare module "@babylonjs/node-render-graph-editor/lines/hexLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IHexLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject?: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    replaySourceReplacement?: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    icon?: string;
    iconLabel?: string;
}
export class HexLineComponent extends React.Component<IHexLineComponentProps, {
    value: string;
}> {
    private _localChange;
    private _store;
    private _propertyChange;
    constructor(props: IHexLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
        value: string;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    convertToHexString(valueString: string): string;
    updateValue(valueString: string, raisePropertyChanged: boolean): void;
    lock(): void;
    unlock(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/floatLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface IFloatLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    max?: number;
    smallUI?: boolean;
    onEnter?: (newValue: number) => void;
    icon?: string;
    iconLabel?: string;
    defaultValue?: number;
    arrows?: boolean;
    unit?: React.ReactNode;
    onDragStart?: (newValue: number) => void;
    onDragStop?: (newValue: number) => void;
    disabled?: boolean;
}
export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    private _store;
    constructor(props: IFloatLineComponentProps);
    componentWillUnmount(): void;
    getValueString(value: any, props: IFloatLineComponentProps): string;
    shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;
    incrementValue(amount: number, processStep?: boolean): void;
    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
    onCopyClick(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/fileMultipleButtonLineComponent" {
import * as React from "react";
interface IFileMultipleButtonLineComponentProps {
    label: string;
    onClick: (event: any) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileMultipleButtonLineComponentProps);
    onChange(evt: any): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/fileButtonLineComponent" {
import * as React from "react";
interface IFileButtonLineProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileButtonLine extends React.Component<IFileButtonLineProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineProps);
    onChange(evt: any): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/draggableLineWithButtonComponent" {
import * as React from "react";
export interface IDraggableLineWithButtonComponent {
    format: string;
    data: string;
    tooltip: string;
    iconImage: any;
    onIconClick: (value: string) => void;
    iconTitle: string;
    lenSuffixToRemove?: number;
}
export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
    constructor(props: IDraggableLineWithButtonComponent);

}

}
declare module "@babylonjs/node-render-graph-editor/lines/draggableLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    format: string;
    data: string;
    tooltip: string;
}
export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/lines/colorPickerComponent" {
import * as React from "react";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorPickerLineProps {
    value: Color4 | Color3;
    linearHint?: boolean;
    onColorChanged: (newOne: string) => void;
    icon?: string;
    iconLabel?: string;
    shouldPopRight?: boolean;
    lockObject?: LockObject;
}
interface IColorPickerComponentState {
    pickerEnabled: boolean;
    color: Color3 | Color4;
    hex: string;
}
export class ColorPickerLine extends React.Component<IColorPickerLineProps, IColorPickerComponentState> {
    private _floatRef;
    private _floatHostRef;
    constructor(props: IColorPickerLineProps);
    syncPositions(): void;
    shouldComponentUpdate(nextProps: IColorPickerLineProps, nextState: IColorPickerComponentState): boolean;
    getHexString(props?: Readonly<IColorPickerLineProps> & Readonly<{
        children?: React.ReactNode;
    }>): string;
    componentDidUpdate(): void;
    componentDidMount(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/colorLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorLineProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
    constructor(props: IColorLineProps);
    shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    private _convertToColor;
    private _toColor3;
    onCopyClick(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/lines/color4LineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColor4LineComponentProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {

}

}
declare module "@babylonjs/node-render-graph-editor/lines/color3LineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColor3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    isLinear?: boolean;
    icon?: string;
    lockObject: LockObject;
    iconLabel?: string;
    onChange?: () => void;
}
export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {

}

}
declare module "@babylonjs/node-render-graph-editor/lines/checkBoxLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";

export interface ICheckBoxLineComponentProps {
    label?: string;
    target?: any;
    propertyName?: string;
    isSelected?: () => boolean;
    onSelect?: (value: boolean) => void;
    onValueChanged?: () => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    disabled?: boolean;
    icon?: string;
    iconLabel?: string;
    faIcons?: {
        enabled: any;
        disabled: any;
    };
    large?: boolean;
}
export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
    isSelected: boolean;
    isDisabled?: boolean;
    isConflict: boolean;
}> {
    private _localChange;
    constructor(props: ICheckBoxLineComponentProps);
    shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
        isSelected: boolean;
        isDisabled: boolean;
        isConflict: boolean;
    }): boolean;
    onChange(): void;
    onCopyClick(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/lines/buttonLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    label: string;
    onClick: () => void;
    icon?: string;
    iconLabel?: string;
    isDisabled?: boolean;
}
export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/lines/booleanLineComponent" {
import * as React from "react";
export interface IBooleanLineComponentProps {
    label: string;
    value: boolean;
    icon?: string;
    iconLabel?: string;
}
export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
    constructor(props: IBooleanLineComponentProps);

}

}
declare module "@babylonjs/node-render-graph-editor/components/classNames" {
export function ClassNames(names: any, styleObject: any): string;
export function JoinClassNames(styleObject: any, ...names: string[]): string;

}
declare module "@babylonjs/node-render-graph-editor/components/Toggle" {
/// <reference types="react" />
export type ToggleProps = {
    toggled: "on" | "mixed" | "off";
    onToggle?: () => void;
    padded?: boolean;
    color?: "dark" | "light";
};
export const Toggle: React.FC<ToggleProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/TextInputWithSubmit" {
export interface ITextInputProps {
    label?: string;
    placeholder?: string;
    submitValue: (newValue: string) => void;
    validateValue?: (value: string) => boolean;
    cancelSubmit?: () => void;
}
/**
 * This component represents a text input that can be submitted or cancelled on buttons
 * @param props properties
 * @returns TextInputWithSubmit element
 */


}
declare module "@babylonjs/node-render-graph-editor/components/MessageDialog" {
import * as React from "react";
export interface MessageDialogProps {
    message: string;
    isError: boolean;
    onClose?: () => void;
}
export const MessageDialog: React.FC<MessageDialogProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/Label" {
import { ReactChild } from "react";
export type LabelProps = {
    text: string;
    children?: ReactChild;
    color?: "dark" | "light";
};
export const Label: React.FC<LabelProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/Icon" {
/// <reference types="react" />
export type IconProps = {
    color?: "dark" | "light";
    icon: string;
};
export const Icon: React.FC<IconProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/Button" {
/// <reference types="react" />
export type ButtonProps = {
    disabled?: boolean;
    active?: boolean;
    onClick?: () => void;
    color: "light" | "dark";
    size: "default" | "small" | "wide" | "smaller";
    title?: string;
    backgroundColor?: string;
};
export const Button: React.FC<ButtonProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/useGraphContext" {
/**
 * utility hook to assist using the graph context
 * @returns
 */
export const useGraphContext: () => import("@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphContextManager").IGraphContext;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/NodeRenderer" {
import { ComponentType } from "react";
import { Nullable } from "@babylonjs/core/types";
export type IVisualRecordsType = Record<string, {
    x: number;
    y: number;
}>;
export type IConnectionType = {
    id: string;
    sourceId: string;
    targetId: string;
};
export type ICustomDataType = {
    type: string;
    value: any;
};
export type INodeType = {
    id: string;
    label: string;
    customData?: ICustomDataType;
};
/**
 * props for the node renderer
 */
export interface INodeRendererProps {
    /**
     * array of connections between nodes
     */
    connections: IConnectionType[];
    /**
     * function called when a new connection is created
     */
    updateConnections: (sourceId: string, targetId: string) => void;
    /**
     * function called when a connection is deleted
     */
    deleteLine: (lineId: string) => void;
    /**
     * function called when a node is deleted
     */
    deleteNode: (nodeId: string) => void;
    /**
     * array of all nodes
     */
    nodes: INodeType[];
    /**
     * id of the node to highlight
     */
    highlightedNode?: Nullable<string>;
    /**
     * function to be called if a node is selected
     */
    selectNode?: (nodeId: Nullable<string>) => void;
    /**
     * id of this renderer
     */
    id: string;
    /**
     * optional list of custom components to be rendered inside nodes of
     * a certain type
     */
    customComponents?: Record<string, ComponentType<any>>;
}
/**
 * This component is a bridge between the app logic related to the graph, and the actual rendering
 * of it. It manages the nodes' positions and selection states.
 * @param props
 * @returns
 */


}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphNodesContainer" {
import { FC } from "react";
export interface IGraphContainerProps {
    onNodeMoved: (id: string, x: number, y: number) => void;
    id: string;
}
/**
 * This component contains all the nodes and handles their dragging
 * @param props properties
 * @returns graph node container element
 */
export const GraphNodesContainer: FC<IGraphContainerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphNode" {
import { FC } from "react";
export interface IGraphNodeProps {
    id: string;
    name: string;
    x: number;
    y: number;
    selected?: boolean;
    width?: number;
    height?: number;
    highlighted?: boolean;
    parentContainerId: string;
}
export const SingleGraphNode: FC<IGraphNodeProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphLinesContainer" {
import { FC } from "react";
/**
 * props for the GraphLineContainer
 */
export interface IGraphLinesContainerProps {
    /**
     * id of the container
     */
    id: string;
}
/**
 * this component handles the dragging of new connections
 * @param props
 * @returns
 */
export const GraphLinesContainer: FC<IGraphLinesContainerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphLine" {
import { FC } from "react";
/**
 * props for the GraphLine component
 */
export interface IGraphLineProps {
    /**
     * id of the line. temporary lines can have no id
     */
    id?: string;
    /**
     * starting x pos of the line
     */
    x1: number;
    /**
     * ending x pos of the line
     */
    x2: number;
    /**
     * starting y pos of the line
     */
    y1: number;
    /**
     * ending y pos of the line
     */
    y2: number;
    /**
     * is the line selected
     */
    selected?: boolean;
    /**
     * does the line have a direction
     */
    directional?: boolean;
}
export const MarkerArrowId = "arrow";
/**
 * This component draws a SVG line between two points, with an optional marker
 * indicating direction
 * @param props properties
 * @returns graph line element
 */
export const GraphLine: FC<IGraphLineProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphContextManager" {
/// <reference types="react" />
/**
 * this context is used to pass callbacks to the graph nodes and connections
 */
export interface IGraphContext {
    onNodesConnected?: (sourceId: string, targetId: string) => void;
    onLineSelected?: (lineId: string) => void;
    onNodeSelected?: (nodeId: string) => void;
}
export const GraphContextManager: import("react").Context<IGraphContext>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphContainer" {
import { FC } from "react";
export interface IGraphContainerProps {
}
/**
 * This component is just a simple container to keep the nodes and lines containers
 * together
 * @param props
 * @returns
 */
export const GraphContainer: FC<IGraphContainerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/reactGraphSystem/GraphConnectorHandle" {
import { FC } from "react";
/**
 * Props for the connector
 */
export interface IGraphConnectorHandlerProps {
    /**
     * id of the parent node
     */
    parentId: string;
    /**
     * x position of the parent node
     */
    parentX: number;
    /**
     * y position of the parent node
     */
    parentY: number;
    /**
     * x position of the connector relative to the parent node
     */
    offsetX?: number;
    /**
     * y position of the connector relative to the parent node
     */
    offsetY?: number;
    /**
     * width of the parent node
     */
    parentWidth: number;
    /**
     * height of the parent node
     */
    parentHeight: number;
    /**
     * id of the container where its parent node is
     */
    parentContainerId: string;
}
/**
 * This component is used to initiate a connection between two nodes. Simply
 * drag the handle in a node and drop it in another node to create a connection.
 * @returns connector element
 */
export const GraphConnectorHandler: FC<IGraphConnectorHandlerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/lines/OptionsLineComponent" {
/**
 * This components represents an options menu with optional
 * customizable properties. Option IDs should be unique.
 */
export interface IOption {
    label: string;
    value: string;
    id: string;
}
export interface IOptionsLineComponentProps {
    options: IOption[];
    addOptionPlaceholder?: string;
    onOptionAdded?: (newOption: IOption) => void;
    onOptionSelected: (selectedOptionValue: string) => void;
    selectedOptionValue: string;
    validateNewOptionValue?: (newOptionValue: string) => boolean;
    addOptionText?: string;
}


}
declare module "@babylonjs/node-render-graph-editor/components/lines/NumericInputComponent" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
interface INumericInputComponentProps {
    label: string;
    labelTooltip?: string;
    value: number;
    step?: number;
    onChange: (value: number) => void;
    precision?: number;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
    value: string;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: INumericInputComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
        value: string;
    }): boolean;
    updateValue(valueString: string): void;
    onBlur(): void;
    incrementValue(amount: number): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/lines/FileButtonLineComponent" {
import * as React from "react";
export interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;

}

}
declare module "@babylonjs/node-render-graph-editor/components/lines/ColorPickerLineComponent" {
import * as React from "react";
import { Color4, Color3 } from "@babylonjs/core/Maths/math.color";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorPickerLineComponentProps {
    value: Color4 | Color3;
    linearHint?: boolean;
    onColorChanged: (newOne: string) => void;
    icon?: string;
    iconLabel?: string;
    shouldPopRight?: boolean;
    lockObject?: LockObject;
    backgroundColor?: string;
}
interface IColorPickerComponentState {
    pickerEnabled: boolean;
    color: Color3 | Color4;
    hex: string;
}
export class ColorPickerLineComponent extends React.Component<IColorPickerLineComponentProps, IColorPickerComponentState> {
    private _floatRef;
    private _floatHostRef;
    private _coverRef;
    constructor(props: IColorPickerLineComponentProps);
    syncPositions(): void;
    shouldComponentUpdate(nextProps: IColorPickerLineComponentProps, nextState: IColorPickerComponentState): boolean;
    getHexString(props?: Readonly<IColorPickerLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): string;
    componentDidUpdate(): void;
    componentDidMount(): void;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/lines/ColorLineComponent" {
import * as React from "react";
import { Observable } from "@babylonjs/core/Misc/observable";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { PropertyChangedEvent } from "@babylonjs/node-render-graph-editor/propertyChangedEvent";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
    constructor(props: IColorLineComponentProps);
    shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    copyToClipboard(): void;
    private _convertToColor;
    private _toColor3;

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/layout/utils" {
import { Layout, LayoutColumn, LayoutTabsRow } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Given a column and row number in the layout, return the corresponding column/row
 * @param layout
 * @param column
 * @param row
 * @returns
 */
export const getPosInLayout: (layout: Layout, column: number, row?: number) => LayoutColumn | LayoutTabsRow;
/**
 * Remove a row in position row, column from the layout, and redistribute heights of remaining rows
 * @param layout
 * @param column
 * @param row
 */
export const removeLayoutRowAndRedistributePercentages: (layout: Layout, column: number, row: number) => void;
/**
 * Add a percentage string to a number
 * @param p1 the percentage string
 * @param p2 the number
 * @returns the sum of the percentage string and the number
 */
export const addPercentageStringToNumber: (p1: string, p2: number) => number;
/**
 * Parses a percentage string into a number
 * @param p the percentage string
 * @returns the parsed number
 */
export const parsePercentage: (p: string) => number;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/types" {
import { ReactElement } from "react";
export type LayoutTab = {
    /**
     * Tab id
     */
    id: string;
    /**
     * React component rendered by tab
     */
    component: ReactElement;
    /**
     * Tab title
     */
    title: string;
};
export type LayoutTabsRow = {
    /**
     * row id
     */
    id: string;
    /**
     * row height in its containing column
     */
    height: string;
    /**
     * selected tab in row
     */
    selectedTab: string;
    /**
     * list of tabs contained in row
     */
    tabs: LayoutTab[];
};
export type LayoutColumn = {
    /**
     * column id
     */
    id: string;
    /**
     * column width in the grid
     */
    width: string;
    /**
     * column rows
     */
    rows: LayoutTabsRow[];
};
export type Layout = {
    /**
     * layout columns
     */
    columns?: LayoutColumn[];
};
export type TabDrag = {
    /**
     * row number of the tab being dragged
     */
    rowNumber: number;
    /**
     * column number of the tab being dragged
     */
    columnNumber: number;
    /**
     * the tabs being dragged
     */
    tabs: {
        /**
         * id of tab being dragged
         */
        id: string;
    }[];
};
export enum ElementTypes {
    RESIZE_BAR = "0",
    TAB = "1",
    TAB_GROUP = "2",
    NONE = "2"
}
export enum ResizeDirections {
    ROW = "row",
    COLUMN = "column"
}

}
declare module "@babylonjs/node-render-graph-editor/components/layout/LayoutContext" {
/// <reference types="react" />
import { Layout } from "@babylonjs/node-render-graph-editor/components/layout/types";
export const LayoutContext: import("react").Context<{
    /**
     * The layout object
     */
    layout: Layout;
    /**
     * Function to set the layout object in the context
     */
    setLayout: (layout: Layout) => void;
}>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleTabsContainer" {
import { FC } from "react";
import { LayoutTab } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Arguments for the TabsContainer component.
 */
export interface IFlexibleTabsContainerProps {
    /**
     * The tabs to display
     */
    tabs: LayoutTab[];
    /**
     * Row index of component in layout
     */
    rowIndex: number;
    /**
     * Column index of component in layout
     */
    columnIndex: number;
    /**
     * Which tab is selected in the layout
     */
    selectedTab?: string;
}
/**
 * This component contains a set of tabs of which only one is visible at a time.
 * The tabs can also be dragged from and to different containers.
 * @param props properties
 * @returns tabs container element
 */
export const FlexibleTabsContainer: FC<IFlexibleTabsContainerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleTab" {
import { FC } from "react";
import { TabDrag } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Arguments for the FlexibleTab component.
 */
export interface IFlexibleTabProps {
    /**
     * The tab's title.
     */
    title: string;
    /**
     * If the tab is currently selected or not
     */
    selected: boolean;
    /**
     * What happens when the user clicks on the tab
     */
    onClick: () => void;
    /**
     * The object that will be sent to the drag event
     */
    item: TabDrag;
    /**
     * What happens when the user drops another tab after this one
     */
    onTabDroppedAction: (item: TabDrag) => void;
}
/**
 * A component that renders a tab that the user can click
 * to activate or drag to reorder. It also listens for
 * drop events if the user wants to drop another tab
 * after it.
 * @param props properties
 * @returns FlexibleTab element
 */
export const FlexibleTab: FC<IFlexibleTabProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleResizeBar" {
import { FC } from "react";
import { ResizeDirections } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Arguments for the ResizeBar component.
 */
export interface IFlexibleRowResizerProps {
    /**
     * Row number of the component that is being resized
     */
    rowNumber: number;
    /**
     * Column number of the component being resized
     */
    columnNumber: number;
    /**
     * If the resizing happens in row or column direction
     */
    direction: ResizeDirections;
}
/**
 * The item that will be sent to the drag event
 */
export type ResizeItem = {
    /**
     * If the resizing happens in row or column direction
     */
    direction: ResizeDirections;
    /**
     * The row number of the component that is being resized
     */
    rowNumber: number;
    /**
     * the column number of the component being resized
     */
    columnNumber: number;
};
/**
 * A component that renders a bar that the user can drag to resize.
 * @param props properties
 * @returns resize bar element
 */
export const FlexibleResizeBar: FC<IFlexibleRowResizerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleGridLayout" {
import { FC } from "react";
import { Layout } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Arguments for the Layout component.
 */
export interface IFlexibleGridLayoutProps {
    /**
     * A definition of the layout which can be changed by the user
     */
    layoutDefinition: Layout;
}
/**
 * This component represents a grid layout that can be resized and rearranged
 * by the user.
 * @param props properties
 * @returns layout element
 */
export const FlexibleGridLayout: FC<IFlexibleGridLayoutProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleGridContainer" {
import { FC } from "react";
/**
 * Arguments for the GridContainer component.
 */
export interface IFlexibleGridContainerProps {
}
/**
 * Component responsible for mapping the layout to the actual components
 * @returns GridContainer element
 */
export const FlexibleGridContainer: FC<IFlexibleGridContainerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleDropZone" {
import { FC } from "react";
/**
 * Arguments for the FlexibleDropZone component.
 */
export interface IFlexibleDropZoneProps {
    /**
     * The row number of the component in the layout
     */
    rowNumber: number;
    /**
     * The column number of the component in the layout
     */
    columnNumber: number;
}
/**
 * This component contains the drag and drop zone for the resize bars that
 * allow redefining width and height of layout elements
 * @param props properties
 * @returns drop zone element
 */
export const FlexibleDropZone: FC<IFlexibleDropZoneProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleDragHandler" {
import { FC } from "react";
/**
 * Arguments for the DragHandler component.
 */
export interface IFlexibleDragHandlerProps {
    /**
     * The size of the containing element. Used to calculate the percentage of
     * space occupied by the component
     */
    containerSize: {
        width: number;
        height: number;
    };
}
/**
 * This component receives the drop events and updates the layout accordingly
 * @param props properties
 * @returns DragHandler element
 */
export const FlexibleDragHandler: FC<IFlexibleDragHandlerProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/FlexibleColumn" {
import { FC } from "react";
/**
 * Arguments for the Column component.
 */
export interface IFlexibleColumnProps {
    /**
     * Width of column
     */
    width: string;
}
/**
 * This component represents a single column in the layout. It receives a width
 * that it occupies and the content to display
 * @param props
 * @returns
 */
export const FlexibleColumn: FC<IFlexibleColumnProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/layout/DraggableIcon" {
import { FC } from "react";
import { ElementTypes, TabDrag } from "@babylonjs/node-render-graph-editor/components/layout/types";
/**
 * Arguments for the DraggableIcon component.
 */
export interface IDraggableIconProps {
    /**
     * Icon source
     */
    src: string;
    /**
     * Object that will be passed to the drag event
     */
    item: TabDrag;
    /**
     * Type of drag event
     */
    type: ElementTypes;
}
/**
 * An icon that can be dragged by the user
 * @param props properties
 * @returns draggable icon element
 */
export const DraggableIcon: FC<IDraggableIconProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/colorPicker/HexColor" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IHexColorProps {
    value: string;
    expectedLength: number;
    onChange: (value: string) => void;
    lockObject: LockObject;
}
export class HexColorComponent extends React.Component<IHexColorProps, {
    hex: string;
}> {
    constructor(props: IHexColorProps);
    shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
        hex: string;
    }): boolean;
    lock(): void;
    unlock(): void;
    updateHexValue(valueString: string): void;

}

}
declare module "@babylonjs/node-render-graph-editor/components/colorPicker/ColorPicker" {
import * as React from "react";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerComponentProps {
    color: Color3 | Color4;
    linearhint?: boolean;
    debugMode?: boolean;
    onColorChanged?: (color: Color3 | Color4) => void;
    lockObject: LockObject;
    backgroundColor?: string;
}
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerState {
    color: Color3;
    alpha: number;
}
/**
 * Class used to create a color picker
 */
export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, IColorPickerState> {
    private _saturationRef;
    private _hueRef;
    private _isSaturationPointerDown;
    private _isHuePointerDown;
    constructor(props: IColorPickerComponentProps);
    shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerState): boolean;
    onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    private _evaluateSaturation;
    private _evaluateHue;
    componentDidUpdate(): void;
    raiseOnColorChanged(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/components/colorPicker/ColorComponentEntry" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorComponentEntryProps {
    value: number;
    label: string;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    lockObject: LockObject;
}
export class ColorComponentComponentEntry extends React.Component<IColorComponentEntryProps> {
    constructor(props: IColorComponentEntryProps);
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/components/bars/CommandDropdownComponent" {
import * as React from "react";
interface ICommandDropdownComponentProps {
    icon?: string;
    tooltip: string;
    defaultValue?: string;
    items: {
        label: string;
        icon?: string;
        fileButton?: boolean;
        onClick?: () => void;
        onCheck?: (value: boolean) => void;
        storeKey?: string;
        isActive?: boolean;
        defaultValue?: boolean | string;
        subItems?: string[];
    }[];
    toRight?: boolean;
}
export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
    isExpanded: boolean;
    activeState: string;
}> {
    constructor(props: ICommandDropdownComponentProps);

}
export {};

}
declare module "@babylonjs/node-render-graph-editor/components/bars/CommandButtonComponent" {
import * as React from "react";
export interface ICommandButtonComponentProps {
    tooltip: string;
    shortcut?: string;
    icon: string;
    iconLabel?: string;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
}
export const CommandButtonComponent: React.FC<ICommandButtonComponentProps>;

}
declare module "@babylonjs/node-render-graph-editor/components/bars/CommandBarComponent" {
import { FC } from "react";
export interface ICommandBarComponentProps {
    onSaveButtonClicked?: () => void;
    onSaveToSnippetButtonClicked?: () => void;
    onLoadFromSnippetButtonClicked?: () => void;
    onHelpButtonClicked?: () => void;
    onGiveFeedbackButtonClicked?: () => void;
    onSelectButtonClicked?: () => void;
    onPanButtonClicked?: () => void;
    onZoomButtonClicked?: () => void;
    onFitButtonClicked?: () => void;
    onArtboardColorChanged?: (newColor: string) => void;
    artboardColor?: string;
    artboardColorPickerColor?: string;
}
export const CommandBarComponent: FC<ICommandBarComponentProps>;

}
declare module "@babylonjs/node-render-graph-editor/colorPicker/hexColor" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IHexColorProps {
    value: string;
    expectedLength: number;
    onChange: (value: string) => void;
    lockObject: LockObject;
}
export class HexColor extends React.Component<IHexColorProps, {
    hex: string;
}> {
    constructor(props: IHexColorProps);
    shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
        hex: string;
    }): boolean;
    lock(): void;
    unlock(): void;
    updateHexValue(valueString: string): void;

}

}
declare module "@babylonjs/node-render-graph-editor/colorPicker/colorPicker" {
import * as React from "react";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
import "@babylonjs/node-render-graph-editor/colorPicker/colorPicker.scss";
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerProps {
    color: Color3 | Color4;
    linearhint?: boolean;
    debugMode?: boolean;
    onColorChanged?: (color: Color3 | Color4) => void;
    lockObject: LockObject;
}
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerState {
    color: Color3;
    alpha: number;
}
/**
 * Class used to create a color picker
 */
export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
    private _saturationRef;
    private _hueRef;
    private _isSaturationPointerDown;
    private _isHuePointerDown;
    constructor(props: IColorPickerProps);
    shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
    onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    private _evaluateSaturation;
    private _evaluateHue;
    componentDidUpdate(): void;
    raiseOnColorChanged(): void;

}

}
declare module "@babylonjs/node-render-graph-editor/colorPicker/colorComponentEntry" {
import * as React from "react";
import { LockObject } from "@babylonjs/node-render-graph-editor/tabs/propertyGrids/lockObject";
export interface IColorComponentEntryProps {
    value: number;
    label: string;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    lockObject: LockObject;
}
export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
    constructor(props: IColorComponentEntryProps);
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;

}

}

declare module "@babylonjs/node-render-graph-editor" {
    export * from "@babylonjs/node-render-graph-editor/legacy/legacy";
}



