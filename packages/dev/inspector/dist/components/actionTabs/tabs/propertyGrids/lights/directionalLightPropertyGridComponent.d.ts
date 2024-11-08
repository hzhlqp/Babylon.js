import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { DirectionalLight } from "core/Lights/directionalLight";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IDirectionalLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: DirectionalLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class DirectionalLightPropertyGridComponent extends React.Component<IDirectionalLightPropertyGridComponentProps> {
    constructor(props: IDirectionalLightPropertyGridComponentProps);
    displayFrustum(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
