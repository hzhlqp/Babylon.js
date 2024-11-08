import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IControlButtonComponentProps {
    globalState: GlobalState;
    context: Context;
    icon: string;
    hoverIcon: string;
    id?: string;
    className?: string;
    onClick: () => void;
    tooltip?: string;
}
interface IControlButtonComponentState {
}
export declare class ControlButtonComponent extends React.Component<IControlButtonComponentProps, IControlButtonComponentState> {
    constructor(props: IControlButtonComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
