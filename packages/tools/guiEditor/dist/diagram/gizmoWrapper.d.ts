import type { Nullable } from "core/types";
import type { Observer } from "core/Misc/observable";
import * as React from "react";
import type { GlobalState } from "../globalState";
export interface IGizmoWrapperProps {
    globalState: GlobalState;
}
export declare class GizmoWrapper extends React.Component<IGizmoWrapperProps> {
    observer: Nullable<Observer<void>>;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
