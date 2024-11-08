import * as React from "react";
import type { GlobalState } from "../globalState";
interface ICommandDropdownComponentProps {
    globalState: GlobalState;
    icon?: string;
    tooltip: string;
    defaultValue?: string;
    items: {
        label: string;
        icon?: string;
        fileButton?: boolean;
        loadControlButton?: boolean;
        onClick?: () => void;
        onCheck?: (value: boolean) => void;
        storeKey?: string;
        isActive?: boolean;
        defaultValue?: boolean | string;
        subItems?: string[];
    }[];
    toRight?: boolean;
}
export declare class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
    isExpanded: boolean;
    activeState: string;
}> {
    constructor(props: ICommandDropdownComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
