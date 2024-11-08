import { Observable } from "core/Misc/observable";
export class ObservablesManager {
    constructor() {
        this.onSceneInitObservable = new Observable(undefined, true);
        this.onEngineInitObservable = new Observable(undefined, true);
        this.onModelLoadedObservable = new Observable();
        this.onModelLoadProgressObservable = new Observable();
        this.onModelLoadErrorObservable = new Observable();
        this.onModelAddedObservable = new Observable();
        this.onModelRemovedObservable = new Observable();
        this.onViewerInitDoneObservable = new Observable(undefined, true);
        this.onViewerInitStartedObservable = new Observable(undefined, true);
        this.onLoaderInitObservable = new Observable(undefined, true);
        this.onFrameRenderedObservable = new Observable();
        this.onEnteringVRObservable = new Observable();
        this.onExitingVRObservable = new Observable();
    }
    dispose() {
        this.onSceneInitObservable.clear();
        this.onEngineInitObservable.clear();
        this.onModelLoadedObservable.clear();
        this.onModelLoadProgressObservable.clear();
        this.onModelLoadErrorObservable.clear();
        this.onModelAddedObservable.clear();
        this.onModelRemovedObservable.clear();
        this.onViewerInitDoneObservable.clear();
        this.onLoaderInitObservable.clear();
        this.onFrameRenderedObservable.clear();
        this.onEnteringVRObservable.clear();
        this.onExitingVRObservable.clear();
    }
}
//# sourceMappingURL=observablesManager.js.map