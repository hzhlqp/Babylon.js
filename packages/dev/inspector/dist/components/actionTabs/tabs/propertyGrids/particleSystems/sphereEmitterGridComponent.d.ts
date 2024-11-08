import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { SphereParticleEmitter } from "core/Particles/EmitterTypes/sphereParticleEmitter";
interface ISphereEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: SphereParticleEmitter;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SphereEmitterGridComponent extends React.Component<ISphereEmitterGridComponentProps> {
    constructor(props: ISphereEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
