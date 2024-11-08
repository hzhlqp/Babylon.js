import * as React from "react";
interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    uploadName?: string;
}
export declare class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private _uploadRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
