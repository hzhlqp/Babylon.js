import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PaneComponent } from "../paneComponent";
import { MaterialPropertyGridComponent } from "./propertyGrids/materials/materialPropertyGridComponent";
import { StandardMaterialPropertyGridComponent } from "./propertyGrids/materials/standardMaterialPropertyGridComponent";
import { TexturePropertyGridComponent } from "./propertyGrids/materials/texturePropertyGridComponent";
import { PBRMaterialPropertyGridComponent } from "./propertyGrids/materials/pbrMaterialPropertyGridComponent";
import { ScenePropertyGridComponent } from "./propertyGrids/scenePropertyGridComponent";
import { HemisphericLightPropertyGridComponent } from "./propertyGrids/lights/hemisphericLightPropertyGridComponent";
import { PointLightPropertyGridComponent } from "./propertyGrids/lights/pointLightPropertyGridComponent";
import { FreeCameraPropertyGridComponent } from "./propertyGrids/cameras/freeCameraPropertyGridComponent";
import { ArcRotateCameraPropertyGridComponent } from "./propertyGrids/cameras/arcRotateCameraPropertyGridComponent";
import { MeshPropertyGridComponent } from "./propertyGrids/meshes/meshPropertyGridComponent";
import { TransformNodePropertyGridComponent } from "./propertyGrids/meshes/transformNodePropertyGridComponent";
import { BackgroundMaterialPropertyGridComponent } from "./propertyGrids/materials/backgroundMaterialPropertyGridComponent";
import { ControlPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/controlPropertyGridComponent";
import { TextBlockPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/textBlockPropertyGridComponent";
import { InputTextPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/inputTextPropertyGridComponent";
import { ColorPickerPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/colorPickerPropertyGridComponent";
import { AnimationGroupGridComponent } from "./propertyGrids/animations/animationGroupPropertyGridComponent";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { ImagePropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/imagePropertyGridComponent";
import { SliderPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/sliderPropertyGridComponent";
import { ImageBasedSliderPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/imageBasedSliderPropertyGridComponent";
import { RectanglePropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/rectanglePropertyGridComponent";
import { EllipsePropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/ellipsePropertyGridComponent";
import { CheckboxPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/checkboxPropertyGridComponent";
import { RadioButtonPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/radioButtonPropertyGridComponent";
import { LinePropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/linePropertyGridComponent";
import { ScrollViewerPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/scrollViewerPropertyGridComponent";
import { GridPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/gridPropertyGridComponent";
import { PBRMetallicRoughnessMaterialPropertyGridComponent } from "./propertyGrids/materials/pbrMetallicRoughnessMaterialPropertyGridComponent";
import { PBRSpecularGlossinessMaterialPropertyGridComponent } from "./propertyGrids/materials/pbrSpecularGlossinessMaterialPropertyGridComponent";
import { StackPanelPropertyGridComponent } from "shared-ui-components/tabs/propertyGrids/gui/stackPanelPropertyGridComponent";
import { PostProcessPropertyGridComponent } from "./propertyGrids/postProcesses/postProcessPropertyGridComponent";
import { RenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/renderingPipelinePropertyGridComponent";
import { DefaultRenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/defaultRenderingPipelinePropertyGridComponent";
import { SSAORenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/ssaoRenderingPipelinePropertyGridComponent";
import { SSAO2RenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/ssao2RenderingPipelinePropertyGridComponent";
import { IblShadowsRenderPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/iblShadowsRenderPipelinePropertyGridComponent";
import { SSRRenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/ssrRenderingPipelinePropertyGridComponent";
import { SkeletonPropertyGridComponent } from "./propertyGrids/meshes/skeletonPropertyGridComponent";
import { BonePropertyGridComponent } from "./propertyGrids/meshes/bonePropertyGridComponent";
import { DirectionalLightPropertyGridComponent } from "./propertyGrids/lights/directionalLightPropertyGridComponent";
import { SpotLightPropertyGridComponent } from "./propertyGrids/lights/spotLightPropertyGridComponent";
import { LensRenderingPipelinePropertyGridComponent } from "./propertyGrids/postProcesses/lensRenderingPipelinePropertyGridComponent";
import { NodeMaterialPropertyGridComponent } from "./propertyGrids/materials/nodeMaterialPropertyGridComponent";
import { MultiMaterialPropertyGridComponent } from "./propertyGrids/materials/multiMaterialPropertyGridComponent";
import { ParticleSystemPropertyGridComponent } from "./propertyGrids/particleSystems/particleSystemPropertyGridComponent";
import { SpriteManagerPropertyGridComponent } from "./propertyGrids/sprites/spriteManagerPropertyGridComponent";
import { SpritePropertyGridComponent } from "./propertyGrids/sprites/spritePropertyGridComponent";
import { TargetedAnimationGridComponent } from "./propertyGrids/animations/targetedAnimationPropertyGridComponent";
import { FollowCameraPropertyGridComponent } from "./propertyGrids/cameras/followCameraPropertyGridComponent";
import { SoundPropertyGridComponent } from "./propertyGrids/sounds/soundPropertyGridComponent";
import { LayerPropertyGridComponent } from "./propertyGrids/layers/layerPropertyGridComponent";
import { EmptyPropertyGridComponent } from "./propertyGrids/emptyPropertyGridComponent";
import { MetadataGridComponent } from "inspector/components/actionTabs/tabs/propertyGrids/metadata/metadataPropertyGridComponent";
import { SkyMaterialPropertyGridComponent } from "./propertyGrids/materials/skyMaterialPropertyGridComponent";
/**
 *
 */
export class PropertyGridTabComponent extends PaneComponent {
    constructor(props) {
        super(props);
        this._lockObject = new LockObject();
    }
    timerRefresh() {
        if (!this._lockObject.lock) {
            this.forceUpdate();
        }
    }
    componentDidMount() {
        this._timerIntervalId = window.setInterval(() => this.timerRefresh(), 500);
    }
    componentWillUnmount() {
        window.clearInterval(this._timerIntervalId);
    }
    renderContent() {
        const entity = this.props.selectedEntity;
        if (!entity) {
            return _jsx("div", { className: "infoMessage", children: "Please select an entity in the scene explorer." });
        }
        if (entity.getClassName) {
            const className = entity.getClassName();
            if (className === "Scene") {
                const scene = entity;
                return (_jsx(ScenePropertyGridComponent, { scene: scene, globalState: this.props.globalState, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Sound") {
                const sound = entity;
                return (_jsx(SoundPropertyGridComponent, { sound: sound, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Sprite") {
                const sprite = entity;
                return (_jsx(SpritePropertyGridComponent, { sprite: sprite, globalState: this.props.globalState, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "SpriteManager") {
                const spriteManager = entity;
                return (_jsx(SpriteManagerPropertyGridComponent, { spriteManager: spriteManager, globalState: this.props.globalState, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Mesh") !== -1) {
                const mesh = entity;
                if (mesh.getTotalVertices() > 0) {
                    return (_jsx("div", { children: _jsx(MeshPropertyGridComponent, { globalState: this.props.globalState, mesh: mesh, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }) }));
                }
            }
            if (className.indexOf("ParticleSystem") !== -1) {
                const particleSystem = entity;
                return (_jsx(ParticleSystemPropertyGridComponent, { globalState: this.props.globalState, system: particleSystem, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("FreeCamera") !== -1 ||
                className.indexOf("UniversalCamera") !== -1 ||
                className.indexOf("WebXRCamera") !== -1 ||
                className.indexOf("DeviceOrientationCamera") !== -1) {
                const freeCamera = entity;
                return (_jsx(FreeCameraPropertyGridComponent, { globalState: this.props.globalState, camera: freeCamera, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("ArcRotateCamera") !== -1) {
                const arcRotateCamera = entity;
                return (_jsx(ArcRotateCameraPropertyGridComponent, { globalState: this.props.globalState, camera: arcRotateCamera, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("FollowCamera") !== -1) {
                const followCamera = entity;
                return (_jsx(FollowCameraPropertyGridComponent, { globalState: this.props.globalState, camera: followCamera, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "HemisphericLight") {
                const hemisphericLight = entity;
                return (_jsx(HemisphericLightPropertyGridComponent, { globalState: this.props.globalState, light: hemisphericLight, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "PointLight") {
                const pointLight = entity;
                return (_jsx(PointLightPropertyGridComponent, { globalState: this.props.globalState, light: pointLight, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "DirectionalLight") {
                const pointLight = entity;
                return (_jsx(DirectionalLightPropertyGridComponent, { globalState: this.props.globalState, light: pointLight, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "SpotLight") {
                const pointLight = entity;
                return (_jsx(SpotLightPropertyGridComponent, { globalState: this.props.globalState, light: pointLight, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("TransformNode") !== -1 || className.indexOf("Mesh") !== -1) {
                const transformNode = entity;
                return (_jsx(TransformNodePropertyGridComponent, { transformNode: transformNode, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "MultiMaterial") {
                const material = entity;
                return (_jsx(MultiMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "StandardMaterial") {
                const material = entity;
                return (_jsx(StandardMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "NodeMaterial") {
                const material = entity;
                return (_jsx(NodeMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "PBRMaterial") {
                const material = entity;
                return (_jsx(PBRMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "PBRMetallicRoughnessMaterial") {
                const material = entity;
                return (_jsx(PBRMetallicRoughnessMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "PBRSpecularGlossinessMaterial") {
                const material = entity;
                return (_jsx(PBRSpecularGlossinessMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "SkyMaterial") {
                const material = entity;
                return (_jsx(SkyMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "BackgroundMaterial") {
                const material = entity;
                return (_jsx(BackgroundMaterialPropertyGridComponent, { globalState: this.props.globalState, material: material, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "AnimationGroup") {
                const animationGroup = entity;
                return (_jsx(AnimationGroupGridComponent, { globalState: this.props.globalState, animationGroup: animationGroup, scene: this.props.scene, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "TargetedAnimation") {
                const targetedAnimation = entity;
                return (_jsx(TargetedAnimationGridComponent, { globalState: this.props.globalState, targetedAnimation: targetedAnimation, scene: this.props.scene, lockObject: this._lockObject, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Material") !== -1) {
                const material = entity;
                return (_jsx(MaterialPropertyGridComponent, { material: material, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("DefaultRenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(DefaultRenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("LensRenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(LensRenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("SSAORenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(SSAORenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("SSAO2RenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(SSAO2RenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("SSRRenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(SSRRenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("IBLShadowsRenderPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(IblShadowsRenderPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("RenderingPipeline") !== -1) {
                const renderPipeline = entity;
                return (_jsx(RenderingPipelinePropertyGridComponent, { renderPipeline: renderPipeline, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("PostProcess") !== -1) {
                const postProcess = entity;
                return (_jsx(PostProcessPropertyGridComponent, { postProcess: postProcess, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Layer") !== -1) {
                const layer = entity;
                return (_jsx(LayerPropertyGridComponent, { layer: layer, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Texture") !== -1) {
                const texture = entity;
                return (_jsx(TexturePropertyGridComponent, { texture: texture, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Skeleton") !== -1) {
                const skeleton = entity;
                return (_jsx(SkeletonPropertyGridComponent, { skeleton: skeleton, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className.indexOf("Bone") !== -1) {
                const bone = entity;
                return (_jsx(BonePropertyGridComponent, { bone: bone, globalState: this.props.globalState, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "TextBlock") {
                const textBlock = entity;
                return _jsx(TextBlockPropertyGridComponent, { textBlock: textBlock, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "InputText") {
                const inputText = entity;
                return _jsx(InputTextPropertyGridComponent, { inputText: inputText, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "ColorPicker") {
                const colorPicker = entity;
                return (_jsx(ColorPickerPropertyGridComponent, { colorPicker: colorPicker, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Image") {
                const image = entity;
                return _jsx(ImagePropertyGridComponent, { image: image, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "Slider") {
                const slider = entity;
                return _jsx(SliderPropertyGridComponent, { slider: slider, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "ImageBasedSlider") {
                const imageBasedSlider = entity;
                return (_jsx(ImageBasedSliderPropertyGridComponent, { imageBasedSlider: imageBasedSlider, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Rectangle") {
                const rectangle = entity;
                return _jsx(RectanglePropertyGridComponent, { rectangle: rectangle, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "StackPanel") {
                const stackPanel = entity;
                return (_jsx(StackPanelPropertyGridComponent, { stackPanel: stackPanel, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Grid") {
                const grid = entity;
                return _jsx(GridPropertyGridComponent, { grid: grid, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "ScrollViewer") {
                const scrollViewer = entity;
                return (_jsx(ScrollViewerPropertyGridComponent, { scrollViewer: scrollViewer, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Ellipse") {
                const ellipse = entity;
                return _jsx(EllipsePropertyGridComponent, { ellipse: ellipse, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "Checkbox") {
                const checkbox = entity;
                return _jsx(CheckboxPropertyGridComponent, { checkbox: checkbox, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (className === "RadioButton") {
                const radioButton = entity;
                return (_jsx(RadioButtonPropertyGridComponent, { radioButtons: [radioButton], lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
            }
            if (className === "Line") {
                const line = entity;
                return _jsx(LinePropertyGridComponent, { line: line, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            if (entity._host) {
                const control = entity;
                return _jsx(ControlPropertyGridComponent, { control: control, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
            }
            return (_jsx(EmptyPropertyGridComponent, { item: entity, lockObject: this._lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable, globalState: this.props.globalState }));
        }
        return null;
    }
    render() {
        const entity = this.props.selectedEntity || {};
        const entityHasMetadataProp = Object.prototype.hasOwnProperty.call(entity, "metadata");
        return (_jsxs("div", { className: "pane", children: [this.renderContent(), entityHasMetadataProp && _jsx(MetadataGridComponent, { globalState: this.props.globalState, entity: entity })] }));
    }
}
//# sourceMappingURL=propertyGridTabComponent.js.map