import type { Nullable } from "core/types";
import type { Camera } from "core/Cameras/camera";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { GlobalState } from "../globalState";
export interface ITreeItemSelectableComponentProps {
    entity: any;
    selectedEntity?: any;
    mustExpand?: boolean;
    offset: number;
    globalState: GlobalState;
    gizmoCamera?: Camera;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    filter: Nullable<string>;
}
export declare class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, {
    isExpanded: boolean;
    isSelected: boolean;
}> {
    private _wasSelected;
    constructor(props: ITreeItemSelectableComponentProps);
    switchExpandedState(): void;
    shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
        isExpanded: boolean;
        isSelected: boolean;
    }): boolean;
    scrollIntoView(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    onSelect(): void;
    renderChildren(): import("react/jsx-runtime").JSX.Element[] | null;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
