import type { IBufferView, AccessorComponentType, IAccessor } from "babylonjs-gltf2interface";
import { AccessorType } from "babylonjs-gltf2interface";
import type { FloatArray, Nullable } from "core/types";
import type { Vector4 } from "core/Maths/math.vector";
import { Vector3 } from "core/Maths/math.vector";
/**
 * @internal
 */
export declare class _GLTFUtilities {
    /**
     * Creates a buffer view based on the supplied arguments
     * @param bufferIndex index value of the specified buffer
     * @param byteOffset byte offset value
     * @param byteLength byte length of the bufferView
     * @param byteStride byte distance between conequential elements
     * @param name name of the buffer view
     * @returns bufferView for glTF
     */
    static _CreateBufferView(bufferIndex: number, byteOffset: number, byteLength: number, byteStride?: number, name?: string): IBufferView;
    /**
     * Creates an accessor based on the supplied arguments
     * @param bufferviewIndex The index of the bufferview referenced by this accessor
     * @param name The name of the accessor
     * @param type The type of the accessor
     * @param componentType The datatype of components in the attribute
     * @param count The number of attributes referenced by this accessor
     * @param byteOffset The offset relative to the start of the bufferView in bytes
     * @param min Minimum value of each component in this attribute
     * @param max Maximum value of each component in this attribute
     * @returns accessor for glTF
     */
    static _CreateAccessor(bufferviewIndex: number, name: string, type: AccessorType, componentType: AccessorComponentType, count: number, byteOffset: Nullable<number>, min: Nullable<number[]>, max: Nullable<number[]>): IAccessor;
    /**
     * Calculates the minimum and maximum values of an array of position floats
     * @param positions Positions array of a mesh
     * @param vertexStart Starting vertex offset to calculate min and max values
     * @param vertexCount Number of vertices to check for min and max values
     * @returns min number array and max number array
     */
    static _CalculateMinMaxPositions(positions: FloatArray, vertexStart: number, vertexCount: number): {
        min: number[];
        max: number[];
    };
    static _NormalizeTangentFromRef(tangent: Vector4 | Vector3): void;
    static _GetDataAccessorElementCount(accessorType: AccessorType): 1 | 3 | 2 | 4 | 9 | 16;
}
