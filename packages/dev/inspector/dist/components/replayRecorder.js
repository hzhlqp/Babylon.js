import { SceneRecorder } from "core/Misc/sceneRecorder";
import { Tools } from "core/Misc/tools";
export class ReplayRecorder {
    constructor() {
        this._sceneRecorder = new SceneRecorder();
        this._isRecording = false;
    }
    get isRecording() {
        return this._isRecording;
    }
    cancel() {
        this._isRecording = false;
    }
    trackScene(scene) {
        this._sceneRecorder.track(scene);
        this._isRecording = true;
    }
    applyDelta(json, scene) {
        SceneRecorder.ApplyDelta(json, scene);
        this._isRecording = false;
    }
    export() {
        const content = JSON.stringify(this._sceneRecorder.getDelta());
        Tools.Download(new Blob([content]), "diff.json");
        this._isRecording = false;
    }
}
//# sourceMappingURL=replayRecorder.js.map