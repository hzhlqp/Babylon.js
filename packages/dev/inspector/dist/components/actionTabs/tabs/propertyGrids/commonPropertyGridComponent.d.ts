import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
interface ICommonPropertyGridComponentProps {
    globalState: GlobalState;
    host: {
        metadata: any;
    };
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CommonPropertyGridComponent extends React.Component<ICommonPropertyGridComponentProps> {
    constructor(props: ICommonPropertyGridComponentProps);
    renderLevel(jsonObject: any): import("react/jsx-runtime").JSX.Element[];
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
