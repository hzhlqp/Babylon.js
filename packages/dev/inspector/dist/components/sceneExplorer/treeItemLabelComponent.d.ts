import * as React from "react";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
interface ITreeItemLabelComponentProps {
    label: string;
    onClick?: () => void;
    icon: IconDefinition;
    color: string;
}
export declare class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps> {
    constructor(props: ITreeItemLabelComponentProps);
    onClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
