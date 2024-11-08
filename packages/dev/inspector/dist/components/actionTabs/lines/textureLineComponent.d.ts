import * as React from "react";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { GlobalState } from "../../../components/globalState";
import type { TextureChannelsToDisplay } from "../../../textureHelper";
interface ITextureLineComponentProps {
    texture: BaseTexture;
    width: number;
    height: number;
    globalState?: GlobalState;
    hideChannelSelect?: boolean;
}
export declare class TextureLineComponent extends React.Component<ITextureLineComponentProps, {
    channels: TextureChannelsToDisplay;
    face: number;
}> {
    private _canvasRef;
    private static _TextureChannelStates;
    constructor(props: ITextureLineComponentProps);
    shouldComponentUpdate(nextProps: ITextureLineComponentProps, nextState: {
        channels: TextureChannelsToDisplay;
        face: number;
    }): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    updatePreview(): Promise<void>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
