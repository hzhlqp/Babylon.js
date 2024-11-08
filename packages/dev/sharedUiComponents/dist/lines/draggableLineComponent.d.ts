import * as React from "react";
export interface IButtonLineComponentProps {
    format: string;
    data: string;
    tooltip: string;
}
export declare class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
