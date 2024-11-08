/**
 * A loader plugin to use MSFT_lod extension correctly (glTF)
 */
export class MSFTLodLoaderPlugin {
    onInit(loader, model) {
        this._model = model;
    }
    onExtensionLoaded(extension) {
        if (extension.name === "MSFT_lod" && this._model.configuration.loaderConfiguration) {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const MSFT_lod = extension;
            MSFT_lod.enabled = !!this._model.configuration.loaderConfiguration.progressiveLoading;
            MSFT_lod.maxLODsToLoad = this._model.configuration.loaderConfiguration.maxLODsToLoad || Number.MAX_VALUE;
        }
    }
}
//# sourceMappingURL=msftLodLoaderPlugin.js.map