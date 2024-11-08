import * as React from "react";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IPixelData } from "./textureCanvasManager";
import type { ISize } from "core/Maths/math.size";
interface IPropertiesBarProps {
    texture: BaseTexture;
    size: ISize;
    saveTexture(): void;
    pixelData: IPixelData;
    face: number;
    setFace(face: number): void;
    resetTexture(): void;
    resizeTexture(width: number, height: number): void;
    uploadTexture(file: File): void;
    mipLevel: number;
    setMipLevel: (mipLevel: number) => void;
}
interface IPropertiesBarState {
    width: number;
    height: number;
}
export declare class PropertiesBar extends React.PureComponent<IPropertiesBarProps, IPropertiesBarState> {
    private _faces;
    constructor(props: IPropertiesBarProps);
    private _pixelData;
    private _getNewDimension;
    componentWillUpdate(nextProps: IPropertiesBarProps): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
