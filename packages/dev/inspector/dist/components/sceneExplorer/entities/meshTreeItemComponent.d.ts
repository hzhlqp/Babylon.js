import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import * as React from "react";
import type { GlobalState } from "../../globalState";
import "core/Rendering/boundingBoxRenderer";
interface IMeshTreeItemComponentProps {
    mesh: AbstractMesh;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
    globalState: GlobalState;
}
export declare class MeshTreeItemComponent extends React.Component<IMeshTreeItemComponentProps, {
    isBoundingBoxEnabled: boolean;
    isVisible: boolean;
}> {
    constructor(props: IMeshTreeItemComponentProps);
    showBoundingBox(): void;
    switchVisibility(): void;
    private _getNameForLabel;
    private _editGeometry;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
