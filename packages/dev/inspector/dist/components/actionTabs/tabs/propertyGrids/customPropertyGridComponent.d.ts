import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { GlobalState } from "../../../globalState";
import type { IInspectable } from "core/Misc/iInspectable";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface ICustomPropertyGridComponentProps {
    globalState: GlobalState;
    target: any;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CustomPropertyGridComponent extends React.Component<ICustomPropertyGridComponentProps, {
    mode: number;
}> {
    constructor(props: ICustomPropertyGridComponentProps);
    renderInspectable(inspectable: IInspectable): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
