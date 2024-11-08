import { getConfigurationKey } from "../configuration/configuration";
import { ModelState } from "../model/viewerModel";
import { extendClassWithConfig, deepmerge } from "../helper/index";
import { ViewerLabs } from "../labs/viewerLabs";
import { getCustomOptimizerByName } from "../optimizer/custom/index";
import { Observable } from "core/Misc/observable";
import { SceneOptimizer, SceneOptimizerOptions } from "core/Misc/sceneOptimizer";
import { ArcRotateCamera } from "core/Cameras/arcRotateCamera";
import { Light } from "core/Lights/light";
import { EnvironmentHelper } from "core/Helpers/environmentHelper";
import { Color3, Quaternion, Vector3, Axis, Matrix } from "core/Maths/math";
import { DefaultRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import { Animation } from "core/Animations/index";
import { AnimationPropertiesOverride } from "core/Animations/animationPropertiesOverride";
import { RenderTargetTexture } from "core/Materials/Textures/renderTargetTexture";
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { ShadowLight } from "core/Lights/shadowLight";
import { CubeTexture } from "core/Materials/Textures/cubeTexture";
import { HemisphericLight } from "core/Lights/hemisphericLight";
import { Scalar } from "core/Maths/math.scalar";
import { CreatePlane } from "core/Meshes/Builders/planeBuilder";
import { Tags } from "core/Misc/tags";
import { Scene } from "core/scene";
import { ShadowGenerator } from "core/Lights/Shadows/shadowGenerator";
import { Constants } from "core/Engines/constants";
import "core/Audio/audioSceneComponent";
import "core/Helpers/sceneHelpers";
import "core/Misc/observable.extensions";
export class SceneManager {
    get defaultRenderingPipeline() {
        return this._defaultRenderingPipeline;
    }
    get vrHelper() {
        return this._vrHelper;
    }
    constructor(_engine, _configurationContainer, _observablesManager) {
        this._engine = _engine;
        this._configurationContainer = _configurationContainer;
        this._observablesManager = _observablesManager;
        this._white = Color3.White();
        this._forceShadowUpdate = false;
        this._processShadows = true;
        this._groundEnabled = true;
        this._groundMirrorEnabled = true;
        this._defaultRenderingPipelineEnabled = false;
        this._globalConfiguration = {};
        this._defaultRenderingPipelineShouldBuild = true;
        // default from rendering pipeline
        this._bloomEnabled = false;
        // default from rendering pipeline
        this._fxaaEnabled = false;
        this._focusOnModel = (model) => {
            const boundingInfo = model.rootMesh.getHierarchyBoundingVectors(true);
            const sizeVec = boundingInfo.max.subtract(boundingInfo.min);
            const halfSizeVec = sizeVec.scale(0.5);
            const center = boundingInfo.min.add(halfSizeVec);
            this.camera.setTarget(center);
            this.camera.alpha = (this._globalConfiguration.camera && this._globalConfiguration.camera.alpha) || this.camera.alpha;
            this.camera.beta = (this._globalConfiguration.camera && this._globalConfiguration.camera.beta) || this.camera.beta;
            this.camera.radius = (this._globalConfiguration.camera && this._globalConfiguration.camera.radius) || this.camera.radius;
            const sceneDiagonalLenght = sizeVec.length();
            if (isFinite(sceneDiagonalLenght)) {
                this.camera.upperRadiusLimit = sceneDiagonalLenght * 4;
            }
            if (this._configurationContainer.configuration) {
                this._configureEnvironment(this._configurationContainer.configuration.skybox, this._configurationContainer.configuration.ground);
            }
            /*this.scene.lights.filter(light => light instanceof ShadowLight).forEach(light => {
                // casting ais safe, due to the constraints tested before
                (<ShadowLight>light).setDirectionToTarget(center);
            });*/
        };
        this._cameraBehaviorMapping = {};
        this.models = [];
        this.onCameraConfiguredObservable = new Observable();
        this.onLightsConfiguredObservable = new Observable();
        this.onModelsConfiguredObservable = new Observable();
        this.onSceneConfiguredObservable = new Observable();
        this.onSceneInitObservable = new Observable(undefined, true);
        this.onSceneOptimizerConfiguredObservable = new Observable();
        this.onEnvironmentConfiguredObservable = new Observable();
        this.onVRConfiguredObservable = new Observable();
        //this._viewer.onEngineInitObservable.add(() => {
        this._handleHardwareLimitations();
        //});
        this.onSceneInitObservable.add((scene) => {
            this.scene.animationPropertiesOverride = this.scene.animationPropertiesOverride || new AnimationPropertiesOverride();
            this.labs = new ViewerLabs(scene);
            const updateShadows = () => {
                for (const light of this.scene.lights) {
                    const generators = light.getShadowGenerators();
                    if (generators) {
                        // Processing shadows if animates
                        const iterator = generators.values();
                        for (let key = iterator.next(); key.done !== true; key = iterator.next()) {
                            const generator = key.value;
                            const shadowMap = generator.getShadowMap();
                            if (shadowMap) {
                                shadowMap.refreshRate = RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
                            }
                        }
                    }
                }
            };
            scene.registerBeforeRender(() => {
                if (this._forceShadowUpdate || (scene.animatables && scene.animatables.length > 0)) {
                    // make sure all models are loaded
                    updateShadows();
                    this._forceShadowUpdate = false;
                }
                else if (!this.models.every((model) => {
                    if (!model.shadowsRenderedAfterLoad) {
                        model.shadowsRenderedAfterLoad = true;
                        return false;
                    }
                    return model.state === ModelState.COMPLETE && !model.currentAnimation;
                })) {
                    updateShadows();
                }
            });
            return this._observablesManager && this._observablesManager.onSceneInitObservable.notifyObserversWithPromise(this.scene);
        });
        if (this._observablesManager) {
            this._observablesManager.onModelLoadedObservable.add((model) => {
                for (const light of this.scene.lights) {
                    const generators = light.getShadowGenerators();
                    if (generators) {
                        // Processing shadows if animates
                        const iterator = generators.values();
                        for (let key = iterator.next(); key.done !== true; key = iterator.next()) {
                            const generator = key.value;
                            const shadowMap = generator.getShadowMap();
                            if (shadowMap) {
                                shadowMap.refreshRate = RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
                            }
                        }
                    }
                }
                this._focusOnModel(model);
            });
            this._observablesManager.onModelAddedObservable.add((model) => {
                this.models.push(model);
            });
            this._observablesManager.onModelRemovedObservable.add((model) => {
                this.models.splice(this.models.indexOf(model), 1);
            });
        }
    }
    /**
     * Returns a boolean representing HDR support
     */
    get isHdrSupported() {
        return this._hdrSupport;
    }
    /**
     * Return the main color defined in the configuration.
     */
    get mainColor() {
        return this._configurationContainer.mainColor;
    }
    get reflectionColor() {
        return this._configurationContainer.reflectionColor;
    }
    get animationBlendingEnabled() {
        return this.scene && this.scene.animationPropertiesOverride.enableBlending;
    }
    set animationBlendingEnabled(value) {
        this.scene.animationPropertiesOverride.enableBlending = value;
    }
    get observablesManager() {
        return this._observablesManager;
    }
    /**
     * The flag defining whether shadows are rendered constantly or once.
     */
    get processShadows() {
        return this._processShadows;
    }
    /**
     * Should shadows be rendered every frame, or only once and stop.
     * This can be used to optimize a scene.
     *
     * Not that the shadows will NOT disapear but will remain in place.
     * @param process if true shadows will be updated once every frame. if false they will stop being updated.
     */
    set processShadows(process) {
        const refreshType = process ? RenderTargetTexture.REFRESHRATE_RENDER_ONEVERYFRAME : RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
        for (const light of this.scene.lights) {
            const generators = light.getShadowGenerators();
            if (generators) {
                const iterator = generators.values();
                for (let key = iterator.next(); key.done !== true; key = iterator.next()) {
                    const generator = key.value;
                    const shadowMap = generator.getShadowMap();
                    if (shadowMap) {
                        shadowMap.refreshRate = refreshType;
                    }
                }
            }
        }
        this._processShadows = process;
    }
    get groundEnabled() {
        return this._groundEnabled;
    }
    set groundEnabled(newValue) {
        if (newValue === this._groundEnabled) {
            return;
        }
        this._groundEnabled = newValue;
        if (this.environmentHelper && this.environmentHelper.ground) {
            this.environmentHelper.ground.setEnabled(this._groundEnabled);
        }
    }
    /**
     * gets whether the reflection is disabled.
     */
    get groundMirrorEnabled() {
        return this._groundMirrorEnabled;
    }
    /**
     * sets whether the reflection is disabled.
     */
    set groundMirrorEnabled(value) {
        if (this._groundMirrorEnabled === value) {
            return;
        }
        this._groundMirrorEnabled = value;
        if (this.environmentHelper && this.environmentHelper.groundMaterial && this.environmentHelper.groundMirror) {
            if (!value) {
                this.environmentHelper.groundMaterial.reflectionTexture = null;
            }
            else {
                this.environmentHelper.groundMaterial.reflectionTexture = this.environmentHelper.groundMirror;
            }
        }
    }
    get defaultRenderingPipelineEnabled() {
        return this._defaultRenderingPipelineEnabled;
    }
    set defaultRenderingPipelineEnabled(value) {
        if (value === this._defaultRenderingPipelineEnabled) {
            return;
        }
        this._defaultRenderingPipelineEnabled = value;
        this._rebuildPostprocesses();
        if (this._defaultRenderingPipeline) {
            this._defaultRenderingPipelineShouldBuild = false;
            this._defaultRenderingPipeline.prepare();
            this.scene.imageProcessingConfiguration.applyByPostProcess = true;
        }
    }
    /**
     * Sets the engine flags to unlock all babylon features.
     * Can also be configured using the scene.flags configuration object
     */
    unlockBabylonFeatures() {
        this.scene.shadowsEnabled = true;
        this.scene.particlesEnabled = true;
        this.scene.postProcessesEnabled = true;
        this.scene.collisionsEnabled = true;
        this.scene.lightsEnabled = true;
        this.scene.texturesEnabled = true;
        this.scene.lensFlaresEnabled = true;
        this.scene.proceduralTexturesEnabled = true;
        this.scene.renderTargetsEnabled = true;
        this.scene.spritesEnabled = true;
        this.scene.skeletonsEnabled = true;
        this.scene.audioEnabled = true;
    }
    /**
     * initialize the scene. Calling this function again will dispose the old scene, if exists.
     * @param sceneConfiguration the configuration of the scene
     * @returns a promise that resolves when the scene is ready
     */
    initScene(sceneConfiguration = {}) {
        // if the scene exists, dispose it.
        if (this.scene) {
            this.scene.dispose();
        }
        // create a new scene
        this.scene = new Scene(this._engine);
        this._configurationContainer.scene = this.scene;
        // set a default PBR material
        if (!sceneConfiguration.defaultMaterial) {
            const defaultMaterial = new PBRMaterial("defaultMaterial", this.scene);
            defaultMaterial.reflectivityColor = new Color3(0.1, 0.1, 0.1);
            defaultMaterial.microSurface = 0.6;
            if (this.scene.defaultMaterial) {
                this.scene.defaultMaterial.dispose();
            }
            this.scene.defaultMaterial = defaultMaterial;
        }
        this.scene.animationPropertiesOverride = new AnimationPropertiesOverride();
        Animation.AllowMatricesInterpolation = true;
        /*if (sceneConfiguration.glow) {
            let options: Partial<IGlowLayerOptions> = {
                mainTextureFixedSize: 512
            };
            if (typeof sceneConfiguration.glow === 'object') {
                options = sceneConfiguration.glow
            }
            var gl = new GlowLayer("glow", this.scene, options);
        }*/
        return this.onSceneInitObservable.notifyObserversWithPromise(this.scene);
    }
    clearScene(clearModels = true, clearLights = false) {
        if (clearModels) {
            this.models.forEach((m) => m.dispose());
            this.models.length = 0;
        }
        if (clearLights) {
            this.scene.lights.forEach((l) => l.dispose());
        }
    }
    /**
     * This will update the scene's configuration, including camera, lights, environment.
     * @param newConfiguration the delta that should be configured. This includes only the changes
     */
    updateConfiguration(newConfiguration) {
        if (this._configurationContainer) {
            this._globalConfiguration = this._configurationContainer.configuration;
        }
        else {
            this._globalConfiguration = newConfiguration;
        }
        // update scene configuration
        if (newConfiguration.scene) {
            this._configureScene(newConfiguration.scene);
        }
        // optimizer
        if (newConfiguration.optimizer !== undefined) {
            this._configureOptimizer(newConfiguration.optimizer);
        }
        // configure model
        /*if (newConfiguration.model && typeof newConfiguration.model === 'object') {
            this._configureModel(newConfiguration.model);
        }*/
        // lights
        this._configureLights(newConfiguration.lights);
        // environment
        if (newConfiguration.skybox !== undefined || newConfiguration.ground !== undefined) {
            this._configureEnvironment(newConfiguration.skybox, newConfiguration.ground);
        }
        // camera
        this._configureCamera(newConfiguration.camera);
        if (newConfiguration.environmentMap !== undefined) {
            this._configureEnvironmentMap(newConfiguration.environmentMap);
        }
        if (newConfiguration.vr !== undefined) {
            this._configureVR(newConfiguration.vr);
        }
        if (newConfiguration.lab) {
            // rendering pipelines
            if (newConfiguration.lab.defaultRenderingPipelines) {
                const pipelineConfig = newConfiguration.lab.defaultRenderingPipelines;
                if (typeof pipelineConfig === "boolean") {
                    this.defaultRenderingPipelineEnabled = pipelineConfig;
                }
                else {
                    this.defaultRenderingPipelineEnabled = true;
                }
            }
            if (this.environmentHelper && newConfiguration.lab.environmentMainColor) {
                const mainColor = new Color3(newConfiguration.lab.environmentMainColor.r, newConfiguration.lab.environmentMainColor.g, newConfiguration.lab.environmentMainColor.b);
                this.environmentHelper.setMainColor(mainColor);
            }
            if (newConfiguration.lab.globalLightRotation !== undefined) {
                // rotate all lights that are shadow lights
                this.scene.lights
                    .filter((light) => light instanceof ShadowLight)
                    .forEach((light) => {
                    // casting and '!' are safe, due to the constraints tested before
                    this.labs.rotateShadowLight(light, newConfiguration.lab.globalLightRotation);
                });
                this._forceShadowUpdate = true;
            }
        }
        if (this._defaultRenderingPipeline && this._defaultRenderingPipeline.imageProcessing) {
            this._defaultRenderingPipeline.imageProcessing.fromLinearSpace = true;
        }
        if (this._defaultRenderingPipelineShouldBuild && this._defaultRenderingPipeline) {
            this._defaultRenderingPipelineShouldBuild = false;
            this._defaultRenderingPipeline.prepare();
        }
    }
    _rebuildPostprocesses(configuration) {
        if (!this._defaultRenderingPipelineEnabled || !getConfigurationKey("scene.imageProcessingConfiguration.isEnabled", this._globalConfiguration)) {
            if (this._defaultRenderingPipeline) {
                this._defaultRenderingPipeline.dispose();
                this._defaultRenderingPipeline = null;
                this.scene.autoClearDepthAndStencil = true;
                this.scene.autoClear = true;
                this.scene.imageProcessingConfiguration.applyByPostProcess = false;
            }
            return;
        }
        const pipelineConfig = configuration || (this._globalConfiguration.lab && this._globalConfiguration.lab.defaultRenderingPipelines);
        if (pipelineConfig) {
            if (!this._defaultRenderingPipeline) {
                // Create pipeline in manual mode to avoid triggering multiple shader compilations
                this._defaultRenderingPipeline = new DefaultRenderingPipeline("default rendering pipeline", this._hdrSupport, this.scene, [this.camera], false);
            }
            this.scene.autoClear = false;
            this.scene.autoClearDepthAndStencil = false;
            this._defaultRenderingPipelineShouldBuild = true;
            let bloomEnabled = this._bloomEnabled;
            if (typeof pipelineConfig !== "boolean") {
                extendClassWithConfig(this._defaultRenderingPipeline, pipelineConfig);
                this._bloomEnabled = !!pipelineConfig.bloomEnabled;
                this._fxaaEnabled = !!pipelineConfig.fxaaEnabled;
                bloomEnabled = this._bloomEnabled && pipelineConfig.bloomWeight !== undefined && pipelineConfig.bloomWeight > 0;
                this._defaultRenderingPipeline.bloomWeight = (pipelineConfig.bloomWeight !== undefined && pipelineConfig.bloomWeight) || this._defaultRenderingPipeline.bloomWeight;
            }
            this._defaultRenderingPipeline.bloomEnabled = bloomEnabled;
            this._defaultRenderingPipeline.fxaaEnabled = this.fxaaEnabled;
        }
    }
    get bloomEnabled() {
        return this._bloomEnabled;
    }
    set bloomEnabled(value) {
        if (this._bloomEnabled === value) {
            return;
        }
        this._bloomEnabled = value;
        this._rebuildPostprocesses();
        if (this._defaultRenderingPipeline) {
            this._defaultRenderingPipelineShouldBuild = false;
            this._defaultRenderingPipeline.prepare();
            this.scene.imageProcessingConfiguration.applyByPostProcess = true;
        }
    }
    get fxaaEnabled() {
        return this._fxaaEnabled;
    }
    set fxaaEnabled(value) {
        if (this._fxaaEnabled === value) {
            return;
        }
        this._fxaaEnabled = value;
        this._rebuildPostprocesses();
        if (this._defaultRenderingPipeline) {
            this._defaultRenderingPipelineShouldBuild = false;
            this._defaultRenderingPipeline.prepare();
            this.scene.imageProcessingConfiguration.applyByPostProcess = true;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDefaultMaterial(sceneConfig) { }
    /**
     * internally configure the scene using the provided configuration.
     * The scene will not be recreated, but just updated.
     * @param sceneConfig the (new) scene configuration
     */
    _configureScene(sceneConfig) {
        // sanity check!
        if (!this.scene) {
            return;
        }
        const cc = sceneConfig.clearColor;
        const oldcc = this.scene.clearColor;
        if (cc) {
            if (cc.r !== undefined) {
                oldcc.r = cc.r;
            }
            if (cc.g !== undefined) {
                oldcc.g = cc.g;
            }
            if (cc.b !== undefined) {
                oldcc.b = cc.b;
            }
            if (cc.a !== undefined) {
                oldcc.a = cc.a;
            }
        }
        if (sceneConfig.assetsRootURL) {
            this._assetsRootURL = sceneConfig.assetsRootURL;
        }
        // image processing configuration - optional.
        if (sceneConfig.imageProcessingConfiguration) {
            extendClassWithConfig(this.scene.imageProcessingConfiguration, sceneConfig.imageProcessingConfiguration);
        }
        //animation properties override
        if (sceneConfig.animationPropertiesOverride) {
            extendClassWithConfig(this.scene.animationPropertiesOverride, sceneConfig.animationPropertiesOverride);
        }
        if (sceneConfig.environmentTexture) {
            if (!(this.scene.environmentTexture && this.scene.environmentTexture.url === sceneConfig.environmentTexture)) {
                if (this.scene.environmentTexture && this.scene.environmentTexture.dispose) {
                    this.scene.environmentTexture.dispose();
                }
                const environmentTexture = CubeTexture.CreateFromPrefilteredData(sceneConfig.environmentTexture, this.scene);
                this.scene.environmentTexture = environmentTexture;
            }
        }
        if (sceneConfig.debug === true) {
            this.scene.debugLayer.show();
        }
        else if (sceneConfig.debug === false) {
            if (this.scene.debugLayer.isVisible()) {
                this.scene.debugLayer.hide();
            }
        }
        if (sceneConfig.disableHdr) {
            this._handleHardwareLimitations(false);
        }
        else {
            this._handleHardwareLimitations(true);
        }
        if (sceneConfig.renderInBackground !== undefined) {
            this._engine.renderEvenInBackground = !!sceneConfig.renderInBackground;
        }
        const canvas = this._engine.getInputElement();
        if (canvas) {
            if (this.camera && sceneConfig.disableCameraControl) {
                this.camera.detachControl();
            }
            else if (this.camera && sceneConfig.disableCameraControl === false) {
                this.camera.attachControl();
            }
        }
        this.setDefaultMaterial(sceneConfig);
        if (sceneConfig.flags) {
            extendClassWithConfig(this.scene, sceneConfig.flags);
        }
        this.onSceneConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.scene,
            newConfiguration: sceneConfig,
        });
    }
    /**
     * Configure the scene optimizer.
     * The existing scene optimizer will be disposed and a new one will be created.
     * @param optimizerConfig the (new) optimizer configuration
     */
    _configureOptimizer(optimizerConfig) {
        if (typeof optimizerConfig === "boolean") {
            if (this.sceneOptimizer) {
                this.sceneOptimizer.stop();
                this.sceneOptimizer.dispose();
                delete this.sceneOptimizer;
            }
            if (optimizerConfig) {
                this.sceneOptimizer = new SceneOptimizer(this.scene);
                this.sceneOptimizer.start();
            }
        }
        else {
            let optimizerOptions = new SceneOptimizerOptions(optimizerConfig.targetFrameRate, optimizerConfig.trackerDuration);
            // check for degradation
            if (optimizerConfig.degradation) {
                switch (optimizerConfig.degradation) {
                    case "low":
                        optimizerOptions = SceneOptimizerOptions.LowDegradationAllowed(optimizerConfig.targetFrameRate);
                        break;
                    case "moderate":
                        optimizerOptions = SceneOptimizerOptions.ModerateDegradationAllowed(optimizerConfig.targetFrameRate);
                        break;
                    case "hight":
                        optimizerOptions = SceneOptimizerOptions.HighDegradationAllowed(optimizerConfig.targetFrameRate);
                        break;
                }
            }
            if (this.sceneOptimizer) {
                this.sceneOptimizer.stop();
                this.sceneOptimizer.dispose();
            }
            if (optimizerConfig.custom) {
                const customOptimizer = getCustomOptimizerByName(optimizerConfig.custom, optimizerConfig.improvementMode);
                if (customOptimizer) {
                    optimizerOptions.addCustomOptimization(() => {
                        return customOptimizer(this);
                    }, () => {
                        return `Babylon Viewer ${optimizerConfig.custom} custom optimization`;
                    });
                }
            }
            this.sceneOptimizer = new SceneOptimizer(this.scene, optimizerOptions, optimizerConfig.autoGeneratePriorities, optimizerConfig.improvementMode);
            this.sceneOptimizer.start();
        }
        this.onSceneOptimizerConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.sceneOptimizer,
            newConfiguration: optimizerConfig,
        });
    }
    /**
     * configure all models using the configuration.
     * @param modelConfiguration the configuration to use to reconfigure the models
     */
    /*protected _configureModel(modelConfiguration: Partial<IModelConfiguration>) {
        this.models.forEach(model => {
            model.updateConfiguration(modelConfiguration);
        });

        this.onModelsConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.models,
            newConfiguration: modelConfiguration
        });
    }*/
    _configureVR(vrConfig) {
        if (vrConfig.disabled) {
            if (this._vrHelper) {
                if (this._vrHelper.isInVRMode) {
                    this._vrHelper.exitVR();
                }
                this._vrHelper.dispose();
                this._vrHelper = undefined;
            }
            return;
        }
        const vrOptions = deepmerge({
            useCustomVRButton: true,
            createDeviceOrientationCamera: false,
            trackPosition: true,
        }, vrConfig.vrOptions || {});
        this._vrHelper = this.scene.createDefaultVRExperience(vrOptions);
        if (!vrConfig.disableInteractions) {
            this._vrHelper.enableInteractions();
        }
        if (!vrConfig.disableTeleportation) {
            const floorMeshName = vrConfig.overrideFloorMeshName || "BackgroundPlane";
            this._vrHelper.enableTeleportation({
                floorMeshName,
            });
        }
        this._vrHelper.onEnteringVRObservable.add(() => {
            if (this._observablesManager) {
                this._observablesManager.onEnteringVRObservable.notifyObservers(this);
            }
        });
        this._vrHelper.onExitingVRObservable.add(() => {
            if (this._observablesManager) {
                this._observablesManager.onExitingVRObservable.notifyObservers(this);
            }
        });
        this.onVRConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this._vrHelper,
            newConfiguration: vrConfig,
        });
    }
    _configureEnvironmentMap(environmentMapConfiguration) {
        if (environmentMapConfiguration.texture) {
            this.scene.environmentTexture = new CubeTexture(this._getAssetUrl(environmentMapConfiguration.texture), this.scene);
        }
        //sanity check
        if (this.scene.environmentTexture) {
            const rotatquatRotationionY = Quaternion.RotationAxis(Axis.Y, environmentMapConfiguration.rotationY || 0);
            Matrix.FromQuaternionToRef(rotatquatRotationionY, this.scene.environmentTexture.getReflectionTextureMatrix());
        }
        // process mainColor changes:
        if (environmentMapConfiguration.mainColor) {
            this._configurationContainer.mainColor = this.mainColor || Color3.White();
            const mc = environmentMapConfiguration.mainColor;
            if (mc.r !== undefined) {
                this.mainColor.r = mc.r;
            }
            if (mc.g !== undefined) {
                this.mainColor.g = mc.g;
            }
            if (mc.b !== undefined) {
                this.mainColor.b = mc.b;
            }
            this.reflectionColor.copyFrom(this.mainColor);
            const environmentTint = getConfigurationKey("environmentMap.tintLevel", this._globalConfiguration) || 0;
            // reflection color
            this.reflectionColor.toLinearSpaceToRef(this.reflectionColor);
            this.reflectionColor.scaleToRef(1 / this.scene.imageProcessingConfiguration.exposure, this.reflectionColor);
            const tmpColor3 = Color3.Lerp(this._white, this.reflectionColor, environmentTint);
            this.reflectionColor.copyFrom(tmpColor3);
            //update the environment, if exists
            if (this.environmentHelper) {
                if (this.environmentHelper.groundMaterial) {
                    this.environmentHelper.groundMaterial._perceptualColor = this.mainColor;
                }
                if (this.environmentHelper.skyboxMaterial) {
                    this.environmentHelper.skyboxMaterial._perceptualColor = this.mainColor;
                }
            }
        }
    }
    /**
     * (Re) configure the camera. The camera will only be created once and from this point will only be reconfigured.
     * @param cameraConfig the new camera configuration
     */
    _configureCamera(cameraConfig = {}) {
        if (!this.scene.activeCamera) {
            // Inline scene.createDefaultCamera to reduce file size
            // Dispose existing camera in replace mode.
            if (this.scene.activeCamera) {
                this.scene.activeCamera.dispose();
                this.scene.activeCamera = null;
            }
            // Camera
            if (!this.scene.activeCamera) {
                const worldExtends = this.scene.getWorldExtends();
                const worldSize = worldExtends.max.subtract(worldExtends.min);
                const worldCenter = worldExtends.min.add(worldSize.scale(0.5));
                let radius = worldSize.length() * 1.5;
                // empty scene scenario!
                if (!isFinite(radius)) {
                    radius = 1;
                    worldCenter.copyFromFloats(0, 0, 0);
                }
                const arcRotateCamera = new ArcRotateCamera("default camera", -(Math.PI / 2), Math.PI / 2, radius, worldCenter, this.scene);
                arcRotateCamera.lowerRadiusLimit = radius * 0.01;
                arcRotateCamera.wheelPrecision = 100 / radius;
                const camera = arcRotateCamera;
                camera.minZ = radius * 0.01;
                camera.maxZ = radius * 1000;
                camera.speed = radius * 0.2;
                this.scene.activeCamera = camera;
            }
            const canvas = this.scene.getEngine().getInputElement();
            if (canvas) {
                this.scene.activeCamera.attachControl();
            }
            this.camera = this.scene.activeCamera;
            this.camera.setTarget(Vector3.Zero());
        }
        if (!this.camera) {
            this.camera = this.scene.activeCamera;
        }
        if (cameraConfig.position) {
            const newPosition = this.camera.position.clone();
            extendClassWithConfig(newPosition, cameraConfig.position);
            this.camera.setPosition(newPosition);
        }
        if (cameraConfig.target) {
            const newTarget = this.camera.target.clone();
            extendClassWithConfig(newTarget, cameraConfig.target);
            this.camera.setTarget(newTarget);
        } /*else if (this.models.length && !cameraConfig.disableAutoFocus) {
            this._focusOnModel(this.models[0]);
        }*/
        if (cameraConfig.rotation) {
            this.camera.rotationQuaternion = new Quaternion(cameraConfig.rotation.x || 0, cameraConfig.rotation.y || 0, cameraConfig.rotation.z || 0, cameraConfig.rotation.w || 0);
        }
        if (cameraConfig.behaviors) {
            for (const name in cameraConfig.behaviors) {
                if (cameraConfig.behaviors[name] !== undefined) {
                    this._setCameraBehavior(name, cameraConfig.behaviors[name]);
                }
            }
        }
        const sceneExtends = this.scene.getWorldExtends((mesh) => {
            return !this.environmentHelper || (mesh !== this.environmentHelper.ground && mesh !== this.environmentHelper.rootMesh && mesh !== this.environmentHelper.skybox);
        });
        const sceneDiagonal = sceneExtends.max.subtract(sceneExtends.min);
        const sceneDiagonalLength = sceneDiagonal.length();
        if (isFinite(sceneDiagonalLength)) {
            this.camera.upperRadiusLimit = sceneDiagonalLength * 4;
        }
        // sanity check!
        if (this.scene.imageProcessingConfiguration) {
            this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
            this.scene.imageProcessingConfiguration.vignetteEnabled = true;
            this.scene.imageProcessingConfiguration.toneMappingEnabled = !!getConfigurationKey("camera.toneMappingEnabled", this._globalConfiguration);
        }
        extendClassWithConfig(this.camera, cameraConfig);
        this.onCameraConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.camera,
            newConfiguration: cameraConfig,
        });
    }
    _configureEnvironment(skyboxConifguration, groundConfiguration) {
        if (!skyboxConifguration && !groundConfiguration) {
            if (this.environmentHelper) {
                this.environmentHelper.dispose();
                this.environmentHelper = undefined;
            }
        }
        else {
            const options = {
                createGround: !!groundConfiguration && this._groundEnabled,
                createSkybox: !!skyboxConifguration,
                setupImageProcessing: false, // will be done at the scene level!,
            };
            // will that cause problems with model ground configuration?
            /*if (model) {
                const boundingInfo = model.rootMesh.getHierarchyBoundingVectors(true);
                const sizeVec = boundingInfo.max.subtract(boundingInfo.min);
                const halfSizeVec = sizeVec.scale(0.5);
                const center = boundingInfo.min.add(halfSizeVec);
                options.groundYBias = -center.y;
            }*/
            if (groundConfiguration) {
                const groundConfig = typeof groundConfiguration === "boolean" ? {} : groundConfiguration;
                const groundSize = groundConfig.size || (typeof skyboxConifguration === "object" && skyboxConifguration.scale);
                if (groundSize) {
                    options.groundSize = groundSize;
                }
                options.enableGroundShadow = groundConfiguration === true || groundConfig.receiveShadows;
                if (groundConfig.shadowLevel !== undefined) {
                    options.groundShadowLevel = groundConfig.shadowLevel;
                }
                options.enableGroundMirror = !!groundConfig.mirror && this.groundMirrorEnabled;
                if (groundConfig.texture) {
                    options.groundTexture = this._getAssetUrl(groundConfig.texture);
                }
                if (groundConfig.color) {
                    options.groundColor = new Color3(groundConfig.color.r, groundConfig.color.g, groundConfig.color.b);
                }
                if (groundConfig.opacity !== undefined) {
                    options.groundOpacity = groundConfig.opacity;
                }
                if (groundConfig.mirror) {
                    options.enableGroundMirror = true;
                    // to prevent undefines
                    if (typeof groundConfig.mirror === "object") {
                        if (groundConfig.mirror.amount !== undefined) {
                            options.groundMirrorAmount = groundConfig.mirror.amount;
                        }
                        if (groundConfig.mirror.sizeRatio !== undefined) {
                            options.groundMirrorSizeRatio = groundConfig.mirror.sizeRatio;
                        }
                        if (groundConfig.mirror.blurKernel !== undefined) {
                            options.groundMirrorBlurKernel = groundConfig.mirror.blurKernel;
                        }
                        if (groundConfig.mirror.fresnelWeight !== undefined) {
                            options.groundMirrorFresnelWeight = groundConfig.mirror.fresnelWeight;
                        }
                        if (groundConfig.mirror.fallOffDistance !== undefined) {
                            options.groundMirrorFallOffDistance = groundConfig.mirror.fallOffDistance;
                        }
                        if (this._defaultPipelineTextureType !== undefined) {
                            options.groundMirrorTextureType = this._defaultPipelineTextureType;
                        }
                    }
                }
            }
            let postInitSkyboxMaterial = false;
            if (skyboxConifguration) {
                const conf = skyboxConifguration === true ? {} : skyboxConifguration;
                if (conf.material && conf.material.imageProcessingConfiguration) {
                    options.setupImageProcessing = false; // will be configured later manually.
                }
                const skyboxSize = conf.scale;
                if (skyboxSize) {
                    options.skyboxSize = skyboxSize;
                }
                options.sizeAuto = !options.skyboxSize;
                if (conf.color) {
                    options.skyboxColor = new Color3(conf.color.r, conf.color.g, conf.color.b);
                }
                if (conf.cubeTexture && conf.cubeTexture.url) {
                    if (typeof conf.cubeTexture.url === "string") {
                        options.skyboxTexture = this._getAssetUrl(conf.cubeTexture.url);
                    }
                    else {
                        // init later!
                        postInitSkyboxMaterial = true;
                    }
                }
                if (conf.material) {
                    postInitSkyboxMaterial = true;
                }
            }
            options.setupImageProcessing = false; // TMP
            if (!this.environmentHelper) {
                this.environmentHelper = new EnvironmentHelper(options, this.scene);
            }
            else {
                // unlikely, but there might be a new scene! we need to dispose.
                // get the scene used by the envHelper
                const scene = this.environmentHelper.rootMesh.getScene();
                // is it a different scene? Oh no!
                if (scene !== this.scene) {
                    this.environmentHelper.dispose();
                    this.environmentHelper = new EnvironmentHelper(options, this.scene);
                }
                else {
                    // recreate the ground
                    if (this.environmentHelper.ground) {
                        this.environmentHelper.ground.dispose();
                    }
                    // recreate the skybox
                    if (this.environmentHelper.skybox) {
                        this.environmentHelper.skybox.dispose();
                    }
                    this.environmentHelper.updateOptions(options);
                    // update doesn't change the size of the skybox and ground, so we have to recreate!
                    //this.environmentHelper.dispose();
                    //this.environmentHelper = new EnvironmentHelper(options, this.scene);
                }
            }
            if (this.environmentHelper.rootMesh && this._globalConfiguration.scene && this._globalConfiguration.scene.environmentRotationY !== undefined) {
                this.environmentHelper.rootMesh.rotation.y = this._globalConfiguration.scene.environmentRotationY;
            }
            const groundConfig = typeof groundConfiguration === "boolean" ? {} : groundConfiguration;
            if (this.environmentHelper.groundMaterial && groundConfig) {
                this.environmentHelper.groundMaterial._perceptualColor = this.mainColor;
                if (groundConfig.material) {
                    extendClassWithConfig(this.environmentHelper.groundMaterial, groundConfig.material);
                }
                if (this.environmentHelper.groundMirror) {
                    const mirrorClearColor = this.environmentHelper.groundMaterial._perceptualColor.toLinearSpace();
                    // TODO user camera exposure value to set the mirror clear color
                    const exposure = Math.pow(2.0, -this.scene.imageProcessingConfiguration.exposure) * Math.PI;
                    mirrorClearColor.scaleToRef(1 / exposure, mirrorClearColor);
                    this.environmentHelper.groundMirror.clearColor.r = Scalar.Clamp(mirrorClearColor.r);
                    this.environmentHelper.groundMirror.clearColor.g = Scalar.Clamp(mirrorClearColor.g);
                    this.environmentHelper.groundMirror.clearColor.b = Scalar.Clamp(mirrorClearColor.b);
                    this.environmentHelper.groundMirror.clearColor.a = 1;
                    if (!this.groundMirrorEnabled) {
                        this.environmentHelper.groundMaterial.reflectionTexture = null;
                    }
                }
            }
            const skyboxMaterial = this.environmentHelper.skyboxMaterial;
            if (skyboxMaterial) {
                skyboxMaterial._perceptualColor = this.mainColor;
                if (postInitSkyboxMaterial) {
                    if (typeof skyboxConifguration === "object" && skyboxConifguration.material) {
                        extendClassWithConfig(skyboxMaterial, skyboxConifguration.material);
                    }
                }
            }
        }
        this._observablesManager &&
            this._observablesManager.onModelLoadedObservable.add((model) => {
                this._updateGroundMirrorRenderList(model);
            });
        this.onEnvironmentConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.environmentHelper,
            newConfiguration: {
                skybox: skyboxConifguration,
                ground: groundConfiguration,
            },
        });
    }
    /**
     * configure the lights.
     * @param lightsConfiguration the (new) light(s) configuration
     */
    _configureLights(lightsConfiguration = {}) {
        // sanity check!
        const lightKeys = Object.keys(lightsConfiguration).filter((name) => name !== "globalRotation");
        if (!lightKeys.length) {
            if (!this.scene.lights.length) {
                new HemisphericLight("default light", Vector3.Up(), this.scene);
            }
        }
        else {
            let lightsAvailable = this.scene.lights.map((light) => light.name);
            // compare to the global (!) configuration object and dispose unneeded:
            const lightsToConfigure = Object.keys(this._globalConfiguration.lights || []);
            if (Object.keys(lightsToConfigure).length !== lightsAvailable.length) {
                lightsAvailable.forEach((lName) => {
                    if (lightsToConfigure.indexOf(lName) === -1) {
                        this.scene.getLightByName(lName).dispose();
                    }
                });
            }
            lightKeys.forEach((name) => {
                let lightConfig = { type: 0 };
                if (typeof lightsConfiguration[name] === "object") {
                    lightConfig = lightsConfiguration[name];
                }
                if (typeof lightsConfiguration[name] === "number") {
                    lightConfig.type = lightsConfiguration[name];
                }
                lightConfig.name = name;
                let light;
                // light is not already available
                if (lightsAvailable.indexOf(name) === -1) {
                    const constructor = Light.GetConstructorFromName(lightConfig.type, lightConfig.name, this.scene);
                    if (!constructor) {
                        return;
                    }
                    light = constructor();
                }
                else {
                    // available? get it from the scene
                    light = this.scene.getLightByName(name);
                    if (typeof lightsConfiguration[name] === "boolean") {
                        lightConfig.type = light.getTypeID();
                    }
                    lightsAvailable = lightsAvailable.filter((ln) => ln !== name);
                    if (lightConfig.type !== undefined && light.getTypeID() !== lightConfig.type) {
                        light.dispose();
                        const constructor = Light.GetConstructorFromName(lightConfig.type, lightConfig.name, this.scene);
                        if (!constructor) {
                            return;
                        }
                        light = constructor();
                    }
                }
                // if config set the light to false, dispose it.
                if (lightsConfiguration[name] === false) {
                    light.dispose();
                    return;
                }
                //enabled
                const enabled = lightConfig.enabled !== undefined ? lightConfig.enabled : !lightConfig.disabled;
                light.setEnabled(enabled);
                extendClassWithConfig(light, lightConfig);
                //position. Some lights don't support shadows
                if (light instanceof ShadowLight) {
                    // set default values
                    light.shadowMinZ = light.shadowMinZ || 0.2;
                    light.shadowMaxZ = Math.min(10, light.shadowMaxZ || 10); //large far clips reduce shadow depth precision
                    if (lightConfig.target) {
                        if (light.setDirectionToTarget) {
                            const target = Vector3.Zero().copyFromFloats(lightConfig.target.x, lightConfig.target.y, lightConfig.target.z);
                            light.setDirectionToTarget(target);
                        }
                    }
                    else if (lightConfig.direction) {
                        const direction = Vector3.Zero().copyFromFloats(lightConfig.direction.x, lightConfig.direction.y, lightConfig.direction.z);
                        light.direction = direction;
                    }
                    let isShadowEnabled = false;
                    if (light.getTypeID() === Light.LIGHTTYPEID_DIRECTIONALLIGHT) {
                        light.shadowFrustumSize = lightConfig.shadowFrustumSize || 2;
                        isShadowEnabled = true;
                    }
                    else if (light.getTypeID() === Light.LIGHTTYPEID_SPOTLIGHT) {
                        const spotLight = light;
                        if (lightConfig.spotAngle !== undefined) {
                            spotLight.angle = (lightConfig.spotAngle * Math.PI) / 180;
                        }
                        if (spotLight.angle && lightConfig.shadowFieldOfView) {
                            spotLight.shadowAngleScale = lightConfig.shadowFieldOfView / spotLight.angle;
                        }
                        isShadowEnabled = true;
                    }
                    else if (light.getTypeID() === Light.LIGHTTYPEID_POINTLIGHT) {
                        if (lightConfig.shadowFieldOfView) {
                            light.shadowAngle = (lightConfig.shadowFieldOfView * Math.PI) / 180;
                        }
                        isShadowEnabled = true;
                    }
                    let shadowGenerator = light.getShadowGenerator();
                    if (isShadowEnabled && lightConfig.shadowEnabled && this._maxShadows) {
                        const bufferSize = lightConfig.shadowBufferSize || 256;
                        if (!shadowGenerator) {
                            shadowGenerator = new ShadowGenerator(bufferSize, light);
                        }
                        const blurKernel = this.getBlurKernel(light, bufferSize);
                        shadowGenerator.bias = this._shadowGeneratorBias;
                        shadowGenerator.blurKernel = blurKernel;
                        //override defaults
                        extendClassWithConfig(shadowGenerator, lightConfig.shadowConfig || {});
                        // add the focus meshes to the shadow list
                        this._observablesManager &&
                            this._observablesManager.onModelLoadedObservable.add((model) => {
                                this._updateShadowRenderList(shadowGenerator, model);
                            });
                        //if (model) {
                        this._updateShadowRenderList(shadowGenerator);
                        //}
                    }
                    else if (shadowGenerator) {
                        shadowGenerator.dispose();
                    }
                }
            });
            // render priority
            const globalLightsConfiguration = this._globalConfiguration.lights || {};
            Object.keys(globalLightsConfiguration)
                .sort()
                .forEach((name, idx) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // const configuration = globalLightsConfiguration[name];
                const light = this.scene.getLightByName(name);
                // sanity check
                if (!light) {
                    return;
                }
                light.renderPriority = -idx;
            });
        }
        this.onLightsConfiguredObservable.notifyObservers({
            sceneManager: this,
            object: this.scene.lights,
            newConfiguration: lightsConfiguration,
        });
    }
    _updateShadowRenderList(shadowGenerator, model, resetList) {
        const focusMeshes = model ? model.meshes : this.scene.meshes;
        // add the focus meshes to the shadow list
        const shadownMap = shadowGenerator.getShadowMap();
        if (!shadownMap) {
            return;
        }
        if (resetList && shadownMap.renderList) {
            shadownMap.renderList.length = 0;
        }
        else {
            shadownMap.renderList = shadownMap.renderList || [];
        }
        for (let index = 0; index < focusMeshes.length; index++) {
            const mesh = focusMeshes[index];
            if (Tags.MatchesQuery(mesh, "castShadow") && shadownMap.renderList.indexOf(mesh) === -1) {
                shadownMap.renderList.push(mesh);
            }
        }
        if (!this._shadowGroundPlane) {
            if (shadowGenerator.useBlurCloseExponentialShadowMap) {
                const shadowGroundPlane = CreatePlane("shadowGroundPlane", { size: 100 }, this.scene);
                shadowGroundPlane.useVertexColors = false;
                //material isn't ever used in rendering, just used to set back face culling
                shadowGroundPlane.material = new PBRMaterial("shadowGroundPlaneMaterial", this.scene);
                shadowGroundPlane.material.backFaceCulling = false;
                shadowGroundPlane.rotation.x = Math.PI * 0.5;
                shadowGroundPlane.freezeWorldMatrix();
                this._shadowGroundPlane = shadowGroundPlane;
                this.scene.removeMesh(shadowGroundPlane);
            }
        }
        else {
            if (!shadowGenerator.useBlurCloseExponentialShadowMap) {
                this._shadowGroundPlane.dispose();
                this._shadowGroundPlane = null;
            }
        }
        if (this._shadowGroundPlane && shadownMap.renderList.indexOf(this._shadowGroundPlane) === -1) {
            shadownMap.renderList.push(this._shadowGroundPlane);
        }
    }
    _updateGroundMirrorRenderList(model, resetList) {
        if (this.environmentHelper && this.environmentHelper.groundMirror && this.environmentHelper.groundMirror.renderList) {
            const focusMeshes = model ? model.meshes : this.scene.meshes;
            const renderList = this.environmentHelper.groundMirror.renderList;
            if (resetList) {
                renderList.length = 0;
            }
            for (let index = 0; index < focusMeshes.length; index++) {
                const mesh = focusMeshes[index];
                if (renderList.indexOf(mesh) === -1) {
                    renderList.push(mesh);
                }
            }
        }
    }
    /**
     * Gets the shadow map blur kernel according to the light configuration.
     * @param light The light used to generate the shadows
     * @param bufferSize The size of the shadow map
     * @returns the kernel blur size
     */
    getBlurKernel(light, bufferSize) {
        let normalizedBlurKernel = 0.05; // TODO Should come from the config.
        if (light.getTypeID() === Light.LIGHTTYPEID_DIRECTIONALLIGHT) {
            normalizedBlurKernel = normalizedBlurKernel / light.shadowFrustumSize;
        }
        else if (light.getTypeID() === Light.LIGHTTYPEID_POINTLIGHT) {
            normalizedBlurKernel = normalizedBlurKernel / light.shadowAngle;
        }
        else if (light.getTypeID() === Light.LIGHTTYPEID_SPOTLIGHT) {
            normalizedBlurKernel = normalizedBlurKernel / (light.angle * light.shadowAngleScale);
        }
        const minimumBlurKernel = 5 / (bufferSize / 256); //magic number that aims to keep away sawtooth shadows
        const blurKernel = Math.max(bufferSize * normalizedBlurKernel, minimumBlurKernel);
        return blurKernel;
    }
    /**
     * Alters render settings to reduce features based on hardware feature limitations
     * @param enableHDR Allows the viewer to run in HDR mode.
     */
    _handleHardwareLimitations(enableHDR = true) {
        //flip rendering settings switches based on hardware support
        const maxVaryingRows = this._engine.getCaps().maxVaryingVectors;
        const maxFragmentSamplers = this._engine.getCaps().maxTexturesImageUnits;
        //shadows are disabled if there's not enough varyings for a single shadow
        if (maxVaryingRows < 8 || maxFragmentSamplers < 8) {
            this._maxShadows = 0;
        }
        else {
            this._maxShadows = 3;
        }
        //can we render to any >= 16-bit targets (required for HDR)
        const caps = this._engine.getCaps();
        const linearHalfFloatTargets = caps.textureHalfFloatRender && caps.textureHalfFloatLinearFiltering;
        const linearFloatTargets = caps.textureFloatRender && caps.textureFloatLinearFiltering;
        this._hdrSupport = enableHDR && !!(linearFloatTargets || linearHalfFloatTargets);
        if (linearHalfFloatTargets) {
            this._defaultHighpTextureType = Constants.TEXTURETYPE_HALF_FLOAT;
            this._shadowGeneratorBias = 0.002;
        }
        else if (linearFloatTargets) {
            this._defaultHighpTextureType = Constants.TEXTURETYPE_FLOAT;
            this._shadowGeneratorBias = 0.001;
        }
        else {
            this._defaultHighpTextureType = Constants.TEXTURETYPE_UNSIGNED_INT;
            this._shadowGeneratorBias = 0.001;
        }
        this._defaultPipelineTextureType = this._hdrSupport ? this._defaultHighpTextureType : Constants.TEXTURETYPE_UNSIGNED_INT;
    }
    /**
     * Dispose the entire viewer including the scene and the engine
     */
    dispose() {
        // this.onCameraConfiguredObservable.clear();
        this.onEnvironmentConfiguredObservable.clear();
        this.onLightsConfiguredObservable.clear();
        this.onModelsConfiguredObservable.clear();
        this.onSceneConfiguredObservable.clear();
        this.onSceneInitObservable.clear();
        this.onSceneOptimizerConfiguredObservable.clear();
        this.onVRConfiguredObservable.clear();
        if (this.sceneOptimizer) {
            this.sceneOptimizer.stop();
            this.sceneOptimizer.dispose();
        }
        if (this.environmentHelper) {
            this.environmentHelper.dispose();
        }
        this.models.forEach((model) => {
            model.dispose();
        });
        if (this._defaultRenderingPipeline) {
            this._defaultRenderingPipeline.dispose();
        }
        this.models.length = 0;
        if (this.scene) {
            this.scene.dispose();
        }
    }
    /**
     * Get an environment asset url by using the configuration if the path is not absolute.
     * @param url Asset url
     * @returns The Asset url using the `environmentAssetsRootURL` if the url is not an absolute path.
     */
    _getAssetUrl(url) {
        let returnUrl = url;
        if (url && url.toLowerCase().indexOf("//") === -1) {
            if (!this._assetsRootURL) {
                // Tools.Warn("Please, specify the root url of your assets before loading the configuration (labs.environmentAssetsRootURL) or disable the background through the viewer options.");
                return url;
            }
            returnUrl = this._assetsRootURL + returnUrl;
        }
        return returnUrl;
    }
    _setCameraBehavior(name, behaviorConfig) {
        let behavior;
        let type;
        if (typeof behaviorConfig === "object") {
            type = behaviorConfig.type;
        }
        else if (typeof behaviorConfig === "number") {
            type = behaviorConfig;
        }
        else {
            type = this._cameraBehaviorMapping[name];
        }
        if (type === undefined) {
            return;
        }
        const config = typeof behaviorConfig === "object" ? behaviorConfig : {};
        let enabled = true;
        if (typeof behaviorConfig === "boolean") {
            enabled = behaviorConfig;
        }
        // constructing behavior
        switch (type) {
            case 0 /* CameraBehavior.AUTOROTATION */:
                this.camera.useAutoRotationBehavior = enabled;
                behavior = this.camera.autoRotationBehavior;
                break;
            case 1 /* CameraBehavior.BOUNCING */:
                this.camera.useBouncingBehavior = enabled;
                behavior = this.camera.bouncingBehavior;
                break;
            case 2 /* CameraBehavior.FRAMING */:
                this.camera.useFramingBehavior = enabled;
                behavior = this.camera.framingBehavior;
                break;
            default:
                behavior = null;
                break;
        }
        if (behavior) {
            this._cameraBehaviorMapping[name] = type;
            if (typeof behaviorConfig === "object") {
                extendClassWithConfig(behavior, behaviorConfig);
            }
        }
        // post attach configuration. Some functionalities require the attached camera.
        switch (type) {
            case 0 /* CameraBehavior.AUTOROTATION */:
                break;
            case 1 /* CameraBehavior.BOUNCING */:
                break;
            case 2 /* CameraBehavior.FRAMING */:
                this._observablesManager &&
                    this._observablesManager.onModelLoadedObservable.add((model) => {
                        if (config.zoomOnBoundingInfo) {
                            behavior.zoomOnMeshHierarchy(model.rootMesh);
                        }
                    });
                break;
        }
    }
}
//# sourceMappingURL=sceneManager.js.map