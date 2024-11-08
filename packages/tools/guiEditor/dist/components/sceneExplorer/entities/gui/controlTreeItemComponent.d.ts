import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Control } from "gui/2D/controls/control";
import * as React from "react";
import type { GlobalState } from "../../../../globalState";
import { DragOverLocation } from "../../../../globalState";
interface IControlTreeItemComponentProps {
    control: Control;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
    globalState: GlobalState;
    isHovered: boolean;
    isDragOver: boolean;
    dragOverLocation: DragOverLocation;
    onRenamingStateChanged: (renaming: boolean) => void;
}
export declare class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
    isActive: boolean;
    isVisible: boolean;
    isRenaming: boolean;
}> {
    private _onIsVisibleChangedObserver;
    constructor(props: IControlTreeItemComponentProps);
    componentWillUnmount(): void;
    highlight(): void;
    switchVisibility(): void;
    onRename(name: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
