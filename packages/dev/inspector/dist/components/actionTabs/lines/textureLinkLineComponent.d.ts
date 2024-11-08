import * as React from "react";
import type { Nullable } from "core/types";
import type { Observable } from "core/Misc/observable";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Material } from "core/Materials/material";
import type { Scene } from "core/scene";
export interface ITextureLinkLineComponentProps {
    label: string;
    texture: Nullable<BaseTexture>;
    material?: Material;
    texturedObject?: {
        getScene: () => Scene;
    };
    onSelectionChangedObservable?: Observable<any>;
    onDebugSelectionChangeObservable?: Observable<TextureLinkLineComponent>;
    propertyName?: string;
    onTextureCreated?: (texture: BaseTexture) => void;
    customDebugAction?: (state: boolean) => void;
    onTextureRemoved?: () => void;
    fileFormats?: string;
    cubeOnly?: boolean;
}
export declare class TextureLinkLineComponent extends React.Component<ITextureLinkLineComponentProps, {
    isDebugSelected: boolean;
}> {
    private _onDebugSelectionChangeObserver;
    constructor(props: ITextureLinkLineComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    debugTexture(): void;
    onLink(): void;
    updateTexture(file: File): void;
    removeTexture(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
