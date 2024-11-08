import * as React from "react";
import type { Nullable } from "core/types";
import type { IExplorerAdditionalNode, IExplorerExtensibilityGroup, IInspectorOptions } from "core/Debug/debugLayer";
import type { Scene } from "core/scene";
import type { GlobalState } from "../../components/globalState";
import type { Camera } from "core/Cameras/camera";
import "core/Sprites/spriteSceneComponent";
import "core/Audio/audioSceneComponent";
import "core/PostProcesses/RenderPipeline/postProcessRenderPipelineManagerSceneComponent";
import "./sceneExplorer.scss";
interface ISceneExplorerFilterComponentProps {
    onFilter: (filter: string) => void;
}
export declare class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
    constructor(props: ISceneExplorerFilterComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
interface ISceneExplorerComponentProps {
    scene: Scene;
    contextMenu?: IInspectorOptions["contextMenu"];
    contextMenuOverride?: IInspectorOptions["contextMenuOverride"];
    gizmoCamera?: Camera;
    noCommands?: boolean;
    noHeader?: boolean;
    noExpand?: boolean;
    noClose?: boolean;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    additionalNodes?: IExplorerAdditionalNode[];
    globalState: GlobalState;
    popupMode?: boolean;
    onPopup?: () => void;
    onClose?: () => void;
}
export declare class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
    filter: Nullable<string>;
    selectedEntity: any;
    scene: Scene;
}> {
    private _onSelectionChangeObserver;
    private _onSelectionRenamedObserver;
    private _onNewSceneAddedObserver;
    private _onNewSceneObserver;
    private _sceneExplorerRef;
    private _mutationTimeout;
    private _once;
    private _hooked;
    private _sceneMutationFunc;
    constructor(props: ISceneExplorerComponentProps);
    processMutation(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
        previousOne?: any;
        found?: boolean;
    }): boolean;
    processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>, allNodes: any[]): void;
    private _getPipelineContextMenus;
    private _getNodeContextMenus;
    private _getMaterialsContextMenus;
    private _getSpriteManagersContextMenus;
    private _getParticleSystemsContextMenus;
    renderContent(allNodes: any[]): import("react/jsx-runtime").JSX.Element | null;
    onClose(): void;
    onPopup(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
