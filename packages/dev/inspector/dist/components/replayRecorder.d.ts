import type { Scene } from "core/scene";
export declare class ReplayRecorder {
    private _sceneRecorder;
    private _isRecording;
    get isRecording(): boolean;
    cancel(): void;
    trackScene(scene: Scene): void;
    applyDelta(json: any, scene: Scene): void;
    export(): void;
}
