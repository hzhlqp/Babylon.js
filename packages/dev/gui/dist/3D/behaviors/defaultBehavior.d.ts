import type { Behavior } from "core/Behaviors/behavior";
import { FollowBehavior } from "core/Behaviors/Meshes/followBehavior";
import { SixDofDragBehavior } from "core/Behaviors/Meshes/sixDofDragBehavior";
import type { Mesh } from "core/Meshes/mesh";
import type { Nullable } from "core/types";
import { SurfaceMagnetismBehavior } from "core/Behaviors/Meshes/surfaceMagnetismBehavior";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
/**
 * Default behavior for 3D UI elements.
 * Handles a FollowBehavior, SixDofBehavior and SurfaceMagnetismBehavior
 * @since 5.0.0
 */
export declare class DefaultBehavior implements Behavior<Mesh> {
    private _scene;
    private _followBehavior;
    private _sixDofDragBehavior;
    private _surfaceMagnetismBehavior;
    private _onBeforeRenderObserver;
    private _onDragObserver;
    /**
     * Instantiates the default behavior
     */
    constructor();
    /**
     * Attached node of this behavior
     */
    attachedNode: Nullable<Mesh>;
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     *  The follow behavior
     */
    get followBehavior(): FollowBehavior;
    /**
     *  The six DoF drag behavior
     */
    get sixDofDragBehavior(): SixDofDragBehavior;
    /**
     * The surface magnetism behavior
     */
    get surfaceMagnetismBehavior(): SurfaceMagnetismBehavior;
    /**
     * Enables the follow behavior
     */
    followBehaviorEnabled: boolean;
    /**
     * Enables the six DoF drag behavior
     */
    sixDofDragBehaviorEnabled: boolean;
    /**
     * Enables the surface magnetism behavior
     */
    surfaceMagnetismBehaviorEnabled: boolean;
    /**
     *  Initializes the behavior
     */
    init(): void;
    /**
     * Attaches the default behavior
     * @param ownerMesh The top level mesh
     * @param draggablesMeshes Descendant meshes that can be used for dragging the owner mesh
     * @param sceneUnderstandingMeshes Meshes from the scene understanding that will be used for surface magnetism
     */
    attach(ownerMesh: Mesh, draggablesMeshes?: Mesh[], sceneUnderstandingMeshes?: AbstractMesh[]): void;
    /**
     *  Detaches the behavior from the mesh
     */
    detach(): void;
    private _addObservables;
    private _removeObservables;
}
