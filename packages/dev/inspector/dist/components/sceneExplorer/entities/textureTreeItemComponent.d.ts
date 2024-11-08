import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Texture } from "core/Materials/Textures/texture";
import * as React from "react";
interface ITextureTreeItemComponentProps {
    texture: Texture;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class TextureTreeItemComponent extends React.Component<ITextureTreeItemComponentProps> {
    constructor(props: ITextureTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
