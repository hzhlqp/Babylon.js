import * as React from "react";
import type { GlobalState } from "../../globalState";
import "./guiList.scss";
interface IGuiListComponentProps {
    globalState: GlobalState;
}
export declare class GuiListComponent extends React.Component<IGuiListComponentProps, {
    filter: string;
}> {
    private _onResetRequiredObserver;
    private static _Tooltips;
    constructor(props: IGuiListComponentProps);
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
