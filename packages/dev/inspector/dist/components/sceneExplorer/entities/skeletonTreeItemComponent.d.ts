import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { Skeleton } from "core/Bones/skeleton";
interface ISkeletonTreeItemComponentProps {
    skeleton: Skeleton;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class SkeletonTreeItemComponent extends React.Component<ISkeletonTreeItemComponentProps> {
    constructor(props: ISkeletonTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
