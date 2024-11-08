import type { Nullable } from "core/types";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { GlobalState } from "../../globalState";
import { DragOverLocation } from "../../globalState";
export interface ITreeItemSelectableComponentProps {
    entity: any;
    selectedEntities: any[];
    mustExpand?: boolean;
    offset: number;
    globalState: GlobalState;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    filter: Nullable<string>;
}
export interface ITreeItemSelectableComponentState {
    expand: boolean;
    dragOver: boolean;
    isSelected: boolean;
    isHovered: boolean;
    dragOverLocation: DragOverLocation;
    blockDrag: boolean;
}
export declare class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, ITreeItemSelectableComponentState> {
    private _onSelectionChangedObservable;
    private _onDraggingEndObservable;
    private _onDraggingStartObservable;
    /** flag flipped onDragEnter if dragOver is already true
     * prevents dragLeave from immediately setting dragOver to false
     * required to make dragging work as expected
     * see: see: https://github.com/transformation-dev/matrx/tree/master/packages/dragster
     */
    private _secondDragEnter;
    constructor(props: ITreeItemSelectableComponentProps);
    switchExpandedState(): void;
    shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
        isSelected: boolean;
    }): boolean;
    scrollIntoView(): void;
    componentWillUnmount(): void;
    onSelect(): void;
    renderChildren(isExpanded: boolean, offset?: boolean): (import("react/jsx-runtime").JSX.Element | null)[] | null;
    render(): import("react/jsx-runtime").JSX.Element | (import("react/jsx-runtime").JSX.Element | null)[] | null;
    dragOver(event: React.DragEvent<HTMLDivElement>): void;
    updateDragOverLocation(event: React.DragEvent<HTMLDivElement>): void;
    drop(): void;
}
