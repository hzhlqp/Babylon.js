import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PaneComponent } from "../paneComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { VideoRecorder } from "core/Misc/videoRecorder";
import { Tools } from "core/Misc/tools";
import { EnvironmentTextureTools } from "core/Misc/environmentTextureTools";
import { Texture } from "core/Materials/Textures/texture";
import { SceneSerializer } from "core/Misc/sceneSerializer";
import { Mesh } from "core/Meshes/mesh";
import { FilesInput } from "core/Misc/filesInput";
import { captureEquirectangularFromScene } from "core/Misc/equirectangularCapture";
import { SceneLoader } from "core/Loading/sceneLoader";
import { Reflector } from "core/Misc/reflector";
import { GLTFComponent } from "./tools/gltfComponent";
import { GLTF2Export } from "serializers/glTF/2.0/index";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { NumericInput } from "shared-ui-components/lines/numericInputComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FileMultipleButtonLineComponent } from "shared-ui-components/lines/fileMultipleButtonLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { MessageLineComponent } from "shared-ui-components/lines/messageLineComponent";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { IndentedTextLineComponent } from "shared-ui-components/lines/indentedTextLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import GIF from "gif.js.optimized";
import { Camera } from "core/Cameras/camera";
import { Light } from "core/Lights/light";
import { GLTFFileLoader } from "loaders/glTF/glTFFileLoader";
import { Logger } from "core/Misc/logger";
const envExportImageTypes = [
    { label: "PNG", value: 0, imageType: "image/png" },
    { label: "WebP", value: 1, imageType: "image/webp" },
];
export class ToolsTabComponent extends PaneComponent {
    constructor(props) {
        super(props);
        this._lockObject = new LockObject();
        this._screenShotSize = { precision: 1 };
        this._gifOptions = { width: 512, frequency: 200 };
        this._useWidthHeight = false;
        this._isExportingGltf = false;
        this._gltfExportOptions = { exportDisabledNodes: false, exportSkyboxes: false, exportCameras: false, exportLights: false };
        this._crunchingGIF = false;
        this._reflectorHostname = "localhost";
        this._reflectorPort = 1234;
        this._envOptions = { imageTypeIndex: 0, imageQuality: 0.8 };
        this.state = { tag: "Record video" };
        const sceneImportDefaults = this.props.globalState.sceneImportDefaults;
        if (sceneImportDefaults["overwriteAnimations"] === undefined) {
            sceneImportDefaults["overwriteAnimations"] = true;
        }
        if (sceneImportDefaults["animationGroupLoadingMode"] === undefined) {
            sceneImportDefaults["animationGroupLoadingMode"] = 0 /* SceneLoaderAnimationGroupLoadingMode.Clean */;
        }
    }
    componentDidMount() {
        if (!GLTF2Export) {
            Tools.Warn("GLTF2Export is not available. Make sure to load the serializers library");
            return;
        }
    }
    componentWillUnmount() {
        if (this._videoRecorder) {
            this._videoRecorder.stopRecording();
            this._videoRecorder.dispose();
            this._videoRecorder = null;
        }
        if (this._gifRecorder) {
            this._gifRecorder.render();
            this._gifRecorder = null;
            return;
        }
    }
    captureScreenshot() {
        const scene = this.props.scene;
        if (scene.activeCamera) {
            Tools.CreateScreenshot(scene.getEngine(), scene.activeCamera, this._screenShotSize);
        }
    }
    captureEquirectangular() {
        const scene = this.props.scene;
        if (scene.activeCamera) {
            captureEquirectangularFromScene(scene, { size: 1024, filename: "equirectangular_capture.png" });
        }
    }
    captureRender() {
        const scene = this.props.scene;
        const oldScreenshotSize = {
            height: this._screenShotSize.height,
            width: this._screenShotSize.width,
            precision: this._screenShotSize.precision,
        };
        if (!this._useWidthHeight) {
            this._screenShotSize.width = undefined;
            this._screenShotSize.height = undefined;
        }
        if (scene.activeCamera) {
            Tools.CreateScreenshotUsingRenderTarget(scene.getEngine(), scene.activeCamera, this._screenShotSize, undefined, undefined, 4);
        }
        this._screenShotSize = oldScreenshotSize;
    }
    recordVideo() {
        if (this._videoRecorder && this._videoRecorder.isRecording) {
            this._videoRecorder.stopRecording();
            return;
        }
        const scene = this.props.scene;
        if (!this._videoRecorder) {
            this._videoRecorder = new VideoRecorder(scene.getEngine());
        }
        this._videoRecorder.startRecording().then(() => {
            this.setState({ tag: "Record video" });
        });
        this.setState({ tag: "Stop recording" });
    }
    recordGIFInternal() {
        const workerUrl = URL.createObjectURL(this._gifWorkerBlob);
        this._gifRecorder = new GIF({
            workers: 2,
            quality: 10,
            workerScript: workerUrl,
        });
        const scene = this.props.scene;
        const engine = scene.getEngine();
        this._previousRenderingScale = engine.getHardwareScalingLevel();
        engine.setHardwareScalingLevel(engine.getRenderWidth() / this._gifOptions.width ?? 1);
        const intervalId = setInterval(() => {
            if (!this._gifRecorder) {
                clearInterval(intervalId);
                return;
            }
            this._gifRecorder.addFrame(engine.getRenderingCanvas(), { delay: 0, copy: true });
        }, this._gifOptions.frequency);
        this._gifRecorder.on("finished", (blob) => {
            this._crunchingGIF = false;
            Tools.Download(blob, "record.gif");
            this.forceUpdate();
            URL.revokeObjectURL(workerUrl);
            engine.setHardwareScalingLevel(this._previousRenderingScale);
        });
        this.forceUpdate();
    }
    recordGIF() {
        if (this._gifRecorder) {
            this._crunchingGIF = true;
            this.forceUpdate();
            this._gifRecorder.render();
            this._gifRecorder = null;
            return;
        }
        if (this._gifWorkerBlob) {
            this.recordGIFInternal();
            return;
        }
        Tools.LoadFileAsync("https://cdn.jsdelivr.net/gh//terikon/gif.js.optimized@0.1.6/dist/gif.worker.js").then((value) => {
            this._gifWorkerBlob = new Blob([value], {
                type: "application/javascript",
            });
            this.recordGIFInternal();
        });
    }
    importAnimations(event) {
        const scene = this.props.scene;
        const overwriteAnimations = this.props.globalState.sceneImportDefaults["overwriteAnimations"];
        const animationGroupLoadingMode = this.props.globalState.sceneImportDefaults["animationGroupLoadingMode"];
        const reload = function (sceneFile) {
            // If a scene file has been provided
            if (sceneFile) {
                const onSuccess = function (scene) {
                    if (scene.animationGroups.length > 0) {
                        const currentGroup = scene.animationGroups[0];
                        currentGroup.play(true);
                    }
                };
                SceneLoader.ImportAnimationsAsync("file:", sceneFile, scene, overwriteAnimations, animationGroupLoadingMode, null, onSuccess);
            }
        };
        const filesInputAnimation = new FilesInput(scene.getEngine(), scene, () => { }, () => { }, () => { }, () => { }, () => { }, reload, () => { });
        filesInputAnimation.loadFiles(event);
    }
    exportGLTF() {
        const scene = this.props.scene;
        this._isExportingGltf = true;
        this.forceUpdate();
        const shouldExport = (node) => {
            if (!this._gltfExportOptions.exportDisabledNodes) {
                if (!node.isEnabled()) {
                    return false;
                }
            }
            if (!this._gltfExportOptions.exportSkyboxes) {
                if (node instanceof Mesh) {
                    if (node.material) {
                        const material = node.material;
                        const reflectionTexture = material.reflectionTexture;
                        if (reflectionTexture && reflectionTexture.coordinatesMode === Texture.SKYBOX_MODE) {
                            return false;
                        }
                    }
                }
            }
            if (!this._gltfExportOptions.exportCameras) {
                if (node instanceof Camera) {
                    return false;
                }
            }
            if (!this._gltfExportOptions.exportLights) {
                if (node instanceof Light) {
                    return false;
                }
            }
            return true;
        };
        GLTF2Export.GLBAsync(scene, "scene", { shouldExportNode: (node) => shouldExport(node) }).then((glb) => {
            this._isExportingGltf = false;
            this.forceUpdate();
            glb.downloadFiles();
        }, () => {
            this._isExportingGltf = false;
            this.forceUpdate();
        });
    }
    exportBabylon() {
        const scene = this.props.scene;
        const strScene = JSON.stringify(SceneSerializer.Serialize(scene));
        const blob = new Blob([strScene], { type: "octet/stream" });
        Tools.Download(blob, "scene.babylon");
    }
    createEnvTexture() {
        const scene = this.props.scene;
        EnvironmentTextureTools.CreateEnvTextureAsync(scene.environmentTexture, {
            imageType: envExportImageTypes[this._envOptions.imageTypeIndex].imageType,
            imageQuality: this._envOptions.imageQuality,
        })
            .then((buffer) => {
            const blob = new Blob([buffer], { type: "octet/stream" });
            Tools.Download(blob, "environment.env");
        })
            .catch((error) => {
            Logger.Error(error);
            alert(error);
        });
    }
    exportReplay() {
        this.props.globalState.recorder.export();
        this.forceUpdate();
    }
    startRecording() {
        this.props.globalState.recorder.trackScene(this.props.scene);
        this.forceUpdate();
    }
    applyDelta(file) {
        Tools.ReadFile(file, (data) => {
            this.props.globalState.recorder.applyDelta(data, this.props.scene);
            this.forceUpdate();
        });
    }
    connectReflector() {
        if (this._reflector) {
            this._reflector.close();
        }
        this._reflector = new Reflector(this.props.scene, this._reflectorHostname, this._reflectorPort);
    }
    render() {
        const scene = this.props.scene;
        if (!scene) {
            return null;
        }
        const sceneImportDefaults = this.props.globalState.sceneImportDefaults;
        const animationGroupLoadingModes = [
            { label: "Clean", value: 0 /* SceneLoaderAnimationGroupLoadingMode.Clean */ },
            { label: "Stop", value: 1 /* SceneLoaderAnimationGroupLoadingMode.Stop */ },
            { label: "Sync", value: 2 /* SceneLoaderAnimationGroupLoadingMode.Sync */ },
            { label: "NoSync", value: 3 /* SceneLoaderAnimationGroupLoadingMode.NoSync */ },
        ];
        return (_jsxs("div", { className: "pane", children: [_jsxs(LineContainerComponent, { title: "CAPTURE", selection: this.props.globalState, children: [_jsx(ButtonLineComponent, { label: "Screenshot", onClick: () => this.captureScreenshot() }), _jsx(ButtonLineComponent, { label: "Generate equirectangular capture", onClick: () => this.captureEquirectangular() }), _jsx(ButtonLineComponent, { label: this.state.tag, onClick: () => this.recordVideo() })] }), _jsxs(LineContainerComponent, { title: "CAPTURE WITH RTT", selection: this.props.globalState, children: [_jsx(ButtonLineComponent, { label: "Capture", onClick: () => this.captureRender() }), _jsxs("div", { className: "vector3Line", children: [_jsx(FloatLineComponent, { lockObject: this._lockObject, label: "Precision", target: this._screenShotSize, propertyName: "precision", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Use Width/Height", onSelect: (value) => {
                                        this._useWidthHeight = value;
                                        this.forceUpdate();
                                    }, isSelected: () => this._useWidthHeight }), this._useWidthHeight && (_jsxs("div", { className: "secondLine", children: [_jsx(NumericInput, { lockObject: this._lockObject, label: "Width", precision: 0, step: 1, value: this._screenShotSize.width ? this._screenShotSize.width : 512, onChange: (value) => (this._screenShotSize.width = value) }), _jsx(NumericInput, { lockObject: this._lockObject, label: "Height", precision: 0, step: 1, value: this._screenShotSize.height ? this._screenShotSize.height : 512, onChange: (value) => (this._screenShotSize.height = value) })] }))] })] }), _jsxs(LineContainerComponent, { title: "GIF", selection: this.props.globalState, children: [this._crunchingGIF && _jsx(MessageLineComponent, { text: "Creating the GIF file..." }), !this._crunchingGIF && _jsx(ButtonLineComponent, { label: this._gifRecorder ? "Stop" : "Record", onClick: () => this.recordGIF() }), !this._crunchingGIF && !this._gifRecorder && (_jsxs(_Fragment, { children: [_jsx(FloatLineComponent, { lockObject: this._lockObject, label: "Resolution", isInteger: true, target: this._gifOptions, propertyName: "width" }), _jsx(FloatLineComponent, { lockObject: this._lockObject, label: "Frequency (ms)", isInteger: true, target: this._gifOptions, propertyName: "frequency" })] }))] }), _jsxs(LineContainerComponent, { title: "REPLAY", selection: this.props.globalState, children: [!this.props.globalState.recorder.isRecording && _jsx(ButtonLineComponent, { label: "Start recording", onClick: () => this.startRecording() }), this.props.globalState.recorder.isRecording && _jsx(IndentedTextLineComponent, { value: "Record in progress" }), this.props.globalState.recorder.isRecording && _jsx(ButtonLineComponent, { label: "Generate delta file", onClick: () => this.exportReplay() }), _jsx(FileButtonLine, { label: `Apply delta file`, onClick: (file) => this.applyDelta(file), accept: ".json" })] }), _jsxs(LineContainerComponent, { title: "SCENE IMPORT", selection: this.props.globalState, children: [_jsx(FileMultipleButtonLineComponent, { label: "Import animations", accept: "gltf", onClick: (evt) => this.importAnimations(evt) }), _jsx(CheckBoxLineComponent, { label: "Overwrite animations", target: sceneImportDefaults, propertyName: "overwriteAnimations", onSelect: (value) => {
                                sceneImportDefaults["overwriteAnimations"] = value;
                                this.forceUpdate();
                            } }), sceneImportDefaults["overwriteAnimations"] === false && (_jsx(OptionsLine, { label: "Animation merge mode", options: animationGroupLoadingModes, target: sceneImportDefaults, propertyName: "animationGroupLoadingMode" }))] }), _jsxs(LineContainerComponent, { title: "SCENE EXPORT", selection: this.props.globalState, children: [_jsx(ButtonLineComponent, { label: "Export to Babylon", onClick: () => this.exportBabylon() }), !scene.getEngine().premultipliedAlpha && scene.environmentTexture && scene.environmentTexture._prefiltered && scene.activeCamera && (_jsxs(_Fragment, { children: [_jsx(ButtonLineComponent, { label: "Generate .env texture", onClick: () => this.createEnvTexture() }), _jsx(OptionsLine, { label: "Image type", options: envExportImageTypes, target: this._envOptions, propertyName: "imageTypeIndex", onSelect: () => {
                                        this.forceUpdate();
                                    } }), this._envOptions.imageTypeIndex > 0 && (_jsx(FloatLineComponent, { lockObject: this._lockObject, label: "Quality", isInteger: false, min: 0, max: 1, target: this._envOptions, propertyName: "imageQuality" }))] }))] }), _jsxs(LineContainerComponent, { title: "GLTF EXPORT", selection: this.props.globalState, children: [this._isExportingGltf && _jsx(TextLineComponent, { label: "Please wait..exporting", ignoreValue: true }), !this._isExportingGltf && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Export Disabled Nodes", isSelected: () => this._gltfExportOptions.exportDisabledNodes, onSelect: (value) => (this._gltfExportOptions.exportDisabledNodes = value) }), _jsx(CheckBoxLineComponent, { label: "Export Skybox", isSelected: () => this._gltfExportOptions.exportSkyboxes, onSelect: (value) => (this._gltfExportOptions.exportSkyboxes = value) }), _jsx(CheckBoxLineComponent, { label: "Export Cameras", isSelected: () => this._gltfExportOptions.exportCameras, onSelect: (value) => (this._gltfExportOptions.exportCameras = value) }), _jsx(CheckBoxLineComponent, { label: "Export Lights", isSelected: () => this._gltfExportOptions.exportLights, onSelect: (value) => (this._gltfExportOptions.exportLights = value) }), _jsx(ButtonLineComponent, { label: "Export to GLB", onClick: () => this.exportGLTF() })] }))] }), GLTFFileLoader && _jsx(GLTFComponent, { lockObject: this._lockObject, scene: scene, globalState: this.props.globalState }), _jsxs(LineContainerComponent, { title: "REFLECTOR", selection: this.props.globalState, children: [_jsx(TextInputLineComponent, { lockObject: this._lockObject, label: "Hostname", target: this, propertyName: "_reflectorHostname" }), _jsx(FloatLineComponent, { lockObject: this._lockObject, label: "Port", target: this, propertyName: "_reflectorPort", isInteger: true }), _jsx(ButtonLineComponent, { label: "Connect", onClick: () => this.connectReflector() })] })] }));
    }
}
//# sourceMappingURL=toolsTabComponent.js.map