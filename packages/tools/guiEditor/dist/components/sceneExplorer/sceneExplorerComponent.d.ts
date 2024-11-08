import * as React from "react";
import type { Nullable } from "core/types";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Scene } from "core/scene";
import type { GlobalState } from "../../globalState";
import "./sceneExplorer.scss";
interface ISceneExplorerFilterComponentProps {
    onFilter: (filter: string) => void;
}
export declare class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
    constructor(props: ISceneExplorerFilterComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
interface ISceneExplorerComponentProps {
    scene?: Scene;
    noCommands?: boolean;
    noHeader?: boolean;
    noExpand?: boolean;
    noClose?: boolean;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    globalState: GlobalState;
    popupMode?: boolean;
    onPopup?: () => void;
    onClose?: () => void;
}
export declare class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
    filter: Nullable<string>;
    selectedEntity: any;
    scene: Nullable<Scene>;
}> {
    private _onSelectionChangeObserver;
    private _onParrentingChangeObserver;
    private _onNewSceneObserver;
    private _onPropertyChangedObservable;
    private _onUpdateRequiredObserver;
    constructor(props: ISceneExplorerComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
        previousOne?: any;
        found?: boolean;
    }): boolean;
    processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>): void;
    renderContent(): import("react/jsx-runtime").JSX.Element | null;
    onClose(): void;
    onPopup(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
