import { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import { BlockNodeData } from "./blockNodeData";
export const RegisterDefaultInput = (stateManager) => {
    stateManager.createDefaultInputData = (rootData, portData, nodeContainer) => {
        const point = portData.data;
        const customInputBlock = point.createCustomInputBlock();
        let pointName = "output";
        let emittedBlock;
        if (!customInputBlock) {
            if (point.type === NodeMaterialBlockConnectionPointTypes.AutoDetect) {
                return null;
            }
            emittedBlock = new InputBlock(NodeMaterialBlockConnectionPointTypes[point.type], undefined, point.type);
        }
        else {
            [emittedBlock, pointName] = customInputBlock;
        }
        const nodeMaterial = rootData.nodeMaterial;
        nodeMaterial.attachedBlocks.push(emittedBlock);
        if (!emittedBlock.isInput) {
            emittedBlock.autoConfigure(nodeMaterial);
        }
        return {
            data: new BlockNodeData(emittedBlock, nodeContainer),
            name: pointName,
        };
    };
};
//# sourceMappingURL=registerDefaultInput.js.map