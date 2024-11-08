import { NodeRenderGraphBlock } from "core/FrameGraph/Node/nodeRenderGraphBlock";
import { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
import { RegisterClass } from "core/Misc/typeStore";
import { FrameGraphGUITask } from "./guiTask";
/**
 * Block that implements a fullscreen GUI for render graph
 */
export class NodeRenderGraphGUIBlock extends NodeRenderGraphBlock {
    /**
     * Gets the frame graph task associated with this block
     */
    get task() {
        return this._frameGraphTask;
    }
    /**
     * Gets the GUI texture used by this block
     */
    get gui() {
        return this._frameGraphTask.gui;
    }
    /**
     * Create a new NodeRenderGraphGUIBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph, scene);
        this.registerInput("destination", NodeRenderGraphBlockConnectionPointTypes.Texture);
        this.registerOutput("output", NodeRenderGraphBlockConnectionPointTypes.BasedOnInput);
        this.destination.addAcceptedConnectionPointTypes(NodeRenderGraphBlockConnectionPointTypes.TextureAll);
        this.output._typeConnectionSource = this.destination;
        this._gui = AdvancedDynamicTexture.CreateFullscreenUI(this.name, undefined, {
            useStandalone: true,
        });
        this._frameGraphTask = new FrameGraphGUITask(this.name, frameGraph, this._gui);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "GUI.NodeRenderGraphGUIBlock";
    }
    /**
     * Gets the destination input component
     */
    get destination() {
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
        this.output.value = this._frameGraphTask.outputTexture; // the value of the output connection point is the "output" texture of the task
        const destinationConnectedPoint = this.destination.connectedPoint;
        if (destinationConnectedPoint) {
            this._frameGraphTask.destinationTexture = destinationConnectedPoint.value;
        }
    }
}
RegisterClass("BABYLON.GUI.NodeRenderGraphGUIBlock", NodeRenderGraphGUIBlock);
//# sourceMappingURL=renderGraphGUIBlock.js.map