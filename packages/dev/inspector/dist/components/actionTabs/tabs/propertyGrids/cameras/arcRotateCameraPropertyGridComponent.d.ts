import * as React from "react";
import type { ArcRotateCamera } from "core/Cameras/arcRotateCamera";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IArcRotateCameraPropertyGridComponentProps {
    globalState: GlobalState;
    camera: ArcRotateCamera;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ArcRotateCameraPropertyGridComponent extends React.Component<IArcRotateCameraPropertyGridComponentProps> {
    constructor(props: IArcRotateCameraPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
