import { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import { WebGPUEngine } from "core/Engines/webgpuEngine";
import { Scene } from "core/scene";
import { Vector3 } from "core/Maths/math.vector";
import { HemisphericLight } from "core/Lights/hemisphericLight";
import { ArcRotateCamera } from "core/Cameras/arcRotateCamera";
import { PreviewType } from "./previewType";
import { SceneLoader } from "core/Loading/sceneLoader";
import { TransformNode } from "core/Meshes/transformNode";
import { DirectionalLight } from "core/Lights/directionalLight";
import { LogEntry } from "../log/logComponent";
import { PointerEventTypes } from "core/Events/pointerEvents";
import { Color3, Color4 } from "core/Maths/math.color";
import { Constants } from "core/Engines/constants";
import { CurrentScreenBlock } from "core/Materials/Node/Blocks/Dual/currentScreenBlock";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { ParticleSystem } from "core/Particles/particleSystem";
import { ParticleHelper } from "core/Particles/particleHelper";
import { Texture } from "core/Materials/Textures/texture";
import { ParticleTextureBlock } from "core/Materials/Node/Blocks/Particle/particleTextureBlock";
import { ReadFile } from "core/Misc/fileTools";
import { CubeTexture } from "core/Materials/Textures/cubeTexture";
import { Layer } from "core/Layers/layer";
import { DataStorage } from "core/Misc/dataStorage";
import { CreateTorus } from "core/Meshes/Builders/torusBuilder";
import { FilesInput } from "core/Misc/filesInput";
import "core/Helpers/sceneHelpers";
import "core/Rendering/depthRendererSceneComponent";
import { Engine } from "core/Engines/engine";
import { Animation } from "core/Animations/animation";
const dontSerializeTextureContent = true;
/**
 *
 */
export class PreviewManager {
    _serializeMaterial() {
        const nodeMaterial = this._nodeMaterial;
        let fullSerialization = false;
        if (dontSerializeTextureContent) {
            const textureBlocks = nodeMaterial.getAllTextureBlocks();
            for (const block of textureBlocks) {
                const texture = block.texture;
                if (!texture || block.hasImageSource) {
                    continue;
                }
                let found = false;
                for (const localTexture of this._engine.getLoadedTexturesCache()) {
                    if (localTexture.uniqueId === texture._texture?.uniqueId) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    fullSerialization = true;
                    break;
                }
            }
        }
        const bufferSerializationState = Texture.SerializeBuffers;
        if (dontSerializeTextureContent) {
            Texture.SerializeBuffers = fullSerialization;
            Texture._SerializeInternalTextureUniqueId = true;
        }
        const serializationObject = nodeMaterial.serialize();
        Texture.SerializeBuffers = bufferSerializationState;
        Texture._SerializeInternalTextureUniqueId = false;
        return serializationObject;
    }
    /**
     * Create a new Preview Manager
     * @param targetCanvas defines the canvas to render to
     * @param globalState defines the global state
     */
    constructor(targetCanvas, globalState) {
        this._nodeMaterial = globalState.nodeMaterial;
        this._globalState = globalState;
        this._onBuildObserver = this._nodeMaterial.onBuildObservable.add(() => {
            this._updatePreview();
        });
        this._onPreviewCommandActivatedObserver = globalState.stateManager.onPreviewCommandActivated.add((forceRefresh) => {
            if (forceRefresh) {
                this._currentType = -1;
                this._scene.disableDepthRenderer();
            }
            this._refreshPreviewMesh();
        });
        this._onLightUpdatedObserver = globalState.onLightUpdated.add(() => {
            this._prepareLights();
        });
        this._onBackgroundHDRUpdatedObserver = globalState.onBackgroundHDRUpdated.add(() => {
            this._prepareBackgroundHDR();
        });
        this._onUpdateRequiredObserver = globalState.stateManager.onUpdateRequiredObservable.add(() => {
            this._updatePreview();
        });
        this._onPreviewBackgroundChangedObserver = globalState.onPreviewBackgroundChanged.add(() => {
            this._scene.clearColor = this._globalState.backgroundColor;
        });
        this._onAnimationCommandActivatedObserver = globalState.onAnimationCommandActivated.add(() => {
            this._handleAnimations();
        });
        this._onBackFaceCullingChangedObserver = globalState.onBackFaceCullingChanged.add(() => {
            this._material.backFaceCulling = this._globalState.backFaceCulling;
        });
        this._onDepthPrePassChangedObserver = globalState.onDepthPrePassChanged.add(() => {
            this._material.needDepthPrePass = this._globalState.depthPrePass;
        });
        this._initAsync(targetCanvas);
    }
    async _initAsync(targetCanvas) {
        if (this._nodeMaterial.shaderLanguage === 1 /* ShaderLanguage.WGSL */) {
            this._engine = new WebGPUEngine(targetCanvas);
            await this._engine.initAsync();
        }
        else {
            this._engine = new Engine(targetCanvas);
        }
        this._scene = new Scene(this._engine);
        this._scene.clearColor = this._globalState.backgroundColor;
        this._scene.ambientColor = new Color3(1, 1, 1);
        this._camera = new ArcRotateCamera("Camera", 0, 0.8, 4, Vector3.Zero(), this._scene);
        this._camera.lowerRadiusLimit = 3;
        this._camera.upperRadiusLimit = 10;
        this._camera.wheelPrecision = 20;
        this._camera.minZ = 0.1;
        this._camera.attachControl(false);
        this._lightParent = new TransformNode("LightParent", this._scene);
        this._globalState.filesInput = new FilesInput(this._engine, this._scene, (_, scene) => {
            this._meshes.push(...scene.meshes);
            this._prepareScene();
        }, null, null, null, null, null, () => {
            this._reset();
        }, true);
        const canvas = this._engine.getRenderingCanvas();
        if (canvas) {
            const onDrag = (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
            };
            canvas.addEventListener("dragenter", onDrag, false);
            canvas.addEventListener("dragover", onDrag, false);
            const onDrop = (evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                this._globalState.onDropEventReceivedObservable.notifyObservers(evt);
            };
            canvas.addEventListener("drop", onDrop, false);
        }
        this._refreshPreviewMesh();
        this._engine.runRenderLoop(() => {
            this._engine.resize();
            this._scene.render();
        });
        let lastOffsetX = undefined;
        const lightRotationSpeed = 0.01;
        this._scene.onPointerObservable.add((evt) => {
            if (this._globalState.controlCamera) {
                return;
            }
            if (evt.type === PointerEventTypes.POINTERUP) {
                lastOffsetX = undefined;
                return;
            }
            if (evt.event.buttons !== 1) {
                return;
            }
            if (lastOffsetX === undefined) {
                lastOffsetX = evt.event.offsetX;
            }
            const rotateLighting = (lastOffsetX - evt.event.offsetX) * lightRotationSpeed;
            this._lightParent.rotation.y += rotateLighting;
            lastOffsetX = evt.event.offsetX;
        });
    }
    _reset() {
        this._globalState.envType = PreviewType.Room;
        this._globalState.previewType = PreviewType.Box;
        this._globalState.listOfCustomPreviewFiles = [];
        this._scene.meshes.forEach((m) => m.dispose());
        this._globalState.onRefreshPreviewMeshControlComponentRequiredObservable.notifyObservers();
        this._refreshPreviewMesh(true);
    }
    _handleAnimations() {
        this._scene.stopAllAnimations();
        if (this._globalState.rotatePreview) {
            for (const root of this._scene.rootNodes) {
                const transformNode = root;
                if (transformNode.getClassName() === "TransformNode" || transformNode.getClassName() === "Mesh" || transformNode.getClassName() === "GroundMesh") {
                    if (transformNode.rotationQuaternion) {
                        transformNode.rotation = transformNode.rotationQuaternion.toEulerAngles();
                        transformNode.rotationQuaternion = null;
                    }
                    Animation.CreateAndStartAnimation("turnTable", root, "rotation.y", 60, 1200, transformNode.rotation.y, transformNode.rotation.y + 2 * Math.PI, 1);
                }
            }
        }
    }
    _prepareLights() {
        // Remove current lights
        const currentLights = this._scene.lights.slice(0);
        for (const light of currentLights) {
            light.dispose();
        }
        // Create new lights based on settings
        if (this._globalState.hemisphericLight) {
            new HemisphericLight("Hemispheric light", new Vector3(0, 1, 0), this._scene);
        }
        if (this._globalState.directionalLight0) {
            const dir0 = new DirectionalLight("Directional light #0", new Vector3(0.841626576496605, -0.2193391004130599, -0.49351298337996535), this._scene);
            dir0.intensity = 0.9;
            dir0.diffuse = new Color3(0.9294117647058824, 0.9725490196078431, 0.996078431372549);
            dir0.specular = new Color3(0.9294117647058824, 0.9725490196078431, 0.996078431372549);
            dir0.parent = this._lightParent;
        }
        if (this._globalState.directionalLight1) {
            const dir1 = new DirectionalLight("Directional light #1", new Vector3(-0.9519937437504213, -0.24389315636999764, -0.1849974057546125), this._scene);
            dir1.intensity = 1.2;
            dir1.specular = new Color3(0.9803921568627451, 0.9529411764705882, 0.7725490196078432);
            dir1.diffuse = new Color3(0.9803921568627451, 0.9529411764705882, 0.7725490196078432);
            dir1.parent = this._lightParent;
        }
    }
    _prepareBackgroundHDR() {
        this._scene.environmentTexture = null;
        if (this._hdrSkyBox) {
            this._scene.removeMesh(this._hdrSkyBox);
        }
        if (this._globalState.backgroundHDR) {
            this._scene.environmentTexture = this._hdrTexture;
            this._hdrSkyBox = this._scene.createDefaultSkybox(this._hdrTexture);
        }
        this._updatePreview();
    }
    _prepareScene() {
        this._camera.useFramingBehavior = this._globalState.mode === NodeMaterialModes.Material;
        switch (this._globalState.mode) {
            case NodeMaterialModes.Material: {
                this._prepareLights();
                if (!this._globalState.envFile) {
                    this._globalState.backgroundHDR = false;
                }
                this._prepareBackgroundHDR();
                const framingBehavior = this._camera.getBehaviorByName("Framing");
                setTimeout(() => {
                    // Let the behavior activate first
                    framingBehavior.framingTime = 0;
                    framingBehavior.elevationReturnTime = -1;
                    if (this._scene.meshes.length) {
                        const worldExtends = this._scene.getWorldExtends();
                        this._camera.lowerRadiusLimit = null;
                        this._camera.upperRadiusLimit = null;
                        framingBehavior.zoomOnBoundingInfo(worldExtends.min, worldExtends.max);
                    }
                    this._camera.pinchPrecision = 200 / this._camera.radius;
                    this._camera.upperRadiusLimit = 5 * this._camera.radius;
                });
                this._camera.wheelDeltaPercentage = 0.01;
                this._camera.pinchDeltaPercentage = 0.01;
                // Animations
                this._handleAnimations();
                break;
            }
            case NodeMaterialModes.PostProcess:
            case NodeMaterialModes.ProceduralTexture: {
                this._camera.radius = 4;
                this._camera.upperRadiusLimit = 10;
                break;
            }
            case NodeMaterialModes.Particle: {
                this._camera.radius = this._globalState.previewType === PreviewType.Explosion ? 50 : this._globalState.previewType === PreviewType.DefaultParticleSystem ? 6 : 20;
                this._camera.upperRadiusLimit = 5000;
                this._globalState.particleSystemBlendMode = this._particleSystem?.blendMode ?? ParticleSystem.BLENDMODE_STANDARD;
                break;
            }
            case NodeMaterialModes.GaussianSplatting: {
                this._camera.radius = 6;
                this._camera.upperRadiusLimit = 5000;
                break;
            }
        }
        // Material
        this._updatePreview();
    }
    _refreshPreviewMesh(force) {
        if (this._globalState.mode === NodeMaterialModes.Material) {
            switch (this._globalState.envType) {
                case PreviewType.Room:
                    this._hdrTexture = new CubeTexture(PreviewManager.DefaultEnvironmentURL, this._scene);
                    if (this._hdrTexture) {
                        this._prepareBackgroundHDR();
                    }
                    break;
                case PreviewType.Custom: {
                    const blob = new Blob([this._globalState.envFile], { type: "octet/stream" });
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const dataurl = evt.target.result;
                        this._hdrTexture = new CubeTexture(dataurl, this._scene, undefined, false, undefined, undefined, undefined, undefined, undefined, ".env");
                        this._prepareBackgroundHDR();
                    };
                    reader.readAsDataURL(blob);
                    break;
                }
            }
        }
        else {
            this._scene.environmentTexture = null;
        }
        if (this._currentType !== this._globalState.previewType || this._currentType === PreviewType.Custom || force) {
            this._currentType = this._globalState.previewType;
            if (this._meshes && this._meshes.length) {
                for (const mesh of this._meshes) {
                    mesh.dispose();
                }
            }
            this._meshes = [];
            if (this._layer) {
                this._layer.dispose();
                this._layer = null;
            }
            const lights = this._scene.lights.slice(0);
            for (const light of lights) {
                light.dispose();
            }
            this._engine.releaseEffects();
            if (this._particleSystem) {
                this._particleSystem.onBeforeDrawParticlesObservable.clear();
                this._particleSystem.onDisposeObservable.clear();
                this._particleSystem.stop();
                this._particleSystem.dispose();
                this._particleSystem = null;
            }
            SceneLoader.ShowLoadingScreen = false;
            this._globalState.onIsLoadingChanged.notifyObservers(true);
            const bakeTransformation = (mesh) => {
                mesh.bakeCurrentTransformIntoVertices();
                mesh.refreshBoundingInfo();
                mesh.parent = null;
            };
            if (this._globalState.mode === NodeMaterialModes.Material) {
                switch (this._globalState.previewType) {
                    case PreviewType.Box:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/meshes/", "roundedCube.glb", this._scene).then(() => {
                            bakeTransformation(this._scene.getMeshByName("__root__").getChildMeshes(true)[0]);
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        return;
                    case PreviewType.Sphere:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/meshes/", "previewSphere.glb", this._scene).then(() => {
                            bakeTransformation(this._scene.getMeshByName("__root__").getChildMeshes(true)[0]);
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        break;
                    case PreviewType.Torus:
                        this._meshes.push(CreateTorus("dummy-torus", {
                            diameter: 2,
                            thickness: 0.5,
                            tessellation: 32,
                        }, this._scene));
                        break;
                    case PreviewType.Cylinder:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/meshes/", "roundedCylinder.glb", this._scene).then(() => {
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        return;
                    case PreviewType.Plane: {
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/meshes/", "highPolyPlane.glb", this._scene).then(() => {
                            bakeTransformation(this._scene.getMeshByName("__root__").getChildMeshes(true)[0]);
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        break;
                    }
                    case PreviewType.ShaderBall:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/meshes/", "shaderBall.glb", this._scene).then(() => {
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        return;
                    case PreviewType.Custom:
                        this._globalState.filesInput.loadFiles({ target: { files: this._globalState.listOfCustomPreviewFiles } });
                        return;
                }
            }
            else if (this._globalState.mode === NodeMaterialModes.ProceduralTexture) {
                this._layer = new Layer("proceduralLayer", null, this._scene, false);
            }
            else if (this._globalState.mode === NodeMaterialModes.Particle) {
                switch (this._globalState.previewType) {
                    case PreviewType.DefaultParticleSystem:
                        this._particleSystem = ParticleHelper.CreateDefault(new Vector3(0, 0, 0), 500, this._scene);
                        this._particleSystem.blendMode = DataStorage.ReadNumber("DefaultParticleSystemBlendMode", ParticleSystem.BLENDMODE_ONEONE);
                        this._particleSystem.start();
                        break;
                    case PreviewType.Bubbles:
                        this._particleSystem = new ParticleSystem("particles", 4000, this._scene);
                        this._particleSystem.particleTexture = new Texture("https://assets.babylonjs.com/particles/textures/explosion/Flare.png", this._scene);
                        this._particleSystem.minSize = 0.1;
                        this._particleSystem.maxSize = 1.0;
                        this._particleSystem.minLifeTime = 0.5;
                        this._particleSystem.maxLifeTime = 5.0;
                        this._particleSystem.minEmitPower = 0.5;
                        this._particleSystem.maxEmitPower = 3.0;
                        this._particleSystem.createBoxEmitter(new Vector3(-1, 1, -1), new Vector3(1, 1, 1), new Vector3(-0.1, -0.1, -0.1), new Vector3(0.1, 0.1, 0.1));
                        this._particleSystem.emitRate = 100;
                        this._particleSystem.blendMode = DataStorage.ReadNumber("DefaultParticleSystemBlendMode", ParticleSystem.BLENDMODE_ONEONE);
                        this._particleSystem.color1 = new Color4(1, 1, 0, 1);
                        this._particleSystem.color2 = new Color4(1, 0.5, 0, 1);
                        this._particleSystem.gravity = new Vector3(0, -1.0, 0);
                        this._particleSystem.start();
                        break;
                    case PreviewType.Explosion:
                        this._loadParticleSystem(this._globalState.previewType, 1);
                        return;
                    case PreviewType.Fire:
                    case PreviewType.Rain:
                    case PreviewType.Smoke:
                        this._loadParticleSystem(this._globalState.previewType);
                        return;
                    case PreviewType.Custom:
                        ReadFile(this._globalState.previewFile, (json) => {
                            this._particleSystem = ParticleSystem.Parse(JSON.parse(json), this._scene, "");
                            this._particleSystem.start();
                            this._prepareScene();
                        }, undefined, false, (error) => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                        return;
                }
            }
            else if (this._globalState.mode === NodeMaterialModes.GaussianSplatting) {
                switch (this._globalState.previewType) {
                    case PreviewType.Parrot:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/splats/", "gs_Sqwakers_trimed.splat", this._scene).then(() => {
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        break;
                    case PreviewType.BricksSkull:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/splats/", "gs_Skull.splat", this._scene).then(() => {
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        break;
                    case PreviewType.Plants:
                        SceneLoader.AppendAsync("https://assets.babylonjs.com/splats/", "gs_Plants.splat", this._scene).then(() => {
                            this._meshes.push(...this._scene.meshes);
                            this._prepareScene();
                        });
                        break;
                }
            }
        }
    }
    _loadParticleSystem(particleNumber, systemIndex = 0, prepareScene = true) {
        let name = "";
        switch (particleNumber) {
            case PreviewType.Explosion:
                name = "explosion";
                break;
            case PreviewType.Fire:
                name = "fire";
                break;
            case PreviewType.Rain:
                name = "rain";
                break;
            case PreviewType.Smoke:
                name = "smoke";
                break;
        }
        ParticleHelper.CreateAsync(name, this._scene).then((set) => {
            for (let i = 0; i < set.systems.length; ++i) {
                if (i == systemIndex) {
                    this._particleSystem = set.systems[i];
                    this._particleSystem.disposeOnStop = true;
                    this._particleSystem.onDisposeObservable.add(() => {
                        this._loadParticleSystem(particleNumber, systemIndex, false);
                    });
                    this._particleSystem.start();
                }
                else {
                    set.systems[i].dispose();
                }
            }
            if (prepareScene) {
                this._prepareScene();
            }
            else {
                this._updatePreview();
            }
        });
    }
    _forceCompilationAsync(material, mesh) {
        return material.forceCompilationAsync(mesh);
    }
    _updatePreview() {
        try {
            const serializationObject = this._serializeMaterial();
            const store = NodeMaterial.IgnoreTexturesAtLoadTime;
            NodeMaterial.IgnoreTexturesAtLoadTime = false;
            const tempMaterial = NodeMaterial.Parse(serializationObject, this._scene, "", this._nodeMaterial.shaderLanguage);
            NodeMaterial.IgnoreTexturesAtLoadTime = store;
            tempMaterial.backFaceCulling = this._globalState.backFaceCulling;
            tempMaterial.needDepthPrePass = this._globalState.depthPrePass;
            if (this._postprocess) {
                this._postprocess.dispose(this._camera);
                this._postprocess = null;
            }
            if (this._proceduralTexture) {
                this._proceduralTexture.dispose();
                this._proceduralTexture = null;
            }
            switch (this._globalState.mode) {
                case NodeMaterialModes.PostProcess: {
                    this._globalState.onIsLoadingChanged.notifyObservers(false);
                    this._postprocess = tempMaterial.createPostProcess(this._camera, 1.0, Constants.TEXTURE_NEAREST_SAMPLINGMODE, this._engine);
                    const currentScreen = tempMaterial.getBlockByPredicate((block) => block instanceof CurrentScreenBlock);
                    if (currentScreen && this._postprocess) {
                        this._postprocess.externalTextureSamplerBinding = true;
                        this._postprocess.onApplyObservable.add((effect) => {
                            effect.setTexture("textureSampler", currentScreen.texture);
                        });
                    }
                    if (this._material) {
                        this._material.dispose();
                    }
                    this._material = tempMaterial;
                    break;
                }
                case NodeMaterialModes.ProceduralTexture: {
                    this._globalState.onIsLoadingChanged.notifyObservers(false);
                    this._proceduralTexture = tempMaterial.createProceduralTexture(512, this._scene);
                    if (this._material) {
                        this._material.dispose();
                    }
                    if (this._layer) {
                        this._layer.texture = this._proceduralTexture;
                    }
                    break;
                }
                case NodeMaterialModes.Particle: {
                    this._globalState.onIsLoadingChanged.notifyObservers(false);
                    this._particleSystem.onBeforeDrawParticlesObservable.clear();
                    this._particleSystem.onBeforeDrawParticlesObservable.add((effect) => {
                        const textureBlock = tempMaterial.getBlockByPredicate((block) => block instanceof ParticleTextureBlock);
                        if (textureBlock && textureBlock.texture && effect) {
                            effect.setTexture("diffuseSampler", textureBlock.texture);
                        }
                    });
                    tempMaterial.createEffectForParticles(this._particleSystem);
                    this._particleSystem.blendMode = this._globalState.particleSystemBlendMode;
                    if (this._material) {
                        this._material.dispose();
                    }
                    this._material = tempMaterial;
                    break;
                }
                default: {
                    if (this._meshes.length) {
                        const tasks = this._meshes.map((m) => {
                            m.hasVertexAlpha = false;
                            return this._forceCompilationAsync(tempMaterial, m);
                        });
                        Promise.all(tasks)
                            .then(() => {
                            for (const mesh of this._meshes) {
                                mesh.material = tempMaterial;
                            }
                            if (this._material) {
                                this._material.dispose();
                            }
                            this._material = tempMaterial;
                            this._globalState.onIsLoadingChanged.notifyObservers(false);
                        })
                            .catch((reason) => {
                            this._globalState.onLogRequiredObservable.notifyObservers(new LogEntry("Shader compilation error:\r\n" + reason, true));
                            this._globalState.onIsLoadingChanged.notifyObservers(false);
                        });
                    }
                    else {
                        this._material = tempMaterial;
                    }
                    break;
                }
            }
        }
        catch (err) {
            // Ignore the error
            this._globalState.onIsLoadingChanged.notifyObservers(false);
        }
    }
    dispose() {
        this._nodeMaterial.onBuildObservable.remove(this._onBuildObserver);
        this._globalState.stateManager.onPreviewCommandActivated.remove(this._onPreviewCommandActivatedObserver);
        this._globalState.stateManager.onUpdateRequiredObservable.remove(this._onUpdateRequiredObserver);
        this._globalState.onAnimationCommandActivated.remove(this._onAnimationCommandActivatedObserver);
        this._globalState.onPreviewBackgroundChanged.remove(this._onPreviewBackgroundChangedObserver);
        this._globalState.onBackFaceCullingChanged.remove(this._onBackFaceCullingChangedObserver);
        this._globalState.onDepthPrePassChanged.remove(this._onDepthPrePassChangedObserver);
        this._globalState.onLightUpdated.remove(this._onLightUpdatedObserver);
        this._globalState.onBackgroundHDRUpdated.remove(this._onBackgroundHDRUpdatedObserver);
        if (this._material) {
            this._material.dispose(false, true);
        }
        this._camera.dispose();
        for (const mesh of this._meshes) {
            mesh.dispose();
        }
        this._scene.dispose();
        this._engine.dispose();
    }
}
/**
 * Default Environment URL
 */
PreviewManager.DefaultEnvironmentURL = "https://assets.babylonjs.com/environments/environmentSpecular.env";
//# sourceMappingURL=previewManager.js.map