import * as React from "react";
import type { GlobalState } from "../../globalState";
import "./nodeList.scss";
interface INodeListComponentProps {
    globalState: GlobalState;
}
export declare class NodeListComponent extends React.Component<INodeListComponentProps, {
    filter: string;
}> {
    private _onResetRequiredObserver;
    private static _Tooltips;
    private _customFrameList;
    constructor(props: INodeListComponentProps);
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    loadCustomFrame(file: File): void;
    removeItem(value: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
