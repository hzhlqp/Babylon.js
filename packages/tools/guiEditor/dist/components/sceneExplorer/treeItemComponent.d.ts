import * as React from "react";
import type { Nullable } from "core/types";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { GlobalState } from "../../globalState";
export interface ITreeItemComponentProps {
    items?: Nullable<any[]>;
    label: string;
    offset: number;
    filter: Nullable<string>;
    forceSubitems?: boolean;
    globalState: GlobalState;
    entity?: any;
    selectedEntities: any[];
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    contextMenuItems?: {
        label: string;
        action: () => void;
    }[];
}
export declare class TreeItemComponent extends React.Component<ITreeItemComponentProps, {
    isExpanded: boolean;
    mustExpand: boolean;
}> {
    static _ContextMenuUniqueIdGenerator: number;
    constructor(props: ITreeItemComponentProps);
    switchExpandedState(): void;
    shouldComponentUpdate(nextProps: ITreeItemComponentProps, nextState: {
        isExpanded: boolean;
    }): boolean;
    expandAll(expand: boolean): void;
    renderContextMenu(): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
