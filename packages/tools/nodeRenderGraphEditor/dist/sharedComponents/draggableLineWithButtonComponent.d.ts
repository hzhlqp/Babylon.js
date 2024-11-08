import * as React from "react";
export interface IDraggableLineWithButtonComponent {
    data: string;
    tooltip: string;
    iconImage: any;
    onIconClick: (value: string) => void;
    iconTitle: string;
    lenSuffixToRemove?: number;
}
export declare class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
    constructor(props: IDraggableLineWithButtonComponent);
    render(): import("react/jsx-runtime").JSX.Element;
}
