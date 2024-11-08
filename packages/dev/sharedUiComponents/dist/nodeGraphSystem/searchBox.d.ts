import * as React from "react";
import type { StateManager } from "./stateManager";
import "./searchBox.scss";
export interface ISearchBoxComponentProps {
    stateManager: StateManager;
}
/**
 * The search box component.
 */
export declare class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
    isVisible: boolean;
    filter: string;
    selectedIndex: number;
}> {
    private _handleEscKey;
    private _targetX;
    private _targetY;
    private _nodes;
    constructor(props: ISearchBoxComponentProps);
    hide(): void;
    onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    onNewNodeRequested(name: string): void;
    onKeyDown(evt: React.KeyboardEvent): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
