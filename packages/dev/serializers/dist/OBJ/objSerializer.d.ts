import type { Mesh } from "core/Meshes/mesh";
/**
 * Class for generating OBJ data from a Babylon scene.
 */
export declare class OBJExport {
    /**
     * Exports the geometry of a Mesh array in .OBJ file format (text)
     * @param meshes defines the list of meshes to serialize
     * @param materials defines if materials should be exported
     * @param matlibname defines the name of the associated mtl file
     * @param globalposition defines if the exported positions are globals or local to the exported mesh
     * @returns the OBJ content
     */
    static OBJ(meshes: Mesh[], materials?: boolean, matlibname?: string, globalposition?: boolean): string;
    /**
     * Exports the material(s) of a mesh in .MTL file format (text)
     * @param mesh defines the mesh to extract the material from
     * @returns the mtl content
     */
    static MTL(mesh: Mesh): string;
}
