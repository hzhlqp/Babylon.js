import * as React from "react";
import type { GlobalState } from "../globalState";
import "../scss/commandBar.scss";
interface ICommandBarComponentProps {
    globalState: GlobalState;
}
export declare class CommandBarComponent extends React.Component<ICommandBarComponentProps> {
    private _sizeOption;
    private _stopUpdating;
    private _lockObject;
    constructor(props: ICommandBarComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
