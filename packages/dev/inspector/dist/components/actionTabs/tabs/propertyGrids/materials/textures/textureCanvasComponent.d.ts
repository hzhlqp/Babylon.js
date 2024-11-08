import * as React from "react";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
interface ITextureCanvasComponentProps {
    canvasUI: React.RefObject<HTMLCanvasElement>;
    canvas2D: React.RefObject<HTMLCanvasElement>;
    canvas3D: React.RefObject<HTMLCanvasElement>;
    texture: BaseTexture;
}
export declare class TextureCanvasComponent extends React.Component<ITextureCanvasComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
