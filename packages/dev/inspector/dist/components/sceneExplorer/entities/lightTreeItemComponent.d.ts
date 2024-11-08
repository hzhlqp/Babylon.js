import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Light } from "core/Lights/light";
import type { Camera } from "core/Cameras/camera";
import * as React from "react";
import type { GlobalState } from "../../globalState";
interface ILightTreeItemComponentProps {
    light: Light;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
    globalState: GlobalState;
    gizmoCamera?: Camera;
}
export declare class LightTreeItemComponent extends React.Component<ILightTreeItemComponentProps, {
    isEnabled: boolean;
    isGizmoEnabled: boolean;
}> {
    constructor(props: ILightTreeItemComponentProps);
    switchIsEnabled(): void;
    toggleGizmo(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
