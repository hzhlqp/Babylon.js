/**
 * Force-apply material configuration right after a material was loaded.
 */
export class ApplyMaterialConfigPlugin {
    onInit(loader, model) {
        this._model = model;
    }
    onMaterialLoaded(material) {
        this._model && this._model._applyModelMaterialConfiguration(material);
    }
}
//# sourceMappingURL=applyMaterialConfig.js.map