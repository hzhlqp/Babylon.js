import * as React from "react";
import type { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import type { NodePort } from "shared-ui-components/nodeGraphSystem/nodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    nodePort: NodePort;
}
export declare class NodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps> {
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    toggleExposeOnFrame(value: boolean): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
