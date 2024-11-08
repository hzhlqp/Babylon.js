import * as React from "react";
interface ITreeItemLabelComponentProps {
    label?: string;
    onClick?: () => void;
    onChange: (newValue: string) => void;
    bracket: string;
    renaming: boolean;
    setRenaming: (renaming: boolean) => void;
}
interface ITreeItemLabelState {
    value: string;
}
export declare class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps, ITreeItemLabelState> {
    constructor(props: ITreeItemLabelComponentProps);
    onClick(): void;
    onBlur(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
