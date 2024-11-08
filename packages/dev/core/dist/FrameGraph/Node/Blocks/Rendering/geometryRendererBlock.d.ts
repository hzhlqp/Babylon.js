import type { NodeRenderGraphConnectionPoint, Scene, NodeRenderGraphBuildState, FrameGraph } from "core/index";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { FrameGraphGeometryRendererTask } from "../../../Tasks/Rendering/geometryRendererTask";
/**
 * Block that render geometry of objects to a multi render target
 */
export declare class NodeRenderGraphGeometryRendererBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphGeometryRendererTask;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphGeometryRendererTask;
    /**
     * Create a new NodeRenderGraphGeometryRendererBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /** Indicates if depth testing must be enabled or disabled */
    get depthTest(): boolean;
    set depthTest(value: boolean);
    /** Indicates if depth writing must be enabled or disabled */
    get depthWrite(): boolean;
    set depthWrite(value: boolean);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get sizeInPercentage(): boolean;
    set sizeInPercentage(value: boolean);
    get samples(): number;
    set samples(value: number);
    viewDepthFormat: number;
    viewDepthType: number;
    screenDepthFormat: number;
    screenDepthType: number;
    viewNormalFormat: number;
    viewNormalType: number;
    worldNormalFormat: number;
    worldNormalType: number;
    localPositionFormat: number;
    localPositionType: number;
    worldPositionFormat: number;
    worldPositionType: number;
    albedoFormat: number;
    albedoType: number;
    reflectivityFormat: number;
    reflectivityType: number;
    velocityFormat: number;
    velocityType: number;
    linearVelocityFormat: number;
    linearVelocityType: number;
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the depth texture input component
     */
    get depth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the camera input component
     */
    get camera(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the objects input component
     */
    get objects(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output depth component
     */
    get outputDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry view depth component
     */
    get geomViewDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry screen depth component
     */
    get geomScreenDepth(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry view normal component
     */
    get geomViewNormal(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the world geometry normal component
     */
    get geomWorldNormal(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry local position component
     */
    get geomLocalPosition(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry world position component
     */
    get geomWorldPosition(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry albedo component
     */
    get geomAlbedo(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry reflectivity component
     */
    get geomReflectivity(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry velocity component
     */
    get geomVelocity(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the geometry linear velocity component
     */
    get geomLinearVelocity(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
    protected _dumpPropertiesCode(): string;
    serialize(): any;
    _deserialize(serializationObject: any): void;
}
