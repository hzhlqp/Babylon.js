import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { TransformNode } from "core/Meshes/transformNode";
import * as React from "react";
interface ITransformNodeItemComponentProps {
    transformNode: TransformNode;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class TransformNodeItemComponent extends React.Component<ITransformNodeItemComponentProps> {
    constructor(props: ITransformNodeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
