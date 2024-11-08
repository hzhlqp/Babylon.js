import * as React from "react";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
import type { NodeGeometryConnectionPoint } from "core/Meshes/Node/nodeGeometryBlockConnectionPoint";
export declare class GenericPropertyComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare class GeneralPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    processUpdate(): void;
    renderConnectionPoint(point: NodeGeometryConnectionPoint): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare class GenericPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
