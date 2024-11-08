import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { SpotLight } from "core/Lights/spotLight";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ISpotLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: SpotLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SpotLightPropertyGridComponent extends React.Component<ISpotLightPropertyGridComponentProps> {
    constructor(props: ISpotLightPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
