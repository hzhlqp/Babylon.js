import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { ConeParticleEmitter } from "core/Particles/EmitterTypes/coneParticleEmitter";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IConeEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: ConeParticleEmitter;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ConeEmitterGridComponent extends React.Component<IConeEmitterGridComponentProps> {
    constructor(props: IConeEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
