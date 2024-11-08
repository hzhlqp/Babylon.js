import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
export interface IFramePropertyTabComponentProps {
    globalState: GlobalState;
    frame: GraphFrame;
}
export declare class FramePropertyTabComponent extends React.Component<IFramePropertyTabComponentProps> {
    private _onFrameExpandStateChangedObserver;
    constructor(props: IFramePropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
