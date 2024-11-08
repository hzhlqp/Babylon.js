import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { HemisphericParticleEmitter } from "core/Particles/EmitterTypes/hemisphericParticleEmitter";
interface IHemisphericEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: HemisphericParticleEmitter;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class HemisphericEmitterGridComponent extends React.Component<IHemisphericEmitterGridComponentProps> {
    constructor(props: IHemisphericEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
