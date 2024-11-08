import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PaneComponent } from "../paneComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { RenderGridPropertyGridComponent } from "./propertyGrids/renderGridPropertyGridComponent";
import { PhysicsViewer } from "core/Debug/physicsViewer";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { MaterialFlags } from "core/Materials/materialFlags";
import "core/Physics/physicsEngineComponent";
import "core/Physics/v1/physicsEngineComponent";
import "core/Physics/v2/physicsEngineComponent";
export class DebugTabComponent extends PaneComponent {
    constructor(props) {
        super(props);
        this._physicsViewersEnabled = false;
        const scene = this.props.scene;
        if (!scene) {
            return;
        }
        if (!scene.reservedDataStore) {
            scene.reservedDataStore = {};
        }
        this._physicsViewersEnabled = scene.reservedDataStore.physicsViewer != null;
    }
    switchPhysicsViewers() {
        this._physicsViewersEnabled = !this._physicsViewersEnabled;
        const scene = this.props.scene;
        if (this._physicsViewersEnabled) {
            const physicsViewer = new PhysicsViewer(scene);
            scene.reservedDataStore.physicsViewer = physicsViewer;
            for (const mesh of scene.meshes) {
                if (mesh.physicsImpostor) {
                    const debugMesh = physicsViewer.showImpostor(mesh.physicsImpostor, mesh);
                    if (debugMesh) {
                        debugMesh.reservedDataStore = { hidden: true };
                        debugMesh.material.reservedDataStore = { hidden: true };
                    }
                }
                else if (mesh.physicsBody) {
                    const debugMesh = physicsViewer.showBody(mesh.physicsBody);
                    if (debugMesh) {
                        debugMesh.reservedDataStore = { hidden: true };
                        debugMesh.material.reservedDataStore = { hidden: true };
                    }
                }
            }
            for (const transformNode of scene.transformNodes) {
                if (transformNode.physicsBody) {
                    const debugMesh = physicsViewer.showBody(transformNode.physicsBody);
                    if (debugMesh) {
                        debugMesh.reservedDataStore = { hidden: true };
                        debugMesh.material.reservedDataStore = { hidden: true };
                    }
                }
            }
        }
        else {
            scene.reservedDataStore.physicsViewer.dispose();
            scene.reservedDataStore.physicsViewer = null;
        }
    }
    render() {
        const scene = this.props.scene;
        if (!scene) {
            return null;
        }
        return (_jsxs("div", { className: "pane", children: [_jsxs(LineContainerComponent, { title: "HELPERS", selection: this.props.globalState, children: [_jsx(RenderGridPropertyGridComponent, { globalState: this.props.globalState, scene: scene }), _jsx(CheckBoxLineComponent, { label: "Physics", isSelected: () => this._physicsViewersEnabled, onSelect: () => this.switchPhysicsViewers() })] }), _jsxs(LineContainerComponent, { title: "CORE TEXTURE CHANNELS", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Diffuse", isSelected: () => StandardMaterial.DiffuseTextureEnabled, onSelect: () => (StandardMaterial.DiffuseTextureEnabled = !StandardMaterial.DiffuseTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Ambient", isSelected: () => StandardMaterial.AmbientTextureEnabled, onSelect: () => (StandardMaterial.AmbientTextureEnabled = !StandardMaterial.AmbientTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Specular", isSelected: () => StandardMaterial.SpecularTextureEnabled, onSelect: () => (StandardMaterial.SpecularTextureEnabled = !StandardMaterial.SpecularTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Emissive", isSelected: () => StandardMaterial.EmissiveTextureEnabled, onSelect: () => (StandardMaterial.EmissiveTextureEnabled = !StandardMaterial.EmissiveTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Bump", isSelected: () => StandardMaterial.BumpTextureEnabled, onSelect: () => (StandardMaterial.BumpTextureEnabled = !StandardMaterial.BumpTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Opacity", isSelected: () => StandardMaterial.OpacityTextureEnabled, onSelect: () => (StandardMaterial.OpacityTextureEnabled = !StandardMaterial.OpacityTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Reflection", isSelected: () => StandardMaterial.ReflectionTextureEnabled, onSelect: () => (StandardMaterial.ReflectionTextureEnabled = !StandardMaterial.ReflectionTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Refraction", isSelected: () => StandardMaterial.RefractionTextureEnabled, onSelect: () => (StandardMaterial.RefractionTextureEnabled = !StandardMaterial.RefractionTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "ColorGrading", isSelected: () => StandardMaterial.ColorGradingTextureEnabled, onSelect: () => (StandardMaterial.ColorGradingTextureEnabled = !StandardMaterial.ColorGradingTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Lightmap", isSelected: () => StandardMaterial.LightmapTextureEnabled, onSelect: () => (StandardMaterial.LightmapTextureEnabled = !StandardMaterial.LightmapTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Fresnel", isSelected: () => StandardMaterial.FresnelEnabled, onSelect: () => (StandardMaterial.FresnelEnabled = !StandardMaterial.FresnelEnabled) }), _jsx(CheckBoxLineComponent, { label: "Detail", isSelected: () => MaterialFlags.DetailTextureEnabled, onSelect: () => (MaterialFlags.DetailTextureEnabled = !MaterialFlags.DetailTextureEnabled) }), _jsx(CheckBoxLineComponent, { label: "Decal", isSelected: () => MaterialFlags.DecalMapEnabled, onSelect: () => (MaterialFlags.DecalMapEnabled = !MaterialFlags.DecalMapEnabled) })] }), _jsxs(LineContainerComponent, { title: "FEATURES", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Animations", isSelected: () => scene.animationsEnabled, onSelect: () => (scene.animationsEnabled = !scene.animationsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Physics", isSelected: () => scene.physicsEnabled, onSelect: () => (scene.physicsEnabled = !scene.physicsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Collisions", isSelected: () => scene.collisionsEnabled, onSelect: () => (scene.collisionsEnabled = !scene.collisionsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Fog", isSelected: () => scene.fogEnabled, onSelect: () => (scene.fogEnabled = !scene.fogEnabled) }), _jsx(CheckBoxLineComponent, { label: "Lens flares", isSelected: () => scene.lensFlaresEnabled, onSelect: () => (scene.lensFlaresEnabled = !scene.lensFlaresEnabled) }), _jsx(CheckBoxLineComponent, { label: "Lights", isSelected: () => scene.lightsEnabled, onSelect: () => (scene.lightsEnabled = !scene.lightsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Particles", isSelected: () => scene.particlesEnabled, onSelect: () => (scene.particlesEnabled = !scene.particlesEnabled) }), _jsx(CheckBoxLineComponent, { label: "Post-processes", isSelected: () => scene.postProcessesEnabled, onSelect: () => (scene.postProcessesEnabled = !scene.postProcessesEnabled) }), _jsx(CheckBoxLineComponent, { label: "Probes", isSelected: () => scene.probesEnabled, onSelect: () => (scene.probesEnabled = !scene.probesEnabled) }), _jsx(CheckBoxLineComponent, { label: "Textures", isSelected: () => scene.texturesEnabled, onSelect: () => (scene.texturesEnabled = !scene.texturesEnabled) }), _jsx(CheckBoxLineComponent, { label: "Procedural textures", isSelected: () => scene.proceduralTexturesEnabled, onSelect: () => (scene.proceduralTexturesEnabled = !scene.proceduralTexturesEnabled) }), _jsx(CheckBoxLineComponent, { label: "Render targets", isSelected: () => scene.renderTargetsEnabled, onSelect: () => (scene.renderTargetsEnabled = !scene.renderTargetsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Shadows", isSelected: () => scene.shadowsEnabled, onSelect: () => (scene.shadowsEnabled = !scene.shadowsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Skeletons", isSelected: () => scene.skeletonsEnabled, onSelect: () => (scene.skeletonsEnabled = !scene.skeletonsEnabled) }), _jsx(CheckBoxLineComponent, { label: "Sprites", isSelected: () => scene.spritesEnabled, onSelect: () => (scene.spritesEnabled = !scene.spritesEnabled) })] })] }));
    }
}
//# sourceMappingURL=debugTabComponent.js.map