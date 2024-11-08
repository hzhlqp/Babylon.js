import { Observable } from "core/Misc/observable";
import { DataStorage } from "core/Misc/dataStorage";
import { Color4 } from "core/Maths/math.color";
import { RegisterElbowSupport } from "./graphSystem/registerElbowSupport";
import { RegisterNodePortDesign } from "./graphSystem/registerNodePortDesign";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import { RegisterDefaultInput } from "./graphSystem/registerDefaultInput";
import { RegisterExportData } from "./graphSystem/registerExportData";
import { PreviewMode } from "./components/preview/previewMode";
import { RegisterDebugSupport } from "./graphSystem/registerDebugSupport";
export class GlobalState {
    get previewMode() {
        return this._previewMode;
    }
    set previewMode(value) {
        this._previewMode = value;
        DataStorage.WriteNumber("PreviewMode", value);
        this.onPreviewModeChanged.notifyObservers();
    }
    constructor() {
        this._previewMode = PreviewMode.Normal;
        this.onBuiltObservable = new Observable();
        this.onResetRequiredObservable = new Observable();
        this.onClearUndoStack = new Observable();
        this.onZoomToFitRequiredObservable = new Observable();
        this.onReOrganizedRequiredObservable = new Observable();
        this.onPreviewModeChanged = new Observable();
        this.onLogRequiredObservable = new Observable();
        this.onIsLoadingChanged = new Observable();
        this.onPreviewBackgroundChanged = new Observable();
        this.onFrame = new Observable();
        this.onAnimationCommandActivated = new Observable();
        this.onImportFrameObservable = new Observable();
        this.onPopupClosedObservable = new Observable();
        this.listOfCustomPreviewFiles = [];
        this.lockObject = new LockObject();
        this.pointerOverCanvas = false;
        this.onRefreshPreviewMeshControlComponentRequiredObservable = new Observable();
        this.onExportToGLBRequired = new Observable();
        this._previewMode = DataStorage.ReadNumber("PreviewMode", PreviewMode.Normal);
        this.stateManager = new StateManager();
        this.stateManager.data = this;
        this.stateManager.lockObject = this.lockObject;
        RegisterElbowSupport(this.stateManager);
        RegisterDebugSupport(this.stateManager);
        RegisterNodePortDesign(this.stateManager);
        RegisterDefaultInput(this.stateManager);
        RegisterExportData(this.stateManager);
        const r = DataStorage.ReadNumber("BackgroundColorR", 0.12549019607843137);
        const g = DataStorage.ReadNumber("BackgroundColorG", 0.09803921568627451);
        const b = DataStorage.ReadNumber("BackgroundColorB", 0.25098039215686274);
        this.backgroundColor = new Color4(r, g, b, 1.0);
    }
    storeEditorData(serializationObject, frame) {
        this.stateManager.storeEditorData(serializationObject, frame);
    }
}
//# sourceMappingURL=globalState.js.map