import * as React from "react";
interface IFileButtonLineProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export declare class FileButtonLine extends React.Component<IFileButtonLineProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineProps);
    onChange(evt: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
