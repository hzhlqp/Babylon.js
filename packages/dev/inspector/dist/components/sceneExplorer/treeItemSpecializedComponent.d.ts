import type { Camera } from "core/Cameras/camera";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { GlobalState } from "../globalState";
interface ITreeItemSpecializedComponentProps {
    label: string;
    entity?: any;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    globalState: GlobalState;
    gizmoCamera?: Camera;
    onClick?: () => void;
}
export declare class TreeItemSpecializedComponent extends React.Component<ITreeItemSpecializedComponentProps> {
    constructor(props: ITreeItemSpecializedComponentProps);
    onClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
