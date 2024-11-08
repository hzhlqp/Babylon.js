import * as React from "react";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
interface ITextureLineComponentProps {
    texture: BaseTexture;
    width: number;
    height: number;
    globalState?: any;
    hideChannelSelect?: boolean;
}
export interface ITextureLineComponentState {
    displayRed: boolean;
    displayGreen: boolean;
    displayBlue: boolean;
    displayAlpha: boolean;
    face: number;
}
export declare class TextureLineComponent extends React.Component<ITextureLineComponentProps, ITextureLineComponentState> {
    private _canvasRef;
    constructor(props: ITextureLineComponentProps);
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updatePreview(): void;
    static UpdatePreview(previewCanvas: HTMLCanvasElement, texture: BaseTexture, width: number, options: ITextureLineComponentState, onReady?: () => void, globalState?: any): Promise<void>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
