import * as React from "react";
export interface IIconButtonLineComponentProps {
    icon: string;
    onClick: () => void;
    tooltip: string;
    active?: boolean;
}
export declare class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
    constructor(props: IIconButtonLineComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
