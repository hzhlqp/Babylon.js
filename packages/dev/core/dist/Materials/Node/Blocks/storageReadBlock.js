import { NodeMaterialBlock } from "../nodeMaterialBlock";
import { NodeMaterialBlockConnectionPointTypes } from "../Enums/nodeMaterialBlockConnectionPointTypes";
import { NodeMaterialBlockTargets } from "../Enums/nodeMaterialBlockTargets";
import { RegisterClass } from "../../../Misc/typeStore";
import { LoopBlock } from "./loopBlock";
import { NodeMaterialConnectionPointCustomObject } from "../nodeMaterialConnectionPointCustomObject";
/**
 * Block used to read from a variable within a loop
 */
export class StorageReadBlock extends NodeMaterialBlock {
    /**
     * Creates a new StorageReadBlock
     * @param name defines the block name
     */
    constructor(name) {
        super(name, NodeMaterialBlockTargets.Neutral);
        this.registerInput("loopID", NodeMaterialBlockConnectionPointTypes.Object, false, undefined, new NodeMaterialConnectionPointCustomObject("loopID", this, 0 /* NodeMaterialConnectionPointDirection.Input */, LoopBlock, "LoopBlock"));
        this.registerOutput("value", NodeMaterialBlockConnectionPointTypes.AutoDetect);
        this._outputs[0]._linkedConnectionSource = this._inputs[0];
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "StorageReadBlock";
    }
    /**
     * Gets the loop link component
     */
    get loopID() {
        return this._inputs[0];
    }
    /**
     * Gets the value component
     */
    get value() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        const value = this.value;
        if (!this.loopID.isConnected) {
            return this;
        }
        const loopBlock = this.loopID.connectedPoint.ownerBlock;
        state.compilationString += state._declareOutput(value) + ` = ${loopBlock.output.associatedVariableName};\n`;
        return this;
    }
}
RegisterClass("BABYLON.StorageReadBlock", StorageReadBlock);
//# sourceMappingURL=storageReadBlock.js.map