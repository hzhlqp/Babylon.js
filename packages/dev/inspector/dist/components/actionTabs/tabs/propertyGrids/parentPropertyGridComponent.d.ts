import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
import type { Node } from "core/node";
interface IParentPropertyGridComponentProps {
    globalState: GlobalState;
    lockObject: LockObject;
    node: Node;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ParentPropertyGridComponent extends React.Component<IParentPropertyGridComponentProps> {
    constructor(props: IParentPropertyGridComponentProps);
    private _getNameForSortingAndDisplay;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
