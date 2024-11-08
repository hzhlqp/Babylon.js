import * as React from "react";
import type { GlobalState } from "../../../globalState";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GeometryInputBlock } from "core/Meshes/Node/Blocks/geometryInputBlock";
interface IVector3PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: GeometryInputBlock;
    lockObject: LockObject;
}
export declare class Vector3PropertyTabComponent extends React.Component<IVector3PropertyTabComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
