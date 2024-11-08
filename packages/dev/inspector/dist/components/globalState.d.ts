import type { IGLTFValidationResults } from "babylonjs-gltf2interface";
import type { Nullable } from "core/types";
import type { Observer } from "core/Misc/observable";
import { Observable } from "core/Misc/observable";
import type { ISceneLoaderPlugin, ISceneLoaderPluginAsync } from "core/Loading/sceneLoader";
import type { Scene } from "core/scene";
import type { Light } from "core/Lights/light";
import type { Camera } from "core/Cameras/camera";
import { LightGizmo } from "core/Gizmos/lightGizmo";
import { CameraGizmo } from "core/Gizmos/cameraGizmo";
import type { PropertyChangedEvent } from "./propertyChangedEvent";
import { ReplayRecorder } from "./replayRecorder";
import type { IGLTFLoaderExtension, GLTFFileLoader } from "loaders/glTF/index";
export declare class GlobalState {
    onSelectionChangedObservable: Observable<any>;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
    onInspectorClosedObservable: Observable<Scene>;
    onTabChangedObservable: Observable<number>;
    onSelectionRenamedObservable: Observable<void>;
    onPluginActivatedObserver: Nullable<Observer<ISceneLoaderPlugin | ISceneLoaderPluginAsync>>;
    onNewSceneObservable: Observable<Scene>;
    sceneImportDefaults: {
        [key: string]: any;
    };
    validationResults: Nullable<IGLTFValidationResults>;
    onValidationResultsUpdatedObservable: Observable<Nullable<IGLTFValidationResults>>;
    onExtensionLoadedObservable: Observable<IGLTFLoaderExtension>;
    glTFLoaderOverrideExtensionsConfig: boolean;
    glTFLoaderExtensionDefaults: {
        [name: string]: {
            [key: string]: any;
        };
    };
    glTFLoaderOverrideConfig: boolean;
    glTFLoaderDefaults: {
        [key: string]: any;
    };
    glTFLoaderExtensions: {
        [key: string]: IGLTFLoaderExtension;
    };
    blockMutationUpdates: boolean;
    selectedLineContainerTitles: Array<string>;
    selectedLineContainerTitlesNoFocus: Array<string>;
    recorder: ReplayRecorder;
    private _onlyUseEulers;
    get onlyUseEulers(): boolean;
    set onlyUseEulers(value: boolean);
    private _ignoreBackfacesForPicking;
    get ignoreBackfacesForPicking(): boolean;
    set ignoreBackfacesForPicking(value: boolean);
    init(propertyChangedObservable: Observable<PropertyChangedEvent>): void;
    prepareGLTFPlugin(loader: GLTFFileLoader): void;
    resetGLTFValidationResults(): void;
    lightGizmos: Array<LightGizmo>;
    enableLightGizmo(light: Light, enable?: boolean, gizmoCamera?: Nullable<Camera>): void;
    cameraGizmos: Array<CameraGizmo>;
    enableCameraGizmo(camera: Camera, enable?: boolean, gizmoCamera?: Nullable<Camera>): void;
    onSceneExplorerClosedObservable: Observable<void>;
    onActionTabsClosedObservable: Observable<void>;
}
