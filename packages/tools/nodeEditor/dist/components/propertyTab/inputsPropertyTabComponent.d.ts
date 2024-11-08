import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
import "./propertyTab.scss";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IInputsPropertyTabComponentProps {
    globalState: GlobalState;
    inputs: InputBlock[];
    lockObject: LockObject;
}
export declare class InputsPropertyTabComponent extends React.Component<IInputsPropertyTabComponentProps> {
    constructor(props: IInputsPropertyTabComponentProps);
    processInputBlockUpdate(ib: InputBlock): void;
    renderInputBlock(block: InputBlock): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
