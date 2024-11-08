import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { Nullable } from "core/types";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
import "./propertyTab.scss";
import { GraphNode } from "shared-ui-components/nodeGraphSystem/graphNode";
import { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import { NodePort } from "shared-ui-components/nodeGraphSystem/nodePort";
import type { FrameNodePort } from "shared-ui-components/nodeGraphSystem/frameNodePort";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
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
    private _modeSelect;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    processInputBlockUpdate(ib: InputBlock): void;
    renderInputBlock(block: InputBlock): import("react/jsx-runtime").JSX.Element | null;
    load(file: File): void;
    loadFrame(file: File): void;
    save(): void;
    customSave(): void;
    saveToSnippetServer(): void;
    loadFromSnippet(): void;
    changeMode(value: any, force?: boolean, loadDefault?: boolean): boolean;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
