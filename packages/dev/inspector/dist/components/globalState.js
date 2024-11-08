/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line import/no-internal-modules
import { GLTFLoaderAnimationStartMode, GLTFLoaderCoordinateSystemMode } from "loaders/glTF/index";
import { Observable } from "core/Misc/observable";
import { LightGizmo } from "core/Gizmos/lightGizmo";
import { CameraGizmo } from "core/Gizmos/cameraGizmo";
import { ReplayRecorder } from "./replayRecorder";
import { DataStorage } from "core/Misc/dataStorage";
export class GlobalState {
    constructor() {
        this.onInspectorClosedObservable = new Observable();
        this.onTabChangedObservable = new Observable();
        this.onSelectionRenamedObservable = new Observable();
        this.onNewSceneObservable = new Observable();
        this.sceneImportDefaults = {};
        this.validationResults = null;
        this.onValidationResultsUpdatedObservable = new Observable();
        this.glTFLoaderOverrideExtensionsConfig = false;
        this.glTFLoaderExtensionDefaults = {
            MSFT_lod: { enabled: true, maxLODsToLoad: 10 },
            MSFT_minecraftMesh: { enabled: true },
            MSFT_sRGBFactors: { enabled: true },
            MSFT_audio_emitter: { enabled: true },
            KHR_xmp_json_ld: { enabled: true },
            KHR_draco_mesh_compression: { enabled: true },
            KHR_mesh_quantization: { enabled: true },
            KHR_materials_pbrSpecularGlossiness: { enabled: true },
            KHR_materials_clearcoat: { enabled: true },
            KHR_materials_iridescence: { enabled: true },
            KHR_materials_anisotropy: { enabled: true },
            KHR_materials_emissive_strength: { enabled: true },
            KHR_materials_ior: { enabled: true },
            KHR_materials_sheen: { enabled: true },
            KHR_materials_specular: { enabled: true },
            KHR_materials_unlit: { enabled: true },
            KHR_materials_variants: { enabled: true },
            KHR_materials_transmission: { enabled: true },
            KHR_materials_diffuse_transmission: { enabled: true },
            KHR_materials_volume: { enabled: true },
            KHR_materials_dispersion: { enabled: true },
            KHR_lights_punctual: { enabled: true },
            KHR_texture_basisu: { enabled: true },
            KHR_texture_transform: { enabled: true },
            EXT_lights_image_based: { enabled: true },
            EXT_mesh_gpu_instancing: { enabled: true },
            EXT_texture_webp: { enabled: true },
            EXT_texture_avif: { enabled: true },
        };
        this.glTFLoaderOverrideConfig = false;
        this.glTFLoaderDefaults = {
            alwaysComputeBoundingBox: false,
            alwaysComputeSkeletonRootNode: false,
            animationStartMode: typeof GLTFLoaderAnimationStartMode !== "undefined" ? GLTFLoaderAnimationStartMode.FIRST : 1,
            capturePerformanceCounters: false,
            compileMaterials: false,
            compileShadowGenerators: false,
            coordinateSystemMode: typeof GLTFLoaderCoordinateSystemMode !== "undefined" ? GLTFLoaderCoordinateSystemMode.AUTO : 0,
            createInstances: true,
            loadAllMaterials: false,
            loggingEnabled: false,
            targetFps: 60,
            transparencyAsCoverage: false,
            useClipPlane: false,
            useSRGBBuffers: true,
        };
        this.glTFLoaderExtensions = {};
        this.blockMutationUpdates = false;
        this.selectedLineContainerTitles = [];
        this.selectedLineContainerTitlesNoFocus = [];
        this.recorder = new ReplayRecorder();
        this._onlyUseEulers = null;
        this._ignoreBackfacesForPicking = null;
        // Light gizmos
        this.lightGizmos = [];
        // Camera gizmos
        this.cameraGizmos = [];
        this.onSceneExplorerClosedObservable = new Observable();
        this.onActionTabsClosedObservable = new Observable();
    }
    get onlyUseEulers() {
        if (this._onlyUseEulers === null) {
            this._onlyUseEulers = DataStorage.ReadBoolean("settings_onlyUseEulers", true);
        }
        return this._onlyUseEulers;
    }
    set onlyUseEulers(value) {
        this._onlyUseEulers = value;
        DataStorage.WriteBoolean("settings_onlyUseEulers", value);
    }
    get ignoreBackfacesForPicking() {
        if (this._ignoreBackfacesForPicking === null) {
            this._ignoreBackfacesForPicking = DataStorage.ReadBoolean("settings_ignoreBackfacesForPicking", false);
        }
        return this._ignoreBackfacesForPicking;
    }
    set ignoreBackfacesForPicking(value) {
        this._ignoreBackfacesForPicking = value;
        DataStorage.WriteBoolean("settings_ignoreBackfacesForPicking", value);
    }
    init(propertyChangedObservable) {
        this.onPropertyChangedObservable = propertyChangedObservable;
        this.onNewSceneObservable.add(() => {
            this.recorder.cancel();
        });
    }
    prepareGLTFPlugin(loader) {
        this.glTFLoaderExtensions = {};
        if (this.glTFLoaderOverrideConfig) {
            const loaderState = this.glTFLoaderDefaults;
            if (loaderState !== undefined) {
                for (const key in loaderState) {
                    loader[key] = loaderState[key];
                }
            }
        }
        loader.onExtensionLoadedObservable.add((extension) => {
            if (this.glTFLoaderOverrideExtensionsConfig) {
                const extensionState = this.glTFLoaderExtensionDefaults[extension.name];
                if (extensionState !== undefined) {
                    for (const key in extensionState) {
                        extension[key] = extensionState[key];
                    }
                }
            }
            this.glTFLoaderExtensions[extension.name] = extension;
        });
        loader.onValidatedObservable.add((results) => {
            this.validationResults = results;
            this.onValidationResultsUpdatedObservable.notifyObservers(results);
            if (results.issues.numErrors || results.issues.numWarnings) {
                this.selectedLineContainerTitlesNoFocus.push("GLTF VALIDATION");
                this.onTabChangedObservable.notifyObservers(3);
            }
        });
    }
    resetGLTFValidationResults() {
        if (this.validationResults) {
            this.validationResults = null;
            this.onValidationResultsUpdatedObservable.notifyObservers(null);
        }
    }
    enableLightGizmo(light, enable = true, gizmoCamera = null) {
        if (enable) {
            if (!light.reservedDataStore) {
                light.reservedDataStore = {};
            }
            if (!light.reservedDataStore.lightGizmo) {
                light.reservedDataStore.lightGizmo = new LightGizmo();
                this.lightGizmos.push(light.reservedDataStore.lightGizmo);
                light.reservedDataStore.lightGizmo.light = light;
                light.reservedDataStore.lightGizmo.material.reservedDataStore = { hidden: true };
                if (gizmoCamera) {
                    light.reservedDataStore.lightGizmo.gizmoLayer.setRenderCamera(gizmoCamera);
                }
            }
        }
        else if (light.reservedDataStore && light.reservedDataStore.lightGizmo) {
            this.lightGizmos.splice(this.lightGizmos.indexOf(light.reservedDataStore.lightGizmo), 1);
            light.reservedDataStore.lightGizmo.dispose();
            light.reservedDataStore.lightGizmo = null;
        }
    }
    enableCameraGizmo(camera, enable = true, gizmoCamera = null) {
        if (enable) {
            if (!camera.reservedDataStore) {
                camera.reservedDataStore = {};
            }
            if (!camera.reservedDataStore.cameraGizmo) {
                camera.reservedDataStore.cameraGizmo = new CameraGizmo();
                this.cameraGizmos.push(camera.reservedDataStore.cameraGizmo);
                camera.reservedDataStore.cameraGizmo.camera = camera;
                camera.reservedDataStore.cameraGizmo.material.reservedDataStore = { hidden: true };
                if (gizmoCamera) {
                    camera.reservedDataStore.cameraGizmo.gizmoLayer.setRenderCamera(gizmoCamera);
                }
            }
        }
        else if (camera.reservedDataStore && camera.reservedDataStore.cameraGizmo) {
            this.cameraGizmos.splice(this.cameraGizmos.indexOf(camera.reservedDataStore.cameraGizmo), 1);
            camera.reservedDataStore.cameraGizmo.dispose();
            camera.reservedDataStore.cameraGizmo = null;
        }
    }
}
//# sourceMappingURL=globalState.js.map