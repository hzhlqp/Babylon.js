import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { Nullable } from "core/types";
import "./propertyTab.scss";
import { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import { NodePort } from "shared-ui-components/nodeGraphSystem/nodePort";
import type { FrameNodePort } from "shared-ui-components/nodeGraphSystem/frameNodePort";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GeometryInputBlock } from "core/Meshes/Node/Blocks/geometryInputBlock";
interface IPropertyTabComponentProps {
    globalState: GlobalState;
    lockObject: LockObject;
}
interface IPropertyTabComponentState {
    currentNode: Nullable<GraphNode>;
    currentFrame: Nullable<GraphFrame>;
    currentFrameNodePort: Nullable<FrameNodePort>;
    currentNodePort: Nullable<NodePort>;
    uploadInProgress: boolean;
}
export declare class PropertyTabComponent extends React.Component<IPropertyTabComponentProps, IPropertyTabComponentState> {
    private _onBuiltObserver;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    processInputBlockUpdate(): void;
    renderInputBlock(block: GeometryInputBlock): import("react/jsx-runtime").JSX.Element | null;
    load(file: File): void;
    loadFrame(file: File): void;
    save(): void;
    customSave(): void;
    saveToSnippetServer(): void;
    loadFromSnippet(): void;
    exportAsGLB(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
