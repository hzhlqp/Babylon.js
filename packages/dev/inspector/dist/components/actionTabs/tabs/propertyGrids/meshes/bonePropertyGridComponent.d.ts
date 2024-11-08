import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { Bone } from "core/Bones/bone";
interface IBonePropertyGridComponentProps {
    globalState: GlobalState;
    bone: Bone;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class BonePropertyGridComponent extends React.Component<IBonePropertyGridComponentProps> {
    constructor(props: IBonePropertyGridComponentProps);
    onTransformNodeLink(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
