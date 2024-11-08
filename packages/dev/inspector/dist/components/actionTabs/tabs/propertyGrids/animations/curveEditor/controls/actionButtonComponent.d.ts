import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IActionButtonComponentProps {
    globalState: GlobalState;
    context: Context;
    icon: string;
    id?: string;
    className?: string;
    isActive?: boolean;
    onClick: () => void;
    tooltip?: string;
}
interface IActionButtonComponentState {
}
export declare class ActionButtonComponent extends React.Component<IActionButtonComponentProps, IActionButtonComponentState> {
    constructor(props: IActionButtonComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
