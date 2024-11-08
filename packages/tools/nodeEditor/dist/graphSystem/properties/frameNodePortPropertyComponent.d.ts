import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import type { FrameNodePort } from "shared-ui-components/nodeGraphSystem/frameNodePort";
export interface IFrameNodePortPropertyTabComponentProps {
    stateManager: StateManager;
    globalState: GlobalState;
    frameNodePort: FrameNodePort;
    frame: GraphFrame;
}
export declare class FrameNodePortPropertyTabComponent extends React.Component<IFrameNodePortPropertyTabComponentProps, {
    port: FrameNodePort;
}> {
    private _onFramePortPositionChangedObserver;
    private _onSelectionChangedObserver;
    constructor(props: IFrameNodePortPropertyTabComponentProps);
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
