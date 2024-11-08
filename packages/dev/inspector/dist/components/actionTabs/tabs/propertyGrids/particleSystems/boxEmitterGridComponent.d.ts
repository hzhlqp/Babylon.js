import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { BoxParticleEmitter } from "core/Particles/EmitterTypes/boxParticleEmitter";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IBoxEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: BoxParticleEmitter;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    lockObject: LockObject;
}
export declare class BoxEmitterGridComponent extends React.Component<IBoxEmitterGridComponentProps> {
    constructor(props: IBoxEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
