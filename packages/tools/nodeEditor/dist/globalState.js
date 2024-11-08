import { Observable } from "core/Misc/observable";
import { LogEntry } from "./components/log/logComponent";
import { PreviewType } from "./components/preview/previewType";
import { DataStorage } from "core/Misc/dataStorage";
import { Color4 } from "core/Maths/math.color";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { ParticleSystem } from "core/Particles/particleSystem";
import { RegisterElbowSupport } from "./graphSystem/registerElbowSupport";
import { RegisterNodePortDesign } from "./graphSystem/registerNodePortDesign";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import { RegisterDefaultInput } from "./graphSystem/registerDefaultInput";
import { RegisterExportData } from "./graphSystem/registerExportData";
import { RegisterDebugSupport } from "./graphSystem/registerDebugSupport";
import { SerializationTools } from "./serializationTools";
export class GlobalState {
    /** Gets the mode */
    get mode() {
        return this._mode;
    }
    /** Sets the mode */
    set mode(m) {
        DataStorage.WriteNumber("Mode", m);
        this._mode = m;
        this.stateManager.onPreviewCommandActivated.notifyObservers(true);
    }
    /** Gets the engine */
    get engine() {
        return this._engine;
    }
    /** Sets the engine */
    set engine(e) {
        if (e === this._engine) {
            return;
        }
        DataStorage.WriteNumber("Engine", e);
        this._engine = e;
        location.reload();
    }
    /**
     * Gets the current node material
     */
    get nodeMaterial() {
        return this._nodeMaterial;
    }
    /**
     * Sets the current node material
     */
    set nodeMaterial(nodeMaterial) {
        this._nodeMaterial = nodeMaterial;
        nodeMaterial.onBuildObservable.add(() => {
            this.onLogRequiredObservable.notifyObservers(new LogEntry("Node material build successful", false));
            SerializationTools.UpdateLocations(nodeMaterial, this);
            this.onBuiltObservable.notifyObservers();
        });
        nodeMaterial.onBuildErrorObservable.add((err) => {
            this.onLogRequiredObservable.notifyObservers(new LogEntry(err, true));
        });
    }
    constructor() {
        this.onBuiltObservable = new Observable();
        this.onResetRequiredObservable = new Observable();
        this.onClearUndoStack = new Observable();
        this.onZoomToFitRequiredObservable = new Observable();
        this.onReOrganizedRequiredObservable = new Observable();
        this.onLogRequiredObservable = new Observable();
        this.onIsLoadingChanged = new Observable();
        this.onLightUpdated = new Observable();
        this.onBackgroundHDRUpdated = new Observable();
        this.onPreviewBackgroundChanged = new Observable();
        this.onBackFaceCullingChanged = new Observable();
        this.onDepthPrePassChanged = new Observable();
        this.onAnimationCommandActivated = new Observable();
        this.onImportFrameObservable = new Observable();
        this.onPopupClosedObservable = new Observable();
        this.onDropEventReceivedObservable = new Observable();
        this.particleSystemBlendMode = ParticleSystem.BLENDMODE_ONEONE;
        this.listOfCustomPreviewFiles = [];
        this.lockObject = new LockObject();
        this.pointerOverCanvas = false;
        this.onRefreshPreviewMeshControlComponentRequiredObservable = new Observable();
        this.previewType = DataStorage.ReadNumber("PreviewType", PreviewType.Box);
        this.envType = DataStorage.ReadNumber("EnvType", PreviewType.Room);
        this.backFaceCulling = DataStorage.ReadBoolean("BackFaceCulling", true);
        this.depthPrePass = DataStorage.ReadBoolean("DepthPrePass", false);
        this.hemisphericLight = DataStorage.ReadBoolean("HemisphericLight", true);
        this.directionalLight0 = DataStorage.ReadBoolean("DirectionalLight0", false);
        this.directionalLight1 = DataStorage.ReadBoolean("DirectionalLight1", false);
        this.backgroundHDR = DataStorage.ReadBoolean("backgroundHDR", false);
        this.controlCamera = DataStorage.ReadBoolean("ControlCamera", true);
        this._mode = DataStorage.ReadNumber("Mode", NodeMaterialModes.Material);
        this._engine = DataStorage.ReadNumber("Engine", 0);
        this.stateManager = new StateManager();
        this.stateManager.data = this;
        this.stateManager.lockObject = this.lockObject;
        this.stateManager.getScene = () => this.nodeMaterial.getScene();
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