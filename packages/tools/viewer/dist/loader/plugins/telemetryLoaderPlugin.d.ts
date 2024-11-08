import type { ILoaderPlugin } from "./loaderPlugin";
import type { ViewerModel } from "../../model/viewerModel";
import type { ISceneLoaderPlugin, ISceneLoaderPluginAsync } from "core/Loading/sceneLoader";
export declare class TelemetryLoaderPlugin implements ILoaderPlugin {
    private _model;
    private _loadStart;
    private _loadEnd;
    onInit(loader: ISceneLoaderPlugin | ISceneLoaderPluginAsync, model: ViewerModel): void;
    onLoaded(model: ViewerModel): void;
    onError(): void;
    onComplete(): void;
}
