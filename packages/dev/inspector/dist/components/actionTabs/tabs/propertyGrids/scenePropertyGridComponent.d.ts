import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { Vector3 } from "core/Maths/math.vector";
import type { Scene } from "core/scene";
import type { PropertyChangedEvent } from "../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../globalState";
import "core/Physics/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
interface IScenePropertyGridComponentProps {
    globalState: GlobalState;
    scene: Scene;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onSelectionChangedObservable?: Observable<any>;
}
export declare class ScenePropertyGridComponent extends React.Component<IScenePropertyGridComponentProps> {
    private _storedEnvironmentTexture;
    private _renderingModeGroupObservable;
    constructor(props: IScenePropertyGridComponentProps);
    setRenderingModes(point: boolean, wireframe: boolean): void;
    switchIBL(): void;
    updateEnvironmentTexture(file: File): void;
    updateGravity(newValue: Vector3): void;
    updateTimeStep(newValue: number): void;
    normalizeScene(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
