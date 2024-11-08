import * as React from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IMessageLineComponentProps {
    text: string;
    color?: string;
    icon?: IconProp;
}
export declare class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
    constructor(props: IMessageLineComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
