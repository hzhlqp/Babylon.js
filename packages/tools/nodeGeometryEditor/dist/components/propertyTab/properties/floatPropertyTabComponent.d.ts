import * as React from "react";
import type { GlobalState } from "../../../globalState";
import type { GeometryInputBlock } from "core/Meshes/Node/Blocks/geometryInputBlock";
interface IFloatPropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: GeometryInputBlock;
}
export declare class FloatPropertyTabComponent extends React.Component<IFloatPropertyTabComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
