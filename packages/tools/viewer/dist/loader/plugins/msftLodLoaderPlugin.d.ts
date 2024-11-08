import type { ISceneLoaderPlugin, ISceneLoaderPluginAsync } from "core/Loading/sceneLoader";
import type { IGLTFLoaderExtension } from "loaders/glTF/2.0/glTFLoaderExtension";
import type { ViewerModel } from "../../model/viewerModel";
import type { ILoaderPlugin } from "./loaderPlugin";
/**
 * A loader plugin to use MSFT_lod extension correctly (glTF)
 */
export declare class MSFTLodLoaderPlugin implements ILoaderPlugin {
    private _model;
    onInit(loader: ISceneLoaderPlugin | ISceneLoaderPluginAsync, model: ViewerModel): void;
    onExtensionLoaded(extension: IGLTFLoaderExtension): void;
}
