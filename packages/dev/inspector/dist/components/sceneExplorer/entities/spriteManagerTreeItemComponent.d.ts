import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { SpriteManager } from "core/Sprites/spriteManager";
interface ISpriteManagerTreeItemComponentProps {
    spriteManager: SpriteManager;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class SpriteManagerTreeItemComponent extends React.Component<ISpriteManagerTreeItemComponentProps> {
    constructor(props: ISpriteManagerTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
