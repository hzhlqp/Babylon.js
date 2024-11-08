import * as React from "react";
import type { GlobalState } from "./globalState";
import type { Control } from "gui/2D/controls/control";
import "./main.scss";
import "./scss/header.scss";
interface IGraphEditorProps {
    globalState: GlobalState;
}
interface IGraphEditorState {
    showPreviewPopUp: boolean;
    toolbarExpand: boolean;
    message: string;
}
export declare class WorkbenchEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
    private _moveInProgress;
    private _leftWidth;
    private _rightWidth;
    private _popUpWindow;
    private _draggedItem;
    private _rootRef;
    private _onErrorMessageObserver;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addToolControls: (evt: KeyboardEvent) => void;
    removePressToolControls: (evt: KeyboardEvent) => void;
    constructor(props: IGraphEditorProps);
    showWaitScreen(): void;
    hideWaitScreen(): void;
    onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
    buildColumnLayout(): string;
    handlePopUp: () => void;
    handleClosingPopUp: () => void;
    createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
    copyStyles: (sourceDoc: HTMLDocument, targetDoc: HTMLDocument) => void;
    switchExpandedState(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    onCreate(value: string): Control;
    createBlackLine(): import("react/jsx-runtime").JSX.Element;
    createToolbarHelper(ct: {
        className: string;
        icon: string;
    }[]): import("react/jsx-runtime").JSX.Element[];
    createToolbar(): import("react/jsx-runtime").JSX.Element;
}
export {};
