import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Control } from "gui/2D/controls/control";
import * as React from "react";
interface IControlTreeItemComponentProps {
    control: Control;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
    isActive: boolean;
    isVisible: boolean;
}> {
    constructor(props: IControlTreeItemComponentProps);
    highlight(): void;
    switchVisibility(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
