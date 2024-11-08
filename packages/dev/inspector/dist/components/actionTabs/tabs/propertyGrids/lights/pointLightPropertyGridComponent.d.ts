import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PointLight } from "core/Lights/pointLight";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IPointLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: PointLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class PointLightPropertyGridComponent extends React.Component<IPointLightPropertyGridComponentProps> {
    constructor(props: IPointLightPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
