import * as React from "react";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class MeshPropertyTabComponent extends React.Component<IPropertyComponentProps, {
    isLoading: boolean;
}> {
    constructor(props: IPropertyComponentProps);
    loadMesh(file: File): Promise<void>;
    removeData(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
