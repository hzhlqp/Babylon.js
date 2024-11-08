import * as React from "react";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
interface IBottomBarProps {
    texture: BaseTexture;
    mipLevel: number;
}
export declare class BottomBar extends React.PureComponent<IBottomBarProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
