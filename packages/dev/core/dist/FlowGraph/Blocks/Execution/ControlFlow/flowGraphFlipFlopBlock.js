import { FlowGraphExecutionBlock } from "core/FlowGraph/flowGraphExecutionBlock";
import { RichTypeBoolean } from "core/FlowGraph/flowGraphRichTypes";
import { RegisterClass } from "../../../../Misc/typeStore";
/**
 * @experimental
 * This block flip flops between two outputs.
 */
export class FlowGraphFlipFlopBlock extends FlowGraphExecutionBlock {
    constructor(config) {
        super(config);
        this.onOn = this._registerSignalOutput("onOn");
        this.onOff = this._registerSignalOutput("onOff");
        this.isOn = this.registerDataOutput("isOn", RichTypeBoolean);
    }
    _execute(context, _callingSignal) {
        let value = context._getExecutionVariable(this, "value", false);
        value = !value;
        context._setExecutionVariable(this, "value", value);
        this.isOn.setValue(value, context);
        if (value) {
            this.onOn._activateSignal(context);
        }
        else {
            this.onOff._activateSignal(context);
        }
    }
    /**
     * @returns class name of the block.
     */
    getClassName() {
        return "FGFlipFlopBlock";
    }
}
RegisterClass("FGFlipFlopBlock", FlowGraphFlipFlopBlock);
//# sourceMappingURL=flowGraphFlipFlopBlock.js.map