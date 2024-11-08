import type { TransformNode } from "core/Meshes/transformNode";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Mesh } from "core/Meshes/mesh";
import type { Scene } from "core/scene";
import { Button3D } from "./button3D";
/**
 * Class used to create an interactable object. It's a 3D button using a mesh coming from the current scene
 */
export declare class MeshButton3D extends Button3D {
    /** @internal */
    protected _currentMesh: Mesh;
    /**
     * Creates a new 3D button based on a mesh
     * @param mesh mesh to become a 3D button
     * @param name defines the control name
     */
    constructor(mesh: Mesh, name?: string);
    protected _getTypeName(): string;
    protected _createNode(scene: Scene): TransformNode;
    protected _affectMaterial(mesh: AbstractMesh): void;
}
