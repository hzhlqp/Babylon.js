import { Engine } from "core/Engines/engine";
import { SceneLoader } from "core/Loading/sceneLoader";
import { RenderingManager } from "core/Rendering/renderingManager";
import { Tools } from "core/Misc/tools";
import { Effect } from "core/Materials/effect";
import { processConfigurationCompatibility } from "../configuration/configurationCompatibility";
import { ConfigurationContainer } from "../configuration/configurationContainer";
import { viewerGlobals } from "../configuration/globals";
import { RenderOnlyConfigurationLoader } from "../configuration/renderOnlyLoader";
// eslint-disable-next-line import/no-internal-modules
import { deepmerge } from "../helper/index";
import { ModelLoader } from "../loader/modelLoader";
import { ObservablesManager } from "../managers/observablesManager";
import { SceneManager } from "../managers/sceneManager";
import { telemetryManager } from "../managers/telemetryManager";
import { viewerManager } from "./viewerManager";
import "core/Misc/observable.extensions";
import { Logger } from "core/Misc/logger";
/**
 * The AbstractViewer is the center of Babylon's viewer.
 * It is the basic implementation of the default viewer and is responsible of loading and showing the model and the templates
 */
export class AbstractViewer {
    // observables
    /**
     * Will notify when the scene was initialized
     */
    get onSceneInitObservable() {
        return this.observablesManager.onSceneInitObservable;
    }
    /**
     * will notify when the engine was initialized
     */
    get onEngineInitObservable() {
        return this.observablesManager.onEngineInitObservable;
    }
    /**
     * Will notify when a new model was added to the scene.
     * Note that added does not necessarily mean loaded!
     */
    get onModelAddedObservable() {
        return this.observablesManager.onModelAddedObservable;
    }
    /**
     * will notify after every model load
     */
    get onModelLoadedObservable() {
        return this.observablesManager.onModelLoadedObservable;
    }
    /**
     * will notify when any model notify of progress
     */
    get onModelLoadProgressObservable() {
        return this.observablesManager.onModelLoadProgressObservable;
    }
    /**
     * will notify when any model load failed.
     */
    get onModelLoadErrorObservable() {
        return this.observablesManager.onModelLoadErrorObservable;
    }
    /**
     * Will notify when a model was removed from the scene;
     */
    get onModelRemovedObservable() {
        return this.observablesManager.onModelRemovedObservable;
    }
    /**
     * will notify when a new loader was initialized.
     * Used mainly to know when a model starts loading.
     */
    get onLoaderInitObservable() {
        return this.observablesManager.onLoaderInitObservable;
    }
    /**
     * Observers registered here will be executed when the entire load process has finished.
     */
    get onInitDoneObservable() {
        return this.observablesManager.onViewerInitDoneObservable;
    }
    /**
     * Functions added to this observable will be executed on each frame rendered.
     */
    get onFrameRenderedObservable() {
        return this.observablesManager.onFrameRenderedObservable;
    }
    /**
     * Observers registered here will be executed when VR more is entered.
     */
    get onEnteringVRObservable() {
        return this.observablesManager.onEnteringVRObservable;
    }
    /**
     * Observers registered here will be executed when VR mode is exited.
     */
    get onExitingVRObservable() {
        return this.observablesManager.onExitingVRObservable;
    }
    /**
     * The (single) canvas of this viewer
     */
    get canvas() {
        return this._canvas;
    }
    get configurationContainer() {
        return this._configurationContainer;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    getConfigurationLoader() {
        return new RenderOnlyConfigurationLoader();
    }
    constructor(containerElement, initialConfiguration = {}) {
        this.containerElement = containerElement;
        /**
         * A flag that controls whether or not the render loop should be executed
         */
        this.runRenderLoop = true;
        /**
         * is this viewer disposed?
         */
        this._isDisposed = false;
        this._hdToggled = false;
        this._vrToggled = false;
        this._vrModelRepositioning = 0;
        this._vrScale = 1;
        this._vrInit = false;
        /**
         * The resize function that will be registered with the window object
         */
        this._resize = () => {
            // Only resize if Canvas is in the DOM
            if (!this.isCanvasInDOM()) {
                return;
            }
            if (this.canvas.clientWidth <= 0 || this.canvas.clientHeight <= 0) {
                return;
            }
            if (this.configuration.engine && this.configuration.engine.disableResize) {
                return;
            }
            this.engine.resize();
        };
        /**
         * render loop that will be executed by the engine
         * @param force
         */
        this._render = (force = false) => {
            if (force || (this.sceneManager.scene && this.sceneManager.scene.activeCamera)) {
                if (this.runRenderLoop || force) {
                    this.engine.performanceMonitor.enable();
                    this.sceneManager.scene.render();
                    this.onFrameRenderedObservable.notifyObservers(this);
                }
                else {
                    this.engine.performanceMonitor.disable();
                    // update camera instead of rendering
                    this.sceneManager.scene.activeCamera && this.sceneManager.scene.activeCamera.update();
                }
            }
        };
        // if exists, use the container id. otherwise, generate a random string.
        if (containerElement.id) {
            this.baseId = containerElement.id;
        }
        else {
            this.baseId = containerElement.id = "bjs" + Math.random().toString(32).substring(2, 10);
        }
        this._registeredOnBeforeRenderFunctions = [];
        this._configurationContainer = new ConfigurationContainer();
        this.observablesManager = new ObservablesManager();
        this.modelLoader = new ModelLoader(this.observablesManager, this._configurationContainer);
        RenderingManager.AUTOCLEAR = false;
        // extend the configuration
        this._configurationLoader = this.getConfigurationLoader();
        this._configurationLoader.loadConfiguration(initialConfiguration, (configuration) => {
            this._onConfigurationLoaded(configuration);
        });
        this.onSceneInitObservable.add(() => {
            this.updateConfiguration();
        });
        this.onInitDoneObservable.add(() => {
            this._isInit = true;
            this.engine.runRenderLoop(this._render);
        });
        this._prepareContainerElement();
        // add this viewer to the viewer manager
        viewerManager.addViewer(this);
    }
    /**
     * get the baseId of this viewer
     * @returns the baseId of this viewer
     */
    getBaseId() {
        return this.baseId;
    }
    /**
     * Do we have a canvas to render on, and is it a part of the scene
     * @returns true if the canvas is in the DOM
     */
    isCanvasInDOM() {
        return !!this._canvas && !!this._canvas.parentElement;
    }
    /**
     * Is the engine currently set to render even when the page is in background
     */
    get renderInBackground() {
        return this.engine && this.engine.renderEvenInBackground;
    }
    /**
     * Set the viewer's background rendering flag.
     */
    set renderInBackground(value) {
        if (this.engine) {
            this.engine.renderEvenInBackground = value;
        }
    }
    /**
     * Get the configuration object. This is a reference only.
     * The configuration can ONLY be updated using the updateConfiguration function.
     * changing this object will have no direct effect on the scene.
     */
    get configuration() {
        return this._configurationContainer.configuration;
    }
    /**
     * force resizing the engine.
     */
    forceResize() {
        this._resize();
    }
    toggleHD() {
        this._hdToggled = !this._hdToggled;
        const scale = this._hdToggled ? Math.max(0.5, 1 / (window.devicePixelRatio || 2)) : 1;
        this.engine.setHardwareScalingLevel(scale);
    }
    toggleVR() {
        if (!this._vrInit) {
            this._initVR();
        }
        if (this.sceneManager.vrHelper && !this.sceneManager.vrHelper.isInVRMode) {
            // make sure the floor is set
            if (this.sceneManager.environmentHelper && this.sceneManager.environmentHelper.ground) {
                this.sceneManager.vrHelper.addFloorMesh(this.sceneManager.environmentHelper.ground);
            }
            this._vrToggled = true;
            this.sceneManager.vrHelper.enterVR();
            // position the vr camera to be in front of the object or wherever the user has configured it to be
            if (this.sceneManager.vrHelper.currentVRCamera && this.sceneManager.vrHelper.currentVRCamera !== this.sceneManager.camera) {
                if (this.configuration.vr && this.configuration.vr.cameraPosition !== undefined) {
                    this.sceneManager.vrHelper.currentVRCamera.position.copyFromFloats(this.configuration.vr.cameraPosition.x, this.configuration.vr.cameraPosition.y, this.configuration.vr.cameraPosition.z);
                }
                else {
                    this.sceneManager.vrHelper.currentVRCamera.position.copyFromFloats(0, this.sceneManager.vrHelper.currentVRCamera.position.y, -1);
                }
                this.sceneManager.vrHelper.currentVRCamera.rotationQuaternion &&
                    this.sceneManager.vrHelper.currentVRCamera.rotationQuaternion.copyFromFloats(0, 0, 0, 1);
                // set the height of the model to be what the user has configured, or floating by default
                if (this.configuration.vr && this.configuration.vr.modelHeightCorrection !== undefined) {
                    if (typeof this.configuration.vr.modelHeightCorrection === "number") {
                        this._vrModelRepositioning = this.configuration.vr.modelHeightCorrection;
                    }
                    else if (this.configuration.vr.modelHeightCorrection) {
                        this._vrModelRepositioning = this.sceneManager.vrHelper.currentVRCamera.position.y / 2;
                    }
                    else {
                        this._vrModelRepositioning = 0;
                    }
                }
                // scale the model
                if (this.sceneManager.models.length) {
                    const boundingVectors = this.sceneManager.models[0].rootMesh.getHierarchyBoundingVectors();
                    const sizeVec = boundingVectors.max.subtract(boundingVectors.min);
                    const maxDimension = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
                    this._vrScale = 1 / maxDimension;
                    if (this.configuration.vr && this.configuration.vr.objectScaleFactor) {
                        this._vrScale *= this.configuration.vr.objectScaleFactor;
                    }
                    this.sceneManager.models[0].rootMesh.scaling.scaleInPlace(this._vrScale);
                    // reposition the object to "float" in front of the user
                    this.sceneManager.models[0].rootMesh.position.y += this._vrModelRepositioning;
                    this.sceneManager.models[0].rootMesh.rotationQuaternion = null;
                }
                // scale the environment to match the model
                if (this.sceneManager.environmentHelper) {
                    this.sceneManager.environmentHelper.ground && this.sceneManager.environmentHelper.ground.scaling.scaleInPlace(this._vrScale);
                    this.sceneManager.environmentHelper.skybox && this.sceneManager.environmentHelper.skybox.scaling.scaleInPlace(this._vrScale);
                }
                // post processing
                if (this.sceneManager.defaultRenderingPipelineEnabled && this.sceneManager.defaultRenderingPipeline) {
                    this.sceneManager.defaultRenderingPipeline.imageProcessingEnabled = false;
                    this.sceneManager.defaultRenderingPipeline.prepare();
                }
            }
            else {
                this._vrModelRepositioning = 0;
            }
        }
        else {
            if (this.sceneManager.vrHelper) {
                this.sceneManager.vrHelper.exitVR();
            }
        }
    }
    _initVR() {
        if (this.sceneManager.vrHelper) {
            this.observablesManager.onExitingVRObservable.add(() => {
                if (this._vrToggled) {
                    this._vrToggled = false;
                    // undo the scaling of the model
                    if (this.sceneManager.models.length) {
                        this.sceneManager.models[0].rootMesh.scaling.scaleInPlace(1 / this._vrScale);
                        this.sceneManager.models[0].rootMesh.position.y -= this._vrModelRepositioning;
                    }
                    // undo the scaling of the environment
                    if (this.sceneManager.environmentHelper) {
                        this.sceneManager.environmentHelper.ground && this.sceneManager.environmentHelper.ground.scaling.scaleInPlace(1 / this._vrScale);
                        this.sceneManager.environmentHelper.skybox && this.sceneManager.environmentHelper.skybox.scaling.scaleInPlace(1 / this._vrScale);
                    }
                    // post processing
                    if (this.sceneManager.defaultRenderingPipelineEnabled && this.sceneManager.defaultRenderingPipeline) {
                        this.sceneManager.defaultRenderingPipeline.imageProcessingEnabled = true;
                        this.sceneManager.defaultRenderingPipeline.prepare();
                    }
                    // clear set height and width
                    this.canvas.removeAttribute("height");
                    this.canvas.removeAttribute("width");
                    this.engine.resize();
                }
            });
        }
        this._vrInit = true;
    }
    _onConfigurationLoaded(configuration) {
        this._configurationContainer.configuration = deepmerge(this.configuration || {}, configuration);
        if (this.configuration.observers) {
            this._configureObservers(this.configuration.observers);
        }
        // TODO remove this after testing, as this is done in the updateConfiguration as well.
        if (this.configuration.loaderPlugins) {
            Object.keys(this.configuration.loaderPlugins).forEach((name) => {
                if (this.configuration.loaderPlugins && this.configuration.loaderPlugins[name]) {
                    this.modelLoader.addPlugin(name);
                }
            });
        }
        this.observablesManager.onViewerInitStartedObservable.notifyObservers(this);
    }
    /**
     * Force a single render loop execution.
     */
    forceRender() {
        this._render(true);
    }
    /**
     * Takes a screenshot of the scene and returns it as a base64 encoded png.
     * @param callback optional callback that will be triggered when screenshot is done.
     * @param width Optional screenshot width (default to 512).
     * @param height Optional screenshot height (default to 512).
     * @returns a promise with the screenshot data
     */
    takeScreenshot(callback, width = 0, height = 0) {
        width = width || this.canvas.clientWidth;
        height = height || this.canvas.clientHeight;
        // Create the screenshot
        return new Promise((resolve, reject) => {
            try {
                Tools.CreateScreenshot(this.engine, this.sceneManager.camera, { width, height }, (data) => {
                    if (callback) {
                        callback(data);
                    }
                    resolve(data);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Update the current viewer configuration with new values.
     * Only provided information will be updated, old configuration values will be kept.
     * If this.configuration was manually changed, you can trigger this function with no parameters,
     * and the entire configuration will be updated.
     * @param newConfiguration the partial configuration to update or a URL to a JSON holding the updated configuration
     *
     */
    updateConfiguration(newConfiguration = this.configuration) {
        if (typeof newConfiguration === "string") {
            Tools.LoadFile(newConfiguration, (data) => {
                try {
                    const newData = JSON.parse(data.toString());
                    return this.updateConfiguration(newData);
                }
                catch (e) {
                    Logger.Log("Error parsing file " + newConfiguration);
                }
            }, undefined, undefined, undefined, (error) => {
                Logger.Log(["Error parsing file " + newConfiguration, error]);
            });
        }
        else {
            //backcompat
            processConfigurationCompatibility(newConfiguration);
            // update this.configuration with the new data
            this._configurationContainer.configuration = deepmerge(this.configuration || {}, newConfiguration);
            this.sceneManager.updateConfiguration(newConfiguration);
            // observers in configuration
            if (newConfiguration.observers) {
                this._configureObservers(newConfiguration.observers);
            }
            if (newConfiguration.loaderPlugins) {
                Object.keys(newConfiguration.loaderPlugins).forEach((name) => {
                    if (newConfiguration.loaderPlugins && newConfiguration.loaderPlugins[name]) {
                        this.modelLoader.addPlugin(name);
                    }
                });
            }
        }
    }
    /**
     * this is used to register native functions using the configuration object.
     * This will configure the observers.
     * @param observersConfiguration observers configuration
     */
    _configureObservers(observersConfiguration) {
        if (observersConfiguration.onEngineInit) {
            this.onEngineInitObservable.add(window[observersConfiguration.onEngineInit]);
        }
        else {
            if (observersConfiguration.onEngineInit === "" && this.configuration.observers && this.configuration.observers.onEngineInit) {
                this.onEngineInitObservable.removeCallback(window[this.configuration.observers.onEngineInit]);
            }
        }
        if (observersConfiguration.onSceneInit) {
            this.onSceneInitObservable.add(window[observersConfiguration.onSceneInit]);
        }
        else {
            if (observersConfiguration.onSceneInit === "" && this.configuration.observers && this.configuration.observers.onSceneInit) {
                this.onSceneInitObservable.removeCallback(window[this.configuration.observers.onSceneInit]);
            }
        }
        if (observersConfiguration.onModelLoaded) {
            this.onModelLoadedObservable.add(window[observersConfiguration.onModelLoaded]);
        }
        else {
            if (observersConfiguration.onModelLoaded === "" && this.configuration.observers && this.configuration.observers.onModelLoaded) {
                this.onModelLoadedObservable.removeCallback(window[this.configuration.observers.onModelLoaded]);
            }
        }
    }
    /**
     * Dispose the entire viewer including the scene and the engine
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        window.removeEventListener("resize", this._resize);
        if (this.sceneManager) {
            if (this.sceneManager.scene && this.sceneManager.scene.activeCamera) {
                this.sceneManager.scene.activeCamera.detachControl();
            }
            this.sceneManager.dispose();
        }
        this._fpsTimeoutInterval && clearInterval(this._fpsTimeoutInterval);
        this.observablesManager.dispose();
        this.modelLoader.dispose();
        if (this.engine) {
            this.engine.dispose();
        }
        viewerManager.removeViewer(this);
        this._isDisposed = true;
    }
    /**
     * This function will execute when the HTML templates finished initializing.
     * It should initialize the engine and continue execution.
     *
     * @returns The viewer object will be returned after the object was loaded.
     */
    _onTemplatesLoaded() {
        return Promise.resolve(this);
    }
    /**
     * This will force the creation of an engine and a scene.
     * It will also load a model if preconfigured.
     * But first - it will load the extendible onTemplateLoaded()!
     * @returns A promise that will resolve when the template was loaded
     */
    _onTemplateLoaded() {
        // check if viewer was disposed right after created
        if (this._isDisposed) {
            return Promise.reject("viewer was disposed");
        }
        return this._onTemplatesLoaded().then(() => {
            const autoLoad = typeof this.configuration.model === "string" || (this.configuration.model && this.configuration.model.url);
            return this._initEngine()
                .then((engine) => {
                return this.onEngineInitObservable.notifyObserversWithPromise(engine);
            })
                .then(() => {
                this._initTelemetryEvents();
                if (autoLoad) {
                    return this.loadModel(this.configuration.model)
                        .catch(() => { })
                        .then(() => {
                        return this.sceneManager.scene;
                    });
                }
                else {
                    return this.sceneManager.scene || this.sceneManager.initScene(this.configuration.scene);
                }
            })
                .then(() => {
                return this.onInitDoneObservable.notifyObserversWithPromise(this);
            })
                .catch((e) => {
                Tools.Warn(e.toString());
                return this;
            });
        });
    }
    /**
     * Initialize the engine. Returns a promise in case async calls are needed.
     *
     * @protected
     * @returns {Promise<Engine>}
     * @memberof Viewer
     */
    _initEngine() {
        // init custom shaders
        this._injectCustomShaders();
        //let canvasElement = this.templateManager.getCanvas();
        if (!this.canvas) {
            return Promise.reject("Canvas element not found!");
        }
        const config = this.configuration.engine || {};
        // TDO enable further configuration
        // check for webgl2 support, force-disable if needed.
        if (viewerGlobals.disableWebGL2Support) {
            config.engineOptions = config.engineOptions || {};
            config.engineOptions.disableWebGL2Support = true;
        }
        if (this.configuration["3dCommerceCertified"]) {
            config.engineOptions = config.engineOptions || {};
            config.engineOptions.forceSRGBBufferSupportState = true;
            const loader = SceneLoader.GetPluginForExtension(".gltf");
            if (loader) {
                loader.transparencyAsCoverage = true;
            }
            SceneLoader.OnPluginActivatedObservable.add((plugin) => {
                if (plugin.name === "gltf") {
                    const loader = plugin;
                    loader.transparencyAsCoverage = true;
                }
            });
        }
        this.engine = new Engine(this.canvas, !!config.antialiasing, config.engineOptions);
        if (!config.disableResize) {
            window.addEventListener("resize", this._resize);
        }
        if (this.configuration.engine) {
            if (this.configuration.engine.adaptiveQuality) {
                const scale = Math.max(0.5, 1 / (window.devicePixelRatio || 2));
                this.engine.setHardwareScalingLevel(scale);
            }
            if (this.configuration.engine.hdEnabled) {
                this.toggleHD();
            }
        }
        // create a new template manager for this viewer
        this.sceneManager = new SceneManager(this.engine, this._configurationContainer, this.observablesManager);
        return Promise.resolve(this.engine);
    }
    /**
     * Initialize a model loading. The returned object (a ViewerModel object) will be loaded in the background.
     * The difference between this and loadModel is that loadModel will fulfill the promise when the model finished loading.
     *
     * @param modelConfig model configuration to use when loading the model.
     * @param clearScene should the scene be cleared before loading this model
     * @returns a ViewerModel object that is not yet fully loaded.
     */
    initModel(modelConfig, clearScene = true) {
        let configuration;
        if (typeof modelConfig === "string") {
            configuration = {
                url: modelConfig,
            };
        }
        else if (modelConfig instanceof File) {
            configuration = {
                file: modelConfig,
                root: "file:",
            };
        }
        else {
            configuration = modelConfig;
        }
        if (!configuration.url && !configuration.file) {
            throw new Error("no model provided");
        }
        if (clearScene) {
            this.sceneManager.clearScene(true, false);
        }
        //merge the configuration for future models:
        if (this.configuration.model && typeof this.configuration.model === "object") {
            const globalConfig = deepmerge({}, this.configuration.model);
            configuration = deepmerge(globalConfig, configuration);
            if (modelConfig instanceof File) {
                configuration.file = modelConfig;
            }
        }
        else {
            this.configuration.model = configuration;
        }
        this._isLoading = true;
        const model = this.modelLoader.load(configuration);
        this.lastUsedLoader = model.loader;
        model.onLoadErrorObservable.add((errorObject) => {
            this.onModelLoadErrorObservable.notifyObserversWithPromise(errorObject);
        });
        model.onLoadProgressObservable.add((progressEvent) => {
            this.onModelLoadProgressObservable.notifyObserversWithPromise(progressEvent);
        });
        this.onLoaderInitObservable.notifyObserversWithPromise(this.lastUsedLoader);
        model.onLoadedObservable.add(() => {
            this._isLoading = false;
        });
        return model;
    }
    /**
     * load a model using the provided configuration.
     * This function, as opposed to initModel, will return a promise that resolves when the model is loaded, and rejects with error.
     * If you want to attach to the observables of the model, use initModel instead.
     *
     * @param modelConfig the model configuration or URL to load.
     * @param clearScene Should the scene be cleared before loading the model
     * @returns a Promise the fulfills when the model finished loading successfully.
     */
    loadModel(modelConfig, clearScene = true) {
        if (this._isLoading) {
            // We can decide here whether or not to cancel the lst load, but the developer can do that.
            return Promise.reject("another model is curently being loaded.");
        }
        return Promise.resolve(this.sceneManager.scene)
            .then((scene) => {
            if (!scene) {
                return this.sceneManager.initScene(this.configuration.scene);
            }
            return scene;
        })
            .then(() => {
            const model = this.initModel(modelConfig, clearScene);
            return new Promise((resolve, reject) => {
                // at this point, configuration.model is an object, not a string
                model.onLoadedObservable.add(() => {
                    resolve(model);
                });
                model.onLoadErrorObservable.add((error) => {
                    reject(error);
                });
            });
        });
    }
    _initTelemetryEvents() {
        telemetryManager.broadcast("Engine Capabilities", this.baseId, this.engine.getCaps());
        telemetryManager.broadcast("Platform Details", this.baseId, {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
        });
        telemetryManager.flushWebGLErrors(this.engine, this.baseId);
        const trackFPS = () => {
            telemetryManager.broadcast("Current FPS", this.baseId, { fps: this.engine.getFps() });
        };
        trackFPS();
        // Track the FPS again after 60 seconds
        this._fpsTimeoutInterval = window.setInterval(trackFPS, 60 * 1000);
    }
    /**
     * Injects all the spectre shader in the babylon shader store
     */
    _injectCustomShaders() {
        const customShaders = this.configuration.customShaders;
        // Inject all the spectre shader in the babylon shader store.
        if (!customShaders) {
            return;
        }
        if (customShaders.shaders) {
            Object.keys(customShaders.shaders).forEach((key) => {
                // typescript considers a callback "unsafe", so... '!'
                Effect.ShadersStore[key] = customShaders.shaders[key];
            });
        }
        if (customShaders.includes) {
            Object.keys(customShaders.includes).forEach((key) => {
                // typescript considers a callback "unsafe", so... '!'
                Effect.IncludesShadersStore[key] = customShaders.includes[key];
            });
        }
    }
}
//# sourceMappingURL=viewer.js.map