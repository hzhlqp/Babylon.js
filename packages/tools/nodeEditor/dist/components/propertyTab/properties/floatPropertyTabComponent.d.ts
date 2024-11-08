import * as React from "react";
import type { GlobalState } from "../../../globalState";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
interface IFloatPropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
}
export declare class FloatPropertyTabComponent extends React.Component<IFloatPropertyTabComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
