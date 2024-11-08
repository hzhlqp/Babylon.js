import { __decorate } from "tslib";
import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { RegisterClass } from "../../../../Misc/typeStore";
import { NodeRenderGraphBlockConnectionPointTypes } from "../../Types/nodeRenderGraphTypes";
import { editableInPropertyPage } from "../../../../Decorators/nodeDecorator";
import { FrameGraphBlurTask } from "core/FrameGraph/Tasks/PostProcesses/blurTask";
import { ThinBlurPostProcess } from "core/PostProcesses/thinBlurPostProcess";
import { Vector2 } from "core/Maths/math.vector";
/**
 * Block that implements the blur post process
 */
export class NodeRenderGraphBlurPostProcessBlock extends NodeRenderGraphBlock {
    /**
     * Gets the frame graph task associated with this block
     */
    get task() {
        return this._frameGraphTask;
    }
    /**
     * Create a new NodeRenderGraphBlurPostProcessBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph, scene);
        this.registerInput("source", NodeRenderGraphBlockConnectionPointTypes.Texture);
        this.registerInput("destination", NodeRenderGraphBlockConnectionPointTypes.Texture, true);
        this.registerOutput("output", NodeRenderGraphBlockConnectionPointTypes.BasedOnInput);
        this.source.addAcceptedConnectionPointTypes(NodeRenderGraphBlockConnectionPointTypes.TextureAllButBackBuffer);
        this.destination.addAcceptedConnectionPointTypes(NodeRenderGraphBlockConnectionPointTypes.TextureAll);
        this.output._typeConnectionSource = () => {
            return this.destination.isConnected ? this.destination : this.source;
        };
        this._frameGraphTask = new FrameGraphBlurTask(this.name, frameGraph, new ThinBlurPostProcess(name, scene.getEngine(), new Vector2(1, 0), 32));
    }
    /** Sampling mode used to sample from the source texture */
    get sourceSamplingMode() {
        return this._frameGraphTask.sourceSamplingMode;
    }
    set sourceSamplingMode(value) {
        this._frameGraphTask.sourceSamplingMode = value;
    }
    /** The direction in which to blur the image */
    get direction() {
        return this._frameGraphTask.postProcess.direction;
    }
    set direction(value) {
        this._frameGraphTask.postProcess.direction = value;
    }
    /** Length in pixels of the blur sample region */
    get kernel() {
        return this._frameGraphTask.postProcess.kernel;
    }
    set kernel(value) {
        this._frameGraphTask.postProcess.kernel = value;
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "NodeRenderGraphBlurPostProcessBlock";
    }
    /**
     * Gets the source input component
     */
    get source() {
        return this._inputs[0];
    }
    /**
     * Gets the destination input component
     */
    get destination() {
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
        this.output.value = this._frameGraphTask.outputTexture; // the value of the output connection point is the "output" texture of the task
        const sourceConnectedPoint = this.source.connectedPoint;
        if (sourceConnectedPoint) {
            this._frameGraphTask.sourceTexture = sourceConnectedPoint.value;
        }
        const destinationConnectedPoint = this.destination.connectedPoint;
        if (destinationConnectedPoint) {
            this._frameGraphTask.destinationTexture = destinationConnectedPoint.value;
        }
    }
    _dumpPropertiesCode() {
        const codes = [];
        codes.push(`${this._codeVariableName}.direction = new BABYLON.Vector2(${this.direction.x}, ${this.direction.y});`);
        codes.push(`${this._codeVariableName}.kernel = ${this.kernel};`);
        codes.push(`${this._codeVariableName}.sourceSamplingMode = ${this.sourceSamplingMode};`);
        return super._dumpPropertiesCode() + codes.join("\n");
    }
    serialize() {
        const serializationObject = super.serialize();
        serializationObject.direction = this.direction.asArray();
        serializationObject.kernel = this.kernel;
        serializationObject.sourceSamplingMode = this.sourceSamplingMode;
        return serializationObject;
    }
    _deserialize(serializationObject) {
        super._deserialize(serializationObject);
        this.direction.fromArray(serializationObject.direction);
        this.kernel = serializationObject.kernel;
        this.sourceSamplingMode = serializationObject.sourceSamplingMode;
    }
}
__decorate([
    editableInPropertyPage("Source sampling mode", 6 /* PropertyTypeForEdition.SamplingMode */, "PROPERTIES")
], NodeRenderGraphBlurPostProcessBlock.prototype, "sourceSamplingMode", null);
__decorate([
    editableInPropertyPage("Direction", 3 /* PropertyTypeForEdition.Vector2 */, "PROPERTIES")
], NodeRenderGraphBlurPostProcessBlock.prototype, "direction", null);
__decorate([
    editableInPropertyPage("Kernel", 2 /* PropertyTypeForEdition.Int */, "PROPERTIES", { min: 1, max: 256 })
], NodeRenderGraphBlurPostProcessBlock.prototype, "kernel", null);
RegisterClass("BABYLON.NodeRenderGraphBlurPostProcessBlock", NodeRenderGraphBlurPostProcessBlock);
//# sourceMappingURL=blurPostProcessBlock.js.map