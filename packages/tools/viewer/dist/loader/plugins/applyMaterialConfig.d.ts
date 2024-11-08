import type { ViewerModel } from "../../model/viewerModel";
import type { ILoaderPlugin } from "./loaderPlugin";
import type { ISceneLoaderPlugin, ISceneLoaderPluginAsync } from "core/Loading/sceneLoader";
import type { Material } from "core/Materials/material";
/**
 * Force-apply material configuration right after a material was loaded.
 */
export declare class ApplyMaterialConfigPlugin implements ILoaderPlugin {
    private _model;
    onInit(loader: ISceneLoaderPlugin | ISceneLoaderPluginAsync, model: ViewerModel): void;
    onMaterialLoaded(material: Material): void;
}
