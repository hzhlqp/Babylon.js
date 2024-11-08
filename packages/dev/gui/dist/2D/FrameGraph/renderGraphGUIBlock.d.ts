import { NodeRenderGraphBlock } from "core/FrameGraph/Node/nodeRenderGraphBlock";
import { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import type { Scene } from "core/scene";
import type { NodeRenderGraphConnectionPoint } from "core/FrameGraph/Node/nodeRenderGraphBlockConnectionPoint";
import type { NodeRenderGraphBuildState } from "core/FrameGraph/Node/nodeRenderGraphBuildState";
import { FrameGraphGUITask } from "./guiTask";
import type { FrameGraph } from "core/FrameGraph/frameGraph";
/**
 * Block that implements a fullscreen GUI for render graph
 */
export declare class NodeRenderGraphGUIBlock extends NodeRenderGraphBlock {
    protected _frameGraphTask: FrameGraphGUITask;
    protected _gui: AdvancedDynamicTexture;
    /**
     * Gets the frame graph task associated with this block
     */
    get task(): FrameGraphGUITask;
    /**
     * Gets the GUI texture used by this block
     */
    get gui(): AdvancedDynamicTexture;
    /**
     * Create a new NodeRenderGraphGUIBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name: string, frameGraph: FrameGraph, scene: Scene);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the destination input component
     */
    get destination(): NodeRenderGraphConnectionPoint;
    /**
     * Gets the output component
     */
    get output(): NodeRenderGraphConnectionPoint;
    protected _buildBlock(state: NodeRenderGraphBuildState): void;
}
