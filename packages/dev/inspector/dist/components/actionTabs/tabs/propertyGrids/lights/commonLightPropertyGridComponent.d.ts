import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { Light } from "core/Lights/light";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ICommonLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: Light;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CommonLightPropertyGridComponent extends React.Component<ICommonLightPropertyGridComponentProps> {
    constructor(props: ICommonLightPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
