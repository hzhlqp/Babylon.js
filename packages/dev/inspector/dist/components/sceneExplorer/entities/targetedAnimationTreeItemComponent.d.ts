import type { TargetedAnimation } from "core/Animations/animationGroup";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
interface ITargetedAnimationItemComponentProps {
    targetedAnimation: TargetedAnimation;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class TargetedAnimationItemComponent extends React.Component<ITargetedAnimationItemComponentProps> {
    constructor(props: ITargetedAnimationItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
