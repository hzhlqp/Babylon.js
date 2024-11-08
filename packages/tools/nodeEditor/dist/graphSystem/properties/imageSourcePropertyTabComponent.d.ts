import * as React from "react";
import type { ImageSourceBlock } from "core/Materials/Node/Blocks/Dual/imageSourceBlock";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class ImageSourcePropertyTabComponent extends React.Component<IPropertyComponentProps, {
    isEmbedded: boolean;
}> {
    get imageSourceBlock(): ImageSourceBlock;
    constructor(props: IPropertyComponentProps);
    UNSAFE_componentWillUpdate(nextProps: IPropertyComponentProps, nextState: {
        isEmbedded: boolean;
        loadAsCubeTexture: boolean;
    }): void;
    private _generateRandomForCache;
    updateAfterTextureLoad(): void;
    removeTexture(): void;
    _prepareTexture(): void;
    /**
     * Replaces the texture of the node
     * @param file the file of the texture to use
     */
    replaceTexture(file: File): void;
    replaceTextureWithUrl(url: string): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
