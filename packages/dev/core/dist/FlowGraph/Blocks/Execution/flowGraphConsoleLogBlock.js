import { FlowGraphExecutionBlockWithOutSignal } from "../../flowGraphExecutionBlockWithOutSignal";
import { RichTypeAny } from "../../flowGraphRichTypes";
import { RegisterClass } from "../../../Misc/typeStore";
import { Logger } from "core/Misc/logger";
/**
 * @experimental
 * Block that logs a message to the console.
 */
export class FlowGraphConsoleLogBlock extends FlowGraphExecutionBlockWithOutSignal {
    constructor(config) {
        super(config);
        this.message = this.registerDataInput("message", RichTypeAny);
    }
    /**
     * @internal
     */
    _execute(context) {
        const messageValue = this.message.getValue(context);
        Logger.Log(messageValue);
        // activate the output flow block
        this.out._activateSignal(context);
    }
    /**
     * @returns class name of the block.
     */
    getClassName() {
        return FlowGraphConsoleLogBlock.ClassName;
    }
}
/**
 * the class name of the block.
 */
FlowGraphConsoleLogBlock.ClassName = "FGConsoleLogBlock";
RegisterClass(FlowGraphConsoleLogBlock.ClassName, FlowGraphConsoleLogBlock);
//# sourceMappingURL=flowGraphConsoleLogBlock.js.map