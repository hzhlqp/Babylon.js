import type { IBufferView, IAccessor, INode, IMaterial, ITexture, IImage, ISampler, IMeshPrimitive, IGLTF, ITextureInfo, ISkin } from "babylonjs-gltf2interface";
import { ImageMimeType, AccessorComponentType } from "babylonjs-gltf2interface";
import type { FloatArray, Nullable } from "core/types";
import { Vector3, Vector4 } from "core/Maths/math.vector";
import type { Node } from "core/node";
import { TransformNode } from "core/Meshes/transformNode";
import type { SubMesh } from "core/Meshes/subMesh";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Texture } from "core/Materials/Textures/texture";
import { Material } from "core/Materials/material";
import type { Scene } from "core/scene";
import type { IGLTFExporterExtensionV2 } from "./glTFExporterExtension";
import { _GLTFMaterialExporter } from "./glTFMaterialExporter";
import type { IExportOptions } from "./glTFSerializer";
import { GLTFData } from "./glTFData";
/**
 * Converts Babylon Scene into glTF 2.0.
 * @internal
 */
export declare class _Exporter {
    /**
     * Stores the glTF to export
     */
    _glTF: IGLTF;
    /**
     * Stores all generated buffer views, which represents views into the main glTF buffer data
     */
    _bufferViews: IBufferView[];
    /**
     * Stores all the generated accessors, which is used for accessing the data within the buffer views in glTF
     */
    _accessors: IAccessor[];
    /**
     * Stores all the generated nodes, which contains transform and/or mesh information per node
     */
    _nodes: INode[];
    /**
     * Stores all the generated glTF scenes, which stores multiple node hierarchies
     */
    private _scenes;
    /**
     * Stores all the generated glTF cameras
     */
    private _cameras;
    /**
     * Stores all the generated mesh information, each containing a set of primitives to render in glTF
     */
    private _meshes;
    /**
     * Stores all the generated material information, which represents the appearance of each primitive
     */
    _materials: IMaterial[];
    _materialMap: {
        [materialID: number]: number;
    };
    /**
     * Stores all the generated texture information, which is referenced by glTF materials
     */
    _textures: ITexture[];
    /**
     * Stores all the generated image information, which is referenced by glTF textures
     */
    _images: IImage[];
    /**
     * Stores all the texture samplers
     */
    _samplers: ISampler[];
    /**
     * Stores all the generated glTF skins
     */
    _skins: ISkin[];
    /**
     * Stores all the generated animation samplers, which is referenced by glTF animations
     */
    /**
     * Stores the animations for glTF models
     */
    private _animations;
    /**
     * Stores the total amount of bytes stored in the glTF buffer
     */
    private _totalByteLength;
    /**
     * Stores a reference to the Babylon scene containing the source geometry and material information
     */
    _babylonScene: Scene;
    /**
     * Stores a map of the image data, where the key is the file name and the value
     * is the image data
     */
    _imageData: {
        [fileName: string]: {
            data: ArrayBuffer;
            mimeType: ImageMimeType;
        };
    };
    private _orderedImageData;
    /**
     * Stores a map of the unique id of a node to its index in the node array
     */
    private _nodeMap;
    /**
     * Baked animation sample rate
     */
    private _animationSampleRate;
    private _options;
    private _localEngine;
    _glTFMaterialExporter: _GLTFMaterialExporter;
    private _extensions;
    private static _ExtensionNames;
    private static _ExtensionFactories;
    private _applyExtension;
    private _applyExtensions;
    _extensionsPreExportTextureAsync(context: string, babylonTexture: Nullable<Texture>, mimeType: ImageMimeType): Promise<Nullable<BaseTexture>>;
    _extensionsPostExportMeshPrimitiveAsync(context: string, meshPrimitive: IMeshPrimitive, babylonSubMesh: SubMesh, binaryWriter: _BinaryWriter): Promise<Nullable<IMeshPrimitive>>;
    _extensionsPostExportNodeAsync(context: string, node: Nullable<INode>, babylonNode: Node, nodeMap: {
        [key: number]: number;
    }, binaryWriter: _BinaryWriter): Promise<Nullable<INode>>;
    _extensionsPostExportMaterialAsync(context: string, material: Nullable<IMaterial>, babylonMaterial: Material): Promise<Nullable<IMaterial>>;
    _extensionsPostExportMaterialAdditionalTextures(context: string, material: IMaterial, babylonMaterial: Material): BaseTexture[];
    _extensionsPostExportTextures(context: string, textureInfo: ITextureInfo, babylonTexture: BaseTexture): void;
    private _forEachExtensions;
    private _extensionsOnExporting;
    /**
     * Load glTF serializer extensions
     */
    private _loadExtensions;
    /**
     * Creates a glTF Exporter instance, which can accept optional exporter options
     * @param babylonScene Babylon scene object
     * @param options Options to modify the behavior of the exporter
     */
    constructor(babylonScene?: Nullable<Scene>, options?: IExportOptions);
    dispose(): void;
    get options(): IExportOptions;
    /**
     * Registers a glTF exporter extension
     * @param name Name of the extension to export
     * @param factory The factory function that creates the exporter extension
     */
    static RegisterExtension(name: string, factory: (exporter: _Exporter) => IGLTFExporterExtensionV2): void;
    /**
     * Un-registers an exporter extension
     * @param name The name fo the exporter extension
     * @returns A boolean indicating whether the extension has been un-registered
     */
    static UnregisterExtension(name: string): boolean;
    private _reorderIndicesBasedOnPrimitiveMode;
    /**
     * Reorders the vertex attribute data based on the primitive mode.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param primitiveMode Primitive mode of the mesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    private _reorderVertexAttributeDataBasedOnPrimitiveMode;
    /**
     * Reorders the vertex attributes in the correct triangle mode order .  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    private _reorderTriangleFillMode;
    /**
     * Reorders the vertex attributes in the correct triangle strip order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    private _reorderTriangleStripDrawMode;
    /**
     * Reorders the vertex attributes in the correct triangle fan order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    private _reorderTriangleFanMode;
    /**
     * Writes the vertex attribute data to binary
     * @param vertices The vertices to write to the binary writer
     * @param byteOffset The offset into the binary writer to overwrite binary data
     * @param vertexAttributeKind The vertex attribute type
     * @param binaryWriter The writer containing the binary data
     */
    private _writeVertexAttributeData;
    /**
     * Writes mesh attribute data to a data buffer
     * Returns the bytelength of the data
     * @param vertexBufferKind Indicates what kind of vertex data is being passed in
     * @param attributeComponentKind
     * @param meshAttributeArray Array containing the attribute data
     * @param stride Specifies the space between data
     * @param binaryWriter The buffer to write the binary data to
     * @param babylonTransformNode
     */
    _writeAttributeData(vertexBufferKind: string, attributeComponentKind: AccessorComponentType, meshAttributeArray: FloatArray, stride: number, binaryWriter: _BinaryWriter, babylonTransformNode: TransformNode): void;
    private _createMorphTargetBufferViewKind;
    /**
     * Generates glTF json data
     * @param shouldUseGlb Indicates whether the json should be written for a glb file
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param prettyPrint Indicates whether the json file should be pretty printed (true) or not (false)
     * @returns json data as string
     */
    private _generateJSON;
    /**
     * Generates data for .gltf and .bin files based on the glTF prefix string
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param dispose Dispose the exporter
     * @returns GLTFData with glTF file data
     */
    _generateGLTFAsync(glTFPrefix: string, dispose?: boolean): Promise<GLTFData>;
    /**
     * Creates a binary buffer for glTF
     * @returns array buffer for binary data
     */
    private _generateBinaryAsync;
    /**
     * Pads the number to a multiple of 4
     * @param num number to pad
     * @returns padded number
     */
    private _getPadding;
    /**
     * @internal
     */
    _generateGLBAsync(glTFPrefix: string, dispose?: boolean): Promise<GLTFData>;
    /**
     * Sets the TRS for each node
     * @param node glTF Node for storing the transformation data
     * @param babylonTransformNode Babylon mesh used as the source for the transformation data
     */
    private _setNodeTransformation;
    private _setCameraTransformation;
    private _getVertexBufferFromMesh;
    /**
     * Creates a bufferview based on the vertices type for the Babylon mesh
     * @param kind Indicates the type of vertices data
     * @param attributeComponentKind Indicates the numerical type used to store the data
     * @param babylonTransformNode The Babylon mesh to get the vertices data from
     * @param binaryWriter The buffer to write the bufferview data to
     * @param byteStride
     */
    private _createBufferViewKind;
    /**
     * The primitive mode of the Babylon mesh
     * @param babylonMesh The BabylonJS mesh
     * @returns Unsigned integer of the primitive mode or null
     */
    private _getMeshPrimitiveMode;
    /**
     * Sets the primitive mode of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param primitiveMode The primitive mode
     */
    private _setPrimitiveMode;
    /**
     * Sets the vertex attribute accessor based of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param attributeKind vertex attribute
     */
    private _setAttributeKind;
    /**
     * Sets data for the primitive attributes of each submesh
     * @param mesh glTF Mesh object to store the primitive attribute information
     * @param babylonTransformNode Babylon mesh to get the primitive attribute data from
     * @param binaryWriter Buffer to write the attribute data to
     * @returns promise that resolves when done setting the primitive attributes
     */
    private _setPrimitiveAttributesAsync;
    /**
     * Creates a glTF scene based on the array of meshes
     * Returns the total byte offset
     * @param binaryWriter Buffer to write binary data to
     * @returns a promise that resolves when done
     */
    private _createSceneAsync;
    /**
     * Getting the nodes and materials that would be exported.
     * @param nodes Babylon transform nodes
     * @returns Set of materials which would be exported.
     */
    private _getExportNodes;
    /**
     * Creates a mapping of Node unique id to node index and handles animations
     * @param nodes Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    private _createNodeMapAndAnimationsAsync;
    /**
     * Creates a glTF node from a Babylon mesh
     * @param babylonNode Source Babylon mesh
     * @param binaryWriter Buffer for storing geometry data
     * @returns glTF node
     */
    private _createNodeAsync;
    /**
     * Creates a glTF skin from a Babylon skeleton
     * @param nodeMap Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    private _createSkinsAsync;
}
/**
 * @internal
 *
 * Stores glTF binary data.  If the array buffer byte length is exceeded, it doubles in size dynamically
 */
export declare class _BinaryWriter {
    /**
     * Array buffer which stores all binary data
     */
    private _arrayBuffer;
    /**
     * View of the array buffer
     */
    private _dataView;
    /**
     * byte offset of data in array buffer
     */
    private _byteOffset;
    /**
     * Initialize binary writer with an initial byte length
     * @param byteLength Initial byte length of the array buffer
     */
    constructor(byteLength: number);
    /**
     * Resize the array buffer to the specified byte length
     * @param byteLength The new byte length
     * @returns The resized array buffer
     */
    private _resizeBuffer;
    /**
     * Get an array buffer with the length of the byte offset
     * @returns ArrayBuffer resized to the byte offset
     */
    getArrayBuffer(): ArrayBuffer;
    /**
     * Get the byte offset of the array buffer
     * @returns byte offset
     */
    getByteOffset(): number;
    /**
     * Stores an UInt8 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    setUInt8(entry: number, byteOffset?: number): void;
    /**
     * Stores an UInt16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    setUInt16(entry: number, byteOffset?: number): void;
    /**
     * Gets an UInt32 in the array buffer
     * @param byteOffset If defined, specifies where to set the value as an offset.
     * @returns entry
     */
    getUInt32(byteOffset: number): number;
    getVector3Float32FromRef(vector3: Vector3, byteOffset: number): void;
    setVector3Float32FromRef(vector3: Vector3, byteOffset: number): void;
    getVector4Float32FromRef(vector4: Vector4, byteOffset: number): void;
    setVector4Float32FromRef(vector4: Vector4, byteOffset: number): void;
    /**
     * Stores a Float32 in the array buffer
     * @param entry
     * @param byteOffset
     */
    setFloat32(entry: number, byteOffset?: number): void;
    /**
     * Stores an UInt32 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    setUInt32(entry: number, byteOffset?: number): void;
    /**
     * Stores an Int16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    setInt16(entry: number, byteOffset?: number): void;
    /**
     * Stores a byte in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    setByte(entry: number, byteOffset?: number): void;
}
