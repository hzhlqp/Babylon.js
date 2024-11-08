import * as React from "react";
import { Camera } from "core/Cameras/camera";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ICommonCameraPropertyGridComponentProps {
    globalState: GlobalState;
    camera: Camera;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CommonCameraPropertyGridComponent extends React.Component<ICommonCameraPropertyGridComponentProps, {
    mode: number;
}> {
    constructor(props: ICommonCameraPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
