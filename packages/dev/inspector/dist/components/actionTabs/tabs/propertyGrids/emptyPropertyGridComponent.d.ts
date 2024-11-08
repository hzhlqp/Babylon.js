import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
interface IEmptyPropertyGridComponentProps {
    globalState: GlobalState;
    item: {
        inspectableCustomProperties: any;
    };
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class EmptyPropertyGridComponent extends React.Component<IEmptyPropertyGridComponentProps> {
    constructor(props: IEmptyPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
