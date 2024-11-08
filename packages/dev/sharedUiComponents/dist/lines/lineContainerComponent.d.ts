import * as React from "react";
import type { ISelectedLineContainer } from "./iSelectedLineContainer";
interface ILineContainerComponentProps {
    selection?: ISelectedLineContainer;
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export declare class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
    isHighlighted: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;
    renderHeader(): import("react/jsx-runtime").JSX.Element;
    componentDidMount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
