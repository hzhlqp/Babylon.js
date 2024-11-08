import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IPushButtonComponentProps {
    globalState: GlobalState;
    context: Context;
    icon: string;
    id?: string;
    className?: string;
    isPushed?: boolean;
    onClick: (state: boolean) => void;
    tooltip?: string;
}
interface IPushButtonComponentState {
    isPushed: boolean;
}
export declare class PushButtonComponent extends React.Component<IPushButtonComponentProps, IPushButtonComponentState> {
    constructor(props: IPushButtonComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
