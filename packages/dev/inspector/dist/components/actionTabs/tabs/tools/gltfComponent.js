import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { MessageLineComponent } from "shared-ui-components/lines/messageLineComponent";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
// TODO - does it still work if loading the modules from the correct files?
// eslint-disable-next-line import/no-internal-modules
import { GLTFLoaderCoordinateSystemMode, GLTFLoaderAnimationStartMode } from "loaders/glTF/index";
export class GLTFComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onValidationResultsUpdatedObserver = null;
        this.state = {
            showGLTFLoaderOptions: this.props.globalState.glTFLoaderOverrideConfig,
            showGLTFExtensionOptions: this.props.globalState.glTFLoaderOverrideExtensionsConfig,
        };
    }
    openValidationDetails() {
        const validationResults = this.props.globalState.validationResults;
        const win = window.open("", "_blank");
        if (win) {
            // TODO: format this better and use generator registry (https://github.com/KhronosGroup/glTF-Generator-Registry)
            win.document.title = "glTF Validation Results";
            win.document.body.innerText = JSON.stringify(validationResults, null, 2);
            win.document.body.style.whiteSpace = "pre";
            win.document.body.style.fontFamily = `monospace`;
            win.document.body.style.fontSize = `14px`;
            win.focus();
        }
    }
    prepareText(singularForm, count) {
        if (count) {
            return `${count} ${singularForm}s`;
        }
        return `${singularForm}`;
    }
    componentDidMount() {
        if (this.props.globalState) {
            this._onValidationResultsUpdatedObserver = this.props.globalState.onValidationResultsUpdatedObservable.add(() => {
                this.forceUpdate();
            });
        }
    }
    componentWillUnmount() {
        if (this.props.globalState) {
            if (this._onValidationResultsUpdatedObserver) {
                this.props.globalState.onValidationResultsUpdatedObservable.remove(this._onValidationResultsUpdatedObserver);
            }
        }
    }
    renderValidation() {
        const validationResults = this.props.globalState.validationResults;
        if (!validationResults) {
            return null;
        }
        const issues = validationResults.issues;
        return (_jsxs(LineContainerComponent, { title: "GLTF VALIDATION", closed: !issues.numErrors && !issues.numWarnings, selection: this.props.globalState, children: [issues.numErrors !== 0 && _jsx(MessageLineComponent, { text: "Your file has some validation issues", icon: faTimesCircle, color: "Red" }), issues.numErrors === 0 && _jsx(MessageLineComponent, { text: "Your file is a valid glTF file", icon: faCheck, color: "Green" }), _jsx(TextLineComponent, { label: "Errors", value: issues.numErrors.toString() }), _jsx(TextLineComponent, { label: "Warnings", value: issues.numWarnings.toString() }), _jsx(TextLineComponent, { label: "Infos", value: issues.numInfos.toString() }), _jsx(TextLineComponent, { label: "Hints", value: issues.numHints.toString() }), _jsx(TextLineComponent, { label: "More details", value: "Click here", onLink: () => this.openValidationDetails() })] }));
    }
    render() {
        const extensionStates = this.props.globalState.glTFLoaderExtensionDefaults;
        const loaderState = this.props.globalState.glTFLoaderDefaults;
        const animationStartMode = typeof GLTFLoaderAnimationStartMode !== "undefined"
            ? [
                { label: "None", value: GLTFLoaderAnimationStartMode.NONE },
                { label: "First", value: GLTFLoaderAnimationStartMode.FIRST },
                { label: "ALL", value: GLTFLoaderAnimationStartMode.ALL },
            ]
            : [
                { label: "None", value: 0 },
                { label: "First", value: 1 },
                { label: "ALL", value: 2 },
            ];
        const coordinateSystemMode = typeof GLTFLoaderCoordinateSystemMode !== "undefined"
            ? [
                { label: "Auto", value: GLTFLoaderCoordinateSystemMode.AUTO },
                { label: "Right handed", value: GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED },
            ]
            : [
                { label: "Auto", value: 0 },
                { label: "Right handed", value: 1 },
            ];
        return (_jsxs("div", { children: [_jsxs(LineContainerComponent, { title: "GLTF LOADER", closed: true, selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Override glTF loader options", target: this.props.globalState, propertyName: "glTFLoaderOverrideConfig", onValueChanged: () => this.setState({ showGLTFLoaderOptions: this.props.globalState.glTFLoaderOverrideConfig }) }), _jsx(MessageLineComponent, { text: this.props.globalState.glTFLoaderOverrideConfig ? "Modify glTF loader overrides below" : "Toggle on glTF loader overrides to see and change options" }), this.state.showGLTFLoaderOptions && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Always compute bounding box", target: loaderState, propertyName: "alwaysComputeBoundingBox" }), _jsx(CheckBoxLineComponent, { label: "Always compute skeleton root node", target: loaderState, propertyName: "alwaysComputeSkeletonRootNode" }), _jsx(OptionsLine, { label: "Animation start mode", options: animationStartMode, target: loaderState, propertyName: "animationStartMode" }), _jsx(CheckBoxLineComponent, { label: "Capture performance counters", target: loaderState, propertyName: "capturePerformanceCounters" }), _jsx(CheckBoxLineComponent, { label: "Compile materials", target: loaderState, propertyName: "compileMaterials" }), _jsx(CheckBoxLineComponent, { label: "Compile shadow generators", target: loaderState, propertyName: "compileShadowGenerators" }), _jsx(OptionsLine, { label: "Coordinate system", options: coordinateSystemMode, target: loaderState, propertyName: "coordinateSystemMode" }), _jsx(CheckBoxLineComponent, { label: "Create instances", target: loaderState, propertyName: "createInstances" }), _jsx(CheckBoxLineComponent, { label: "Enable logging", target: loaderState, propertyName: "loggingEnabled" }), _jsx(CheckBoxLineComponent, { label: "Load all materials", target: loaderState, propertyName: "loadAllMaterials" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Target FPS", target: loaderState, propertyName: "targetFps", isInteger: true }), _jsx(CheckBoxLineComponent, { label: "Transparency as coverage", target: loaderState, propertyName: "transparencyAsCoverage" }), _jsx(CheckBoxLineComponent, { label: "Use clip plane", target: loaderState, propertyName: "useClipPlane" }), _jsx(CheckBoxLineComponent, { label: "Use sRGB buffers", target: loaderState, propertyName: "useSRGBBuffers" }), _jsx(CheckBoxLineComponent, { label: "Validate", target: loaderState, propertyName: "validate" }), _jsx(MessageLineComponent, { text: "You need to reload your file to see these changes" })] }))] }), _jsxs(LineContainerComponent, { title: "GLTF EXTENSIONS", closed: true, selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Override glTF extension options", target: this.props.globalState, propertyName: "glTFLoaderOverrideExtensionsConfig", onValueChanged: () => this.setState({ showGLTFExtensionOptions: this.props.globalState.glTFLoaderOverrideExtensionsConfig }) }), _jsx(MessageLineComponent, { text: this.props.globalState.glTFLoaderOverrideExtensionsConfig
                                ? "Modify glTF extension overrides below"
                                : "Toggle on glTF extension overrides to see and change options" }), this.state.showGLTFExtensionOptions && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "EXT_lights_image_based", isSelected: () => extensionStates["EXT_lights_image_based"].enabled, onSelect: (value) => (extensionStates["EXT_lights_image_based"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "EXT_mesh_gpu_instancing", isSelected: () => extensionStates["EXT_mesh_gpu_instancing"].enabled, onSelect: (value) => (extensionStates["EXT_mesh_gpu_instancing"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "EXT_texture_webp", isSelected: () => extensionStates["EXT_texture_webp"].enabled, onSelect: (value) => (extensionStates["EXT_texture_webp"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "EXT_texture_avif", isSelected: () => extensionStates["EXT_texture_avif"].enabled, onSelect: (value) => (extensionStates["EXT_texture_avif"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_draco_mesh_compression", isSelected: () => extensionStates["KHR_draco_mesh_compression"].enabled, onSelect: (value) => (extensionStates["KHR_draco_mesh_compression"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_pbrSpecularGloss...", isSelected: () => extensionStates["KHR_materials_pbrSpecularGlossiness"].enabled, onSelect: (value) => (extensionStates["KHR_materials_pbrSpecularGlossiness"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_clearcoat", isSelected: () => extensionStates["KHR_materials_clearcoat"].enabled, onSelect: (value) => (extensionStates["KHR_materials_clearcoat"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_iridescence", isSelected: () => extensionStates["KHR_materials_iridescence"].enabled, onSelect: (value) => (extensionStates["KHR_materials_iridescence"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_anisotropy", isSelected: () => extensionStates["KHR_materials_anisotropy"].enabled, onSelect: (value) => (extensionStates["KHR_materials_anisotropy"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_emissive_strength", isSelected: () => extensionStates["KHR_materials_emissive_strength"].enabled, onSelect: (value) => (extensionStates["KHR_materials_emissive_strength"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_ior", isSelected: () => extensionStates["KHR_materials_ior"].enabled, onSelect: (value) => (extensionStates["KHR_materials_ior"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_sheen", isSelected: () => extensionStates["KHR_materials_sheen"].enabled, onSelect: (value) => (extensionStates["KHR_materials_sheen"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_specular", isSelected: () => extensionStates["KHR_materials_specular"].enabled, onSelect: (value) => (extensionStates["KHR_materials_specular"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_unlit", isSelected: () => extensionStates["KHR_materials_unlit"].enabled, onSelect: (value) => (extensionStates["KHR_materials_unlit"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_variants", isSelected: () => extensionStates["KHR_materials_variants"].enabled, onSelect: (value) => (extensionStates["KHR_materials_variants"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_transmission", isSelected: () => extensionStates["KHR_materials_transmission"].enabled, onSelect: (value) => (extensionStates["KHR_materials_transmission"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_diffuse_transmission", isSelected: () => extensionStates["KHR_materials_diffuse_transmission"].enabled, onSelect: (value) => (extensionStates["KHR_materials_diffuse_transmission"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_volume", isSelected: () => extensionStates["KHR_materials_volume"].enabled, onSelect: (value) => (extensionStates["KHR_materials_volume"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_materials_dispersion", isSelected: () => extensionStates["KHR_materials_dispersion"].enabled, onSelect: (value) => (extensionStates["KHR_materials_dispersion"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_mesh_quantization", isSelected: () => extensionStates["KHR_mesh_quantization"].enabled, onSelect: (value) => (extensionStates["KHR_mesh_quantization"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_lights_punctual", isSelected: () => extensionStates["KHR_lights_punctual"].enabled, onSelect: (value) => (extensionStates["KHR_lights_punctual"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_texture_basisu", isSelected: () => extensionStates["KHR_texture_basisu"].enabled, onSelect: (value) => (extensionStates["KHR_texture_basisu"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_texture_transform", isSelected: () => extensionStates["KHR_texture_transform"].enabled, onSelect: (value) => (extensionStates["KHR_texture_transform"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "KHR_xmp_json_ld", isSelected: () => extensionStates["KHR_xmp_json_ld"].enabled, onSelect: (value) => (extensionStates["KHR_xmp_json_ld"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "MSFT_lod", isSelected: () => extensionStates["MSFT_lod"].enabled, onSelect: (value) => (extensionStates["MSFT_lod"].enabled = value) }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Maximum LODs", target: extensionStates["MSFT_lod"], propertyName: "maxLODsToLoad", additionalClass: "gltf-extension-property", isInteger: true }), _jsx(CheckBoxLineComponent, { label: "MSFT_minecraftMesh", isSelected: () => extensionStates["MSFT_minecraftMesh"].enabled, onSelect: (value) => (extensionStates["MSFT_minecraftMesh"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "MSFT_sRGBFactors", isSelected: () => extensionStates["MSFT_sRGBFactors"].enabled, onSelect: (value) => (extensionStates["MSFT_sRGBFactors"].enabled = value) }), _jsx(CheckBoxLineComponent, { label: "MSFT_audio_emitter", isSelected: () => extensionStates["MSFT_audio_emitter"].enabled, onSelect: (value) => (extensionStates["MSFT_audio_emitter"].enabled = value) }), _jsx(MessageLineComponent, { text: "You need to reload your file to see these changes" })] }))] }), this.props.globalState.validationResults && this.renderValidation()] }));
    }
}
//# sourceMappingURL=gltfComponent.js.map