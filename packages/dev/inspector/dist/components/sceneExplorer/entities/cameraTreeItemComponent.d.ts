import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Camera } from "core/Cameras/camera";
import * as React from "react";
import type { GlobalState } from "../../globalState";
interface ICameraTreeItemComponentProps {
    camera: Camera;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
    globalState: GlobalState;
    gizmoCamera?: Camera;
}
export declare class CameraTreeItemComponent extends React.Component<ICameraTreeItemComponentProps, {
    isActive: boolean;
    isGizmoEnabled: boolean;
}> {
    private _onBeforeRenderObserver;
    constructor(props: ICameraTreeItemComponentProps);
    setActive(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    toggleGizmo(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
