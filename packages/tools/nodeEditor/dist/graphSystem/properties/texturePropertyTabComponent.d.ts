import * as React from "react";
import { ReflectionTextureBlock } from "core/Materials/Node/Blocks/Dual/reflectionTextureBlock";
import { ReflectionBlock } from "core/Materials/Node/Blocks/PBR/reflectionBlock";
import { RefractionBlock } from "core/Materials/Node/Blocks/PBR/refractionBlock";
import type { TextureBlock } from "core/Materials/Node/Blocks/Dual/textureBlock";
import { CurrentScreenBlock } from "core/Materials/Node/Blocks/Dual/currentScreenBlock";
import { ParticleTextureBlock } from "core/Materials/Node/Blocks/Particle/particleTextureBlock";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
import type { TriPlanarBlock } from "core/Materials/Node/Blocks/triPlanarBlock";
type ReflectionTexture = ReflectionTextureBlock | ReflectionBlock | RefractionBlock;
type AnyTexture = TextureBlock | ReflectionTexture | CurrentScreenBlock | ParticleTextureBlock | TriPlanarBlock;
export declare class TexturePropertyTabComponent extends React.Component<IPropertyComponentProps, {
    isEmbedded: boolean;
    loadAsCubeTexture: boolean;
    textureIsPrefiltered: boolean;
}> {
    get textureBlock(): AnyTexture;
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
export {};
