import * as React from "react";
import type { GlobalState } from "../../../globalState";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GeometryInputBlock } from "core/Meshes/Node/Blocks/geometryInputBlock";
interface IVector2PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: GeometryInputBlock;
    lockObject: LockObject;
}
export declare class Vector2PropertyTabComponent extends React.Component<IVector2PropertyTabComponentProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
