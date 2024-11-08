import * as React from "react";
import type { GlobalState } from "../../../globalState";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IVector3PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
    lockObject: LockObject;
}
export declare class Vector3PropertyTabComponent extends React.Component<IVector3PropertyTabComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
