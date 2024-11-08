import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { Mesh } from "core/Meshes/mesh";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import "core/Physics/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
interface IMeshPropertyGridComponentProps {
    globalState: GlobalState;
    mesh: Mesh;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class MeshPropertyGridComponent extends React.Component<IMeshPropertyGridComponentProps, {
    displayNormals: boolean;
    displayVertexColors: boolean;
    displayBoneWeights: boolean;
    displayBoneIndex: number;
    displaySkeletonMap: boolean;
}> {
    constructor(props: IMeshPropertyGridComponentProps);
    renderWireframeOver(): void;
    renderNormalVectors(): void;
    displayNormals(): void;
    displayVertexColors(): void;
    displayBoneWeights(): void;
    displaySkeletonMap(): void;
    onBoneDisplayIndexChange(value: number): void;
    onMaterialLink(): void;
    onSourceMeshLink(): void;
    onSkeletonLink(): void;
    convertPhysicsTypeToString(): string;
    private _getIdForDisplay;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
