import * as React from "react";
import type { Observable } from "core/Misc/observable";
import { Scene } from "core/scene";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
interface IFogPropertyGridComponentProps {
    globalState: GlobalState;
    scene: Scene;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class FogPropertyGridComponent extends React.Component<IFogPropertyGridComponentProps, {
    mode: number;
}> {
    constructor(props: IFogPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
