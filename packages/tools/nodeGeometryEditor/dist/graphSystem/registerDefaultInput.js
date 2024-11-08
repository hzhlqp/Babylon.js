import { BlockNodeData } from "./blockNodeData";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
import { GeometryInputBlock } from "core/Meshes/Node/Blocks/geometryInputBlock";
export const RegisterDefaultInput = (stateManager) => {
    stateManager.createDefaultInputData = (rootData, portData, nodeContainer) => {
        const point = portData.data;
        const pointName = "output";
        if (point.type === NodeGeometryBlockConnectionPointTypes.AutoDetect) {
            return null;
        }
        const emittedBlock = new GeometryInputBlock(NodeGeometryBlockConnectionPointTypes[point.type], point.type);
        const nodeGeometry = rootData.nodeGeometry;
        nodeGeometry.attachedBlocks.push(emittedBlock);
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