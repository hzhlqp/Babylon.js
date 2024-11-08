import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { RegisterClass } from "../../../../Misc/typeStore";
import { NodeRenderGraphBlockConnectionPointTypes } from "../../Types/nodeRenderGraphTypes";
import { FrameGraphCullObjectsTask } from "../../../Tasks/Rendering/cullObjectsTask";
/**
 * Block that culls a list of objects
 */
export class NodeRenderGraphCullObjectsBlock extends NodeRenderGraphBlock {
    /**
     * Gets the frame graph task associated with this block
     */
    get task() {
        return this._frameGraphTask;
    }
    /**
     * Create a new NodeRenderGraphCullObjectsBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph, scene);
        this.registerInput("camera", NodeRenderGraphBlockConnectionPointTypes.Camera);
        this.registerInput("objects", NodeRenderGraphBlockConnectionPointTypes.ObjectList);
        this.registerOutput("output", NodeRenderGraphBlockConnectionPointTypes.ObjectList);
        this._frameGraphTask = new FrameGraphCullObjectsTask(this.name, frameGraph, scene);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "NodeRenderGraphCullObjectsBlock";
    }
    /**
     * Gets the camera input component
     */
    get camera() {
        return this._inputs[0];
    }
    /**
     * Gets the objects input component
     */
    get objects() {
        return this._inputs[1];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        this._frameGraphTask.name = this.name;
        this.output.value = this._frameGraphTask.outputObjectList;
        const cameraConnectedPoint = this.camera.connectedPoint;
        if (cameraConnectedPoint) {
            this._frameGraphTask.camera = cameraConnectedPoint.value;
        }
        const objectsConnectedPoint = this.objects.connectedPoint;
        if (objectsConnectedPoint) {
            this._frameGraphTask.objectList = objectsConnectedPoint.value;
        }
    }
    _dumpPropertiesCode() {
        const codes = [];
        return super._dumpPropertiesCode() + codes.join("\n");
    }
    serialize() {
        const serializationObject = super.serialize();
        return serializationObject;
    }
    _deserialize(serializationObject) {
        super._deserialize(serializationObject);
    }
}
RegisterClass("BABYLON.NodeRenderGraphCullObjectsBlock", NodeRenderGraphCullObjectsBlock);
//# sourceMappingURL=cullObjectsBlock.js.map