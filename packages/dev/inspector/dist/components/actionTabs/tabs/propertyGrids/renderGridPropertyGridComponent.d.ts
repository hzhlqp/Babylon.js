import * as React from "react";
import type { Scene } from "core/scene";
import type { GlobalState } from "../../../globalState";
interface IRenderGridPropertyGridComponentProps {
    globalState: GlobalState;
    scene: Scene;
}
export declare class RenderGridPropertyGridComponent extends React.Component<IRenderGridPropertyGridComponentProps, {
    isEnabled: boolean;
}> {
    private _gridMesh;
    constructor(props: IRenderGridPropertyGridComponentProps);
    componentDidMount(): void;
    addOrRemoveGrid(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
