import type { AnimationGroup } from "core/Animations/animationGroup";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
interface IAnimationGroupItemComponentProps {
    animationGroup: AnimationGroup;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class AnimationGroupItemComponent extends React.Component<IAnimationGroupItemComponentProps> {
    constructor(props: IAnimationGroupItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
