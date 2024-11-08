import * as React from "react";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare const samplingModeList: {
    label: string;
    value: number;
}[];
export declare const textureFormatList: {
    label: string;
    value: number;
}[];
export declare const textureTypeList: {
    label: string;
    value: number;
}[];
export declare const textureDepthStencilFormatList: {
    label: string;
    value: number;
}[];
export declare class GenericPropertyComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare class GeneralPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare class GenericPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
