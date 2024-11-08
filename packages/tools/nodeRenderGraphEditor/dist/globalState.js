import { Observable } from "core/Misc/observable";
import { LogEntry } from "./components/log/logComponent";
import { DataStorage } from "core/Misc/dataStorage";
import { RegisterElbowSupport } from "./graphSystem/registerElbowSupport";
import { RegisterNodePortDesign } from "./graphSystem/registerNodePortDesign";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
import { RegisterDefaultInput } from "./graphSystem/registerDefaultInput";
import { RegisterExportData } from "./graphSystem/registerExportData";
import { RegisterDebugSupport } from "./graphSystem/registerDebugSupport";
import { PreviewType } from "./components/preview/previewType";
import { SerializationTools } from "./serializationTools";
export class GlobalState {
    /**
     * Gets the current node render graph
     */
    get nodeRenderGraph() {
        return this._nodeRenderGraph;
    }
    /**
     * Sets the current node material
     */
    set nodeRenderGraph(nodeRenderGraph) {
        this._nodeRenderGraph = nodeRenderGraph;
        nodeRenderGraph.onBuildObservable.add(() => {
            this.onLogRequiredObservable.notifyObservers(new LogEntry("Node render graph build successful", false));
            SerializationTools.UpdateLocations(nodeRenderGraph, this);
            this.onBuiltObservable.notifyObservers();
        });
        nodeRenderGraph.onBuildErrorObservable.add((err) => {
            this.onLogRequiredObservable.notifyObservers(new LogEntry(err, true));
        });
    }
    constructor(scene) {
        this.onBuiltObservable = new Observable();
        this.onResetRequiredObservable = new Observable();
        this.onZoomToFitRequiredObservable = new Observable();
        this.onReOrganizedRequiredObservable = new Observable();
        this.onLogRequiredObservable = new Observable();
        this.onIsLoadingChanged = new Observable();
        this.onLightUpdated = new Observable();
        this.onFrame = new Observable();
        this.onAnimationCommandActivated = new Observable();
        this.onImportFrameObservable = new Observable();
        this.onPopupClosedObservable = new Observable();
        this.onDropEventReceivedObservable = new Observable();
        this.listOfCustomPreviewFiles = [];
        this.lockObject = new LockObject();
        this.pointerOverCanvas = false;
        this.onRefreshPreviewMeshControlComponentRequiredObservable = new Observable();
        this.scene = scene;
        this.stateManager = new StateManager();
        this.stateManager.data = this;
        this.stateManager.lockObject = this.lockObject;
        this.previewType = DataStorage.ReadNumber("PreviewType", PreviewType.Box);
        this.envType = DataStorage.ReadNumber("EnvType", PreviewType.Room);
        this.hemisphericLight = DataStorage.ReadBoolean("HemisphericLight", false);
        this.directionalLight0 = DataStorage.ReadBoolean("DirectionalLight0", false);
        this.directionalLight1 = DataStorage.ReadBoolean("DirectionalLight1", false);
        RegisterElbowSupport(this.stateManager);
        RegisterDebugSupport(this.stateManager);
        RegisterNodePortDesign(this.stateManager);
        RegisterDefaultInput(this.stateManager);
        RegisterExportData(this.stateManager);
    }
    storeEditorData(serializationObject, frame) {
        this.stateManager.storeEditorData(serializationObject, frame);
    }
}
//# sourceMappingURL=globalState.js.map