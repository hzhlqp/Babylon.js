import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { Engine } from "core/Engines/engine";
import type { ISceneLoaderProgressEvent, ISceneLoaderPlugin, ISceneLoaderPluginAsync } from "core/Loading/sceneLoader";
import type { ViewerModel } from "../model/viewerModel";
export declare class ObservablesManager {
    /**
     * Will notify when the scene was initialized
     */
    onSceneInitObservable: Observable<Scene>;
    /**
     * will notify when the engine was initialized
     */
    onEngineInitObservable: Observable<Engine>;
    /**
     * Will notify when a new model was added to the scene.
     * Note that added does not necessarily mean loaded!
     */
    onModelAddedObservable: Observable<ViewerModel>;
    /**
     * will notify after every model load
     */
    onModelLoadedObservable: Observable<ViewerModel>;
    /**
     * will notify when any model notify of progress
     */
    onModelLoadProgressObservable: Observable<ISceneLoaderProgressEvent>;
    /**
     * will notify when any model load failed.
     */
    onModelLoadErrorObservable: Observable<{
        message: string;
        exception: any;
    }>;
    /**
     * Will notify when a model was removed from the scene;
     */
    onModelRemovedObservable: Observable<ViewerModel>;
    /**
     * will notify when a new loader was initialized.
     * Used mainly to know when a model starts loading.
     */
    onLoaderInitObservable: Observable<ISceneLoaderPlugin | ISceneLoaderPluginAsync>;
    /**
     * Observers registered here will be executed when the entire load process has finished.
     */
    onViewerInitDoneObservable: Observable<any>;
    /**
     * Will notify when the viewer init started (after configuration was loaded)
     */
    onViewerInitStartedObservable: Observable<any>;
    /**
     * Functions added to this observable will be executed on each frame rendered.
     */
    onFrameRenderedObservable: Observable<any>;
    /**
     * Will notify when VR mode is entered.
     */
    onEnteringVRObservable: Observable<any>;
    /**
     * Will notify when VR mode is exited.
     */
    onExitingVRObservable: Observable<any>;
    constructor();
    dispose(): void;
}
