import * as React from "react";
interface ILineContainerComponentProps {
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export declare class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;
    renderHeader(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
