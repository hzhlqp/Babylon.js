import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { IShadowLight } from "core/Lights/shadowLight";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ICommonShadowLightPropertyGridComponentProps {
    globalState: GlobalState;
    light: IShadowLight;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CommonShadowLightPropertyGridComponent extends React.Component<ICommonShadowLightPropertyGridComponentProps> {
    private _internals;
    constructor(props: ICommonShadowLightPropertyGridComponentProps);
    createShadowGenerator(): void;
    disposeShadowGenerator(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
