import * as React from "react";
interface ICommandButtonComponentProps {
    tooltip: string;
    shortcut?: string;
    icon: string;
    iconLabel?: string;
    isActive: boolean;
    copyDeleteDisabled?: boolean;
    pasteDisabled?: boolean;
    onClick: () => void;
    altStyle?: boolean;
    disabled?: boolean;
}
export declare class CommandButtonComponent extends React.Component<ICommandButtonComponentProps> {
    constructor(props: ICommandButtonComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
