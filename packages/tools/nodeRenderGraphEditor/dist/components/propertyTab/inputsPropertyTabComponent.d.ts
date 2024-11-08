import * as React from "react";
import type { GlobalState } from "../../globalState";
import "./propertyTab.scss";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { NodeRenderGraphInputBlock } from "core/FrameGraph/Node/Blocks/inputBlock";
interface IInputsPropertyTabComponentProps {
    globalState: GlobalState;
    inputs: NodeRenderGraphInputBlock[];
    lockObject: LockObject;
}
export declare class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
    constructor(props: IInputsPropertyTabComponentProps);
    processInputBlockUpdate(): void;
    renderInputBlock(block: NodeRenderGraphInputBlock): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
