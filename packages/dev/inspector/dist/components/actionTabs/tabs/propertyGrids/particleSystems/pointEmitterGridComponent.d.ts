import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { PointParticleEmitter } from "core/Particles/EmitterTypes/pointParticleEmitter";
interface IPointEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: PointParticleEmitter;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class PointEmitterGridComponent extends React.Component<IPointEmitterGridComponentProps> {
    constructor(props: IPointEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
