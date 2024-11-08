import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Observable } from "core/Misc/observable";
import { Tools } from "core/Misc/tools";
import { CubeTexture } from "core/Materials/Textures/cubeTexture";
import { ImageProcessingConfiguration } from "core/Materials/imageProcessingConfiguration";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { RadioButtonLineComponent } from "shared-ui-components/lines/radioLineComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FogPropertyGridComponent } from "./fogPropertyGridComponent";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { TextureLinkLineComponent } from "../../lines/textureLinkLineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { AnimationGridComponent } from "./animations/animationPropertyGridComponent";
import "core/Physics/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
import { Logger } from "core/Misc/logger";
export class ScenePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._renderingModeGroupObservable = new Observable();
    }
    setRenderingModes(point, wireframe) {
        const scene = this.props.scene;
        scene.forcePointsCloud = point;
        scene.forceWireframe = wireframe;
    }
    switchIBL() {
        const scene = this.props.scene;
        if (scene.environmentTexture) {
            this._storedEnvironmentTexture = scene.environmentTexture;
            scene.environmentTexture = null;
        }
        else {
            scene.environmentTexture = this._storedEnvironmentTexture;
            this._storedEnvironmentTexture = null;
        }
    }
    updateEnvironmentTexture(file) {
        const isFileDDS = file.name.toLowerCase().indexOf(".dds") > 0;
        const isFileEnv = file.name.toLowerCase().indexOf(".env") > 0;
        if (!isFileDDS && !isFileEnv) {
            Logger.Error("Unable to update environment texture. Please select a dds or env file.");
            return;
        }
        const scene = this.props.scene;
        Tools.ReadFile(file, (data) => {
            const blob = new Blob([data], { type: "octet/stream" });
            const url = URL.createObjectURL(blob);
            if (isFileDDS) {
                scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(url, scene, ".dds");
            }
            else {
                scene.environmentTexture = new CubeTexture(url, scene, undefined, undefined, undefined, () => { }, (message) => {
                    if (message) {
                        Logger.Error(message);
                    }
                }, undefined, undefined, ".env");
            }
        }, undefined, true);
    }
    updateGravity(newValue) {
        const scene = this.props.scene;
        const physicsEngine = scene.getPhysicsEngine();
        physicsEngine.setGravity(newValue);
    }
    updateTimeStep(newValue) {
        const scene = this.props.scene;
        const physicsEngine = scene.getPhysicsEngine();
        physicsEngine.setTimeStep(newValue);
    }
    normalizeScene() {
        const scene = this.props.scene;
        scene.meshes.forEach((mesh) => {
            mesh.normalizeToUnitCube(true);
            mesh.computeWorldMatrix(true);
        });
    }
    render() {
        const scene = this.props.scene;
        const physicsEngine = scene.getPhysicsEngine();
        let dummy = null;
        if (physicsEngine) {
            dummy = {
                gravity: physicsEngine.gravity,
                timeStep: physicsEngine.getTimeStep(),
            };
        }
        const imageProcessing = scene.imageProcessingConfiguration;
        const toneMappingOptions = [
            { label: "Standard", value: ImageProcessingConfiguration.TONEMAPPING_STANDARD },
            { label: "ACES", value: ImageProcessingConfiguration.TONEMAPPING_ACES },
            { label: "Khronos PBR Neutral", value: ImageProcessingConfiguration.TONEMAPPING_KHR_PBR_NEUTRAL },
        ];
        const vignetteModeOptions = [
            { label: "Multiply", value: ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY },
            { label: "Opaque", value: ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE },
        ];
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "RENDERING MODE", selection: this.props.globalState, children: [_jsx(RadioButtonLineComponent, { onSelectionChangedObservable: this._renderingModeGroupObservable, label: "Point", isSelected: () => scene.forcePointsCloud, onSelect: () => this.setRenderingModes(true, false) }), _jsx(RadioButtonLineComponent, { onSelectionChangedObservable: this._renderingModeGroupObservable, label: "Wireframe", isSelected: () => scene.forceWireframe, onSelect: () => this.setRenderingModes(false, true) }), _jsx(RadioButtonLineComponent, { onSelectionChangedObservable: this._renderingModeGroupObservable, label: "Solid", isSelected: () => !scene.forcePointsCloud && !scene.forceWireframe, onSelect: () => this.setRenderingModes(false, false) })] }), _jsxs(LineContainerComponent, { title: "ENVIRONMENT", selection: this.props.globalState, children: [_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Clear color", target: scene, propertyName: "clearColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Clear color enabled", target: scene, propertyName: "autoClear", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Ambient color", target: scene, propertyName: "ambientColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Environment texture (IBL)", isSelected: () => scene.environmentTexture != null, onSelect: () => this.switchIBL() }), scene.environmentTexture && (_jsx(TextureLinkLineComponent, { label: "Env. texture", texture: scene.environmentTexture, onSelectionChangedObservable: this.props.onSelectionChangedObservable })), _jsx(FileButtonLine, { label: "Update environment texture", onClick: (file) => this.updateEnvironmentTexture(file), accept: ".dds, .env" }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 2, step: 0.01, label: "IBL Intensity", target: scene, propertyName: "environmentIntensity", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FogPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, scene: scene, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsx(AnimationGridComponent, { globalState: this.props.globalState, animatable: scene, scene: scene, lockObject: this.props.lockObject }), _jsxs(LineContainerComponent, { title: "MATERIAL IMAGE PROCESSING", selection: this.props.globalState, children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 4, step: 0.1, label: "Contrast", target: imageProcessing, propertyName: "contrast", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 4, step: 0.1, label: "Exposure", target: imageProcessing, propertyName: "exposure", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Tone mapping", target: imageProcessing, propertyName: "toneMappingEnabled", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Tone mapping type", options: toneMappingOptions, target: imageProcessing, propertyName: "toneMappingType", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ mode: value }) }), _jsx(CheckBoxLineComponent, { label: "Vignette", target: imageProcessing, propertyName: "vignetteEnabled", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 4, step: 0.1, label: "Vignette weight", target: imageProcessing, propertyName: "vignetteWeight", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 1, step: 0.1, label: "Vignette stretch", target: imageProcessing, propertyName: "vignetteStretch", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: Math.PI, step: 0.1, label: "Vignette FOV", target: imageProcessing, propertyName: "vignetteCameraFov", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 1, step: 0.1, label: "Vignette center X", target: imageProcessing, propertyName: "vignetteCenterX", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 1, step: 0.1, label: "Vignette center Y", target: imageProcessing, propertyName: "vignetteCenterY", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Vignette color", target: imageProcessing, propertyName: "vignetteColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Vignette blend mode", options: vignetteModeOptions, target: imageProcessing, propertyName: "vignetteBlendMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ mode: value }) }), _jsx(CheckBoxLineComponent, { label: "Dithering", target: imageProcessing, propertyName: "ditheringEnabled", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, minimum: 0, maximum: 1, step: 0.5 / 255.0, label: "Dithering intensity", target: imageProcessing, propertyName: "ditheringIntensity", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), dummy !== null && (_jsxs(LineContainerComponent, { title: "PHYSICS", closed: true, selection: this.props.globalState, children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Time step", target: dummy, propertyName: "timeStep", onChange: (newValue) => this.updateTimeStep(newValue), onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Gravity", target: dummy, propertyName: "gravity", onChange: (newValue) => this.updateGravity(newValue), onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })), _jsx(LineContainerComponent, { title: "COLLISIONS", closed: true, selection: this.props.globalState, children: _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Gravity", target: scene, propertyName: "gravity", onPropertyChangedObservable: this.props.onPropertyChangedObservable }) }), _jsx(LineContainerComponent, { title: "SHADOWS", closed: true, selection: this.props.globalState, children: _jsx(ButtonLineComponent, { label: "Normalize scene", onClick: () => this.normalizeScene() }) })] }));
    }
}
//# sourceMappingURL=scenePropertyGridComponent.js.map