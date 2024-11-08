import * as React from "react";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ITransformNodePropertyGridComponentProps {
    globalState: GlobalState;
    transformNode: TransformNode;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class TransformNodePropertyGridComponent extends React.Component<ITransformNodePropertyGridComponentProps> {
    constructor(props: ITransformNodePropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
