import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { Sprite } from "core/Sprites/sprite";
interface ISpriteTreeItemComponentProps {
    sprite: Sprite;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class SpriteTreeItemComponent extends React.Component<ISpriteTreeItemComponentProps> {
    constructor(props: ISpriteTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
