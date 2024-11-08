import { telemetryManager } from "../../managers/telemetryManager";
import { PrecisionDate } from "core/Misc/precisionDate";
export class TelemetryLoaderPlugin {
    onInit(loader, model) {
        this._model = model;
        this._loadStart = PrecisionDate.Now;
    }
    onLoaded(model) {
        telemetryManager.broadcast("Model Loaded", model.getViewerId(), {
            model: model,
            loadTime: PrecisionDate.Now - this._loadStart,
        });
        telemetryManager.flushWebGLErrors(model.rootMesh.getEngine(), model.getViewerId());
    }
    onError() {
        this._loadEnd = PrecisionDate.Now;
        telemetryManager.broadcast("Load Error", this._model.getViewerId(), {
            model: this._model,
            loadTime: this._loadEnd - this._loadStart,
        });
        telemetryManager.flushWebGLErrors(this._model.rootMesh.getEngine(), this._model.getViewerId());
    }
    onComplete() {
        this._loadEnd = PrecisionDate.Now;
        telemetryManager.broadcast("Load Complete", this._model.getViewerId(), {
            model: this._model,
            loadTime: this._loadEnd - this._loadStart,
        });
        telemetryManager.flushWebGLErrors(this._model.rootMesh.getEngine(), this._model.getViewerId());
    }
}
//# sourceMappingURL=telemetryLoaderPlugin.js.map