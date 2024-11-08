import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Material } from "core/Materials/material";
import * as React from "react";
import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
interface IMaterialTreeItemComponentProps {
    material: Material | NodeMaterial;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class MaterialTreeItemComponent extends React.Component<IMaterialTreeItemComponentProps> {
    constructor(props: IMaterialTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
