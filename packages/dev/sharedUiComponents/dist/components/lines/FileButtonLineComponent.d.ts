import * as React from "react";
export interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export declare class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
