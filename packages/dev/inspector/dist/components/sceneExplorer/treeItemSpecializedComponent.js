import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MeshTreeItemComponent } from "./entities/meshTreeItemComponent";
import { CameraTreeItemComponent } from "./entities/cameraTreeItemComponent";
import { LightTreeItemComponent } from "./entities/lightTreeItemComponent";
import { ExtensionsComponent } from "./extensionsComponent";
import { TreeItemLabelComponent } from "./treeItemLabelComponent";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { MaterialTreeItemComponent } from "./entities/materialTreeItemComponent";
import { TextureTreeItemComponent } from "./entities/textureTreeItemComponent";
import { TransformNodeItemComponent } from "./entities/transformNodeTreeItemComponent";
import * as React from "react";
import { ControlTreeItemComponent } from "./entities/gui/controlTreeItemComponent";
import { AdvancedDynamicTextureTreeItemComponent } from "./entities/gui/advancedDynamicTextureTreeItemComponent";
import { AnimationGroupItemComponent } from "./entities/animationGroupTreeItemComponent";
import { PostProcessItemComponent } from "./entities/postProcessTreeItemComponent";
import { RenderingPipelineItemComponent } from "./entities/renderingPipelineTreeItemComponent";
import { SkeletonTreeItemComponent } from "./entities/skeletonTreeItemComponent";
import { BoneTreeItemComponent } from "./entities/boneTreeItemComponent";
import { ParticleSystemTreeItemComponent } from "./entities/particleSystemTreeItemComponent";
import { SpriteManagerTreeItemComponent } from "./entities/spriteManagerTreeItemComponent";
import { SpriteTreeItemComponent } from "./entities/spriteTreeItemComponent";
import { TargetedAnimationItemComponent } from "./entities/targetedAnimationTreeItemComponent";
import { SoundTreeItemComponent } from "./entities/soundTreeItemComponent";
import { EffectLayerItemComponent } from "./entities/effectLayerPipelineTreeItemComponent";
export class TreeItemSpecializedComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        if (!this.props.onClick) {
            return;
        }
        this.props.onClick();
    }
    render() {
        const entity = this.props.entity;
        if (entity && entity.getClassName) {
            const className = entity.getClassName();
            if (className.indexOf("Mesh") !== -1) {
                const mesh = entity;
                return (_jsx(MeshTreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, mesh: mesh, onClick: () => this.onClick() }));
            }
            if (className.indexOf("SpriteManager") !== -1) {
                return (_jsx(SpriteManagerTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, spriteManager: entity, onClick: () => this.onClick() }));
            }
            if (className.indexOf("Sprite") !== -1) {
                return _jsx(SpriteTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, sprite: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("Skeleton") !== -1) {
                return _jsx(SkeletonTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, skeleton: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("Bone") !== -1) {
                return _jsx(BoneTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, bone: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("TransformNode") !== -1) {
                return _jsx(TransformNodeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, transformNode: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("Camera") !== -1) {
                return (_jsx(CameraTreeItemComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, extensibilityGroups: this.props.extensibilityGroups, camera: entity, onClick: () => this.onClick() }));
            }
            if (className.indexOf("Light", className.length - 5) !== -1) {
                return (_jsx(LightTreeItemComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, extensibilityGroups: this.props.extensibilityGroups, light: entity, onClick: () => this.onClick() }));
            }
            if (className.indexOf("Material") !== -1) {
                return _jsx(MaterialTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, material: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("ParticleSystem") !== -1) {
                return _jsx(ParticleSystemTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, system: entity, onClick: () => this.onClick() });
            }
            if (className === "AdvancedDynamicTexture") {
                return (_jsx(AdvancedDynamicTextureTreeItemComponent, { onSelectionChangedObservable: this.props.globalState.onSelectionChangedObservable, extensibilityGroups: this.props.extensibilityGroups, texture: entity, onClick: () => this.onClick() }));
            }
            if (className === "AnimationGroup") {
                return (_jsx(AnimationGroupItemComponent, { extensibilityGroups: this.props.extensibilityGroups, animationGroup: entity, onClick: () => this.onClick() }));
            }
            if (className === "TargetedAnimation") {
                return (_jsx(TargetedAnimationItemComponent, { extensibilityGroups: this.props.extensibilityGroups, targetedAnimation: entity, onClick: () => this.onClick() }));
            }
            if (className.indexOf("Texture") !== -1) {
                return _jsx(TextureTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, texture: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("RenderingPipeline") !== -1) {
                return (_jsx(RenderingPipelineItemComponent, { extensibilityGroups: this.props.extensibilityGroups, renderPipeline: entity, onClick: () => this.onClick() }));
            }
            if (className.indexOf("PostProcess") !== -1) {
                return _jsx(PostProcessItemComponent, { extensibilityGroups: this.props.extensibilityGroups, postProcess: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("Layer") !== -1) {
                return _jsx(EffectLayerItemComponent, { extensibilityGroups: this.props.extensibilityGroups, layer: entity, onClick: () => this.onClick() });
            }
            if (className.indexOf("Sound") !== -1) {
                return _jsx(SoundTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, sound: entity, onClick: () => this.onClick() });
            }
            if (entity._host) {
                return _jsx(ControlTreeItemComponent, { extensibilityGroups: this.props.extensibilityGroups, control: entity, onClick: () => this.onClick() });
            }
        }
        return (_jsxs("div", { className: "meshTools", children: [_jsx(TreeItemLabelComponent, { label: entity.name, onClick: () => this.onClick(), icon: faProjectDiagram, color: "cornflowerblue" }), _jsx(ExtensionsComponent, { target: entity, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=treeItemSpecializedComponent.js.map