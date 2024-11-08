import { BlockNodeData } from "./blockNodeData";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
import { NodeRenderGraphInputBlock } from "core/FrameGraph/Node/Blocks/inputBlock";
export const RegisterDefaultInput = (stateManager) => {
    stateManager.createDefaultInputData = (rootData, portData, nodeContainer) => {
        const point = portData.data;
        const pointName = "output";
        const globalState = rootData;
        if (point.type === NodeRenderGraphBlockConnectionPointTypes.AutoDetect) {
            return null;
        }
        const emittedBlock = new NodeRenderGraphInputBlock(NodeRenderGraphBlockConnectionPointTypes[point.type], globalState.nodeRenderGraph.frameGraph, globalState.scene, point.type);
        const nodeRenderGraph = globalState.nodeRenderGraph;
        nodeRenderGraph.attachedBlocks.push(emittedBlock);
        if (!emittedBlock.isInput) {
            emittedBlock.autoConfigure();
        }
        return {
            data: new BlockNodeData(emittedBlock, nodeContainer),
            name: pointName,
        };
    };
};
//# sourceMappingURL=registerDefaultInput.js.map