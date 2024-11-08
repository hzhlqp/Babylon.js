import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { Bone } from "core/Bones/bone";
interface IBoneTreeItemComponentProps {
    bone: Bone;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class BoneTreeItemComponent extends React.Component<IBoneTreeItemComponentProps> {
    constructor(props: IBoneTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
