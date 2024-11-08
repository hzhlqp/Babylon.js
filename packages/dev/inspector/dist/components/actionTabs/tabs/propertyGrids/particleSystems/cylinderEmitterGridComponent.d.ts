import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { CylinderParticleEmitter } from "core/Particles/EmitterTypes/cylinderParticleEmitter";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface ICylinderEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: CylinderParticleEmitter;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class CylinderEmitterGridComponent extends React.Component<ICylinderEmitterGridComponentProps> {
    constructor(props: ICylinderEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
