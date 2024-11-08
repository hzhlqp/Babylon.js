import { Sound } from "../../../../Audio/sound";
import { RichTypeAny } from "../../../flowGraphRichTypes";
import { FlowGraphExecutionBlockWithOutSignal } from "../../../flowGraphExecutionBlockWithOutSignal";
import { RegisterClass } from "../../../../Misc/typeStore";
/**
 * Stops an audio.
 * @experimental
 */
export class FlowGraphStopAudioBlock extends FlowGraphExecutionBlockWithOutSignal {
    constructor(config) {
        super(config);
        this.audio = this.registerDataInput("audio", RichTypeAny);
    }
    _execute(context, _callingSignal) {
        const audioValue = this.audio.getValue(context);
        if (audioValue instanceof Sound) {
            audioValue.stop();
        }
    }
    getClassName() {
        return "FGStopAudioBlock";
    }
}
RegisterClass("FGStopAudioBlock", FlowGraphStopAudioBlock);
//# sourceMappingURL=flowGraphStopAudioBlock.js.map