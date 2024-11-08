import type { TransformNode } from "core/Meshes/transformNode";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Mesh } from "core/Meshes/mesh";
import { TouchButton3D } from "./touchButton3D";
/**
 * Class used to create an interactable object. It's a touchable 3D button using a mesh coming from the current scene
 * @since 5.0.0
 */
export declare class TouchMeshButton3D extends TouchButton3D {
    /** @internal */
    protected _currentMesh: Mesh;
    /**
     * Creates a new 3D button based on a mesh
     * @param mesh mesh to become a 3D button. By default this is also the mesh for near interaction collision checking
     * @param name defines the control name
     */
    constructor(mesh: Mesh, name?: string);
    protected _getTypeName(): string;
    protected _createNode(): TransformNode;
    protected _affectMaterial(mesh: AbstractMesh): void;
}
