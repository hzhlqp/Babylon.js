import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
interface IVariantsPropertyGridComponentProps {
    globalState: GlobalState;
    host: any;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class VariantsPropertyGridComponent extends React.Component<IVariantsPropertyGridComponentProps> {
    constructor(props: IVariantsPropertyGridComponentProps);
    private _getVariantsExtension;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
