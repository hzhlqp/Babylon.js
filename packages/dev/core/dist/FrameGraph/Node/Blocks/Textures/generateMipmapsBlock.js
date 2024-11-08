import { NodeRenderGraphBlock } from "../../nodeRenderGraphBlock";
import { RegisterClass } from "../../../../Misc/typeStore";
import { NodeRenderGraphBlockConnectionPointTypes } from "../../Types/nodeRenderGraphTypes";
import { FrameGraphGenerateMipMapsTask } from "../../../Tasks/Texture/generateMipMapsTask";
/**
 * Block used to generate mipmaps for a texture
 */
export class NodeRenderGraphGenerateMipmapsBlock extends NodeRenderGraphBlock {
    /**
     * Gets the frame graph task associated with this block
     */
    get task() {
        return this._frameGraphTask;
    }
    /**
     * Create a new NodeRenderGraphGenerateMipmapsBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph, scene);
        this.registerInput("texture", NodeRenderGraphBlockConnectionPointTypes.Texture);
        this.registerOutput("output", NodeRenderGraphBlockConnectionPointTypes.BasedOnInput);
        this.texture.addAcceptedConnectionPointTypes(NodeRenderGraphBlockConnectionPointTypes.TextureAllButBackBuffer);
        this.output._typeConnectionSource = this.texture;
        this._frameGraphTask = new FrameGraphGenerateMipMapsTask(name, frameGraph);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "NodeRenderGraphGenerateMipmapsBlock";
    }
    /**
     * Gets the texture input component
     */
    get texture() {
        return this._inputs[0];
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
        this._propagateInputValueToOutput(this.texture, this.output);
        const textureConnectedPoint = this.texture.connectedPoint;
        if (textureConnectedPoint) {
            this._frameGraphTask.destinationTexture = textureConnectedPoint.value;
        }
    }
}
RegisterClass("BABYLON.NodeRenderGraphGenerateMipmapsBlock", NodeRenderGraphGenerateMipmapsBlock);
//# sourceMappingURL=generateMipmapsBlock.js.map