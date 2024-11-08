import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { GlobalState } from "../../../../globalState";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { MeshParticleEmitter } from "core/Particles/EmitterTypes/meshParticleEmitter";
import type { Scene } from "core/scene";
interface IMeshEmitterGridComponentProps {
    globalState: GlobalState;
    emitter: MeshParticleEmitter;
    scene: Scene;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class MeshEmitterGridComponent extends React.Component<IMeshEmitterGridComponentProps> {
    constructor(props: IMeshEmitterGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
