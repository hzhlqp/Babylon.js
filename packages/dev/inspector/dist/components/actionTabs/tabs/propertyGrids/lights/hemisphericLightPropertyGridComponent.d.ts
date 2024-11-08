import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { HemisphericLight } from "core/Lights/hemisphericLight";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IHemisphericLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: HemisphericLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class HemisphericLightPropertyGridComponent extends React.Component<IHemisphericLightPropertyGridComponentProps> {
    constructor(props: IHemisphericLightPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
