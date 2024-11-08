import * as React from "react";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class TexturePropertyTabComponent extends React.Component<IPropertyComponentProps> {
    constructor(props: IPropertyComponentProps);
    loadTextureData(file: File): Promise<void>;
    removeData(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
