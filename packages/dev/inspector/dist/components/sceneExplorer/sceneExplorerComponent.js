import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { EngineStore } from "core/Engines/engineStore";
import { TreeItemComponent } from "./treeItemComponent";
import { Resizable } from "re-resizable";
import { HeaderComponent } from "../headerComponent";
import { SceneTreeItemComponent } from "./entities/sceneTreeItemComponent";
import { Tools } from "../../tools";
import { DefaultRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import { Vector3 } from "core/Maths/math";
import { PointLight } from "core/Lights/pointLight";
import { FreeCamera } from "core/Cameras/freeCamera";
import { DirectionalLight } from "core/Lights/directionalLight";
import { SSAORenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssaoRenderingPipeline";
import { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import { ParticleHelper } from "core/Particles/particleHelper";
import { GPUParticleSystem } from "core/Particles/gpuParticleSystem";
import { SSAO2RenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssao2RenderingPipeline";
import { SSRRenderingPipeline } from "core/PostProcesses/RenderPipeline/Pipelines/ssrRenderingPipeline";
import { IblShadowsRenderPipeline } from "core/Rendering/IBLShadows/iblShadowsRenderPipeline";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { SpriteManager } from "core/Sprites/spriteManager";
import { NodeGeometry } from "core/Meshes/Node/nodeGeometry";
// side effects
import "core/Sprites/spriteSceneComponent";
import "core/Audio/audioSceneComponent";
import "core/PostProcesses/RenderPipeline/postProcessRenderPipelineManagerSceneComponent";
import "./sceneExplorer.scss";
const ResizableCasted = Resizable;
export class SceneExplorerFilterComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsx("div", { className: "filter", children: _jsx("input", { type: "text", placeholder: "Filter", onChange: (evt) => this.props.onFilter(evt.target.value) }) }));
    }
}
export class SceneExplorerComponent extends React.Component {
    constructor(props) {
        super(props);
        this._mutationTimeout = null;
        this._once = true;
        this._hooked = false;
        this.state = { filter: null, selectedEntity: null, scene: this.props.scene };
        this._sceneMutationFunc = this.processMutation.bind(this);
        this._sceneExplorerRef = React.createRef();
        this._onNewSceneObserver = this.props.globalState.onNewSceneObservable.add((scene) => {
            this.setState({
                scene,
            });
        });
    }
    processMutation() {
        if (this.props.globalState.blockMutationUpdates) {
            return;
        }
        // To avoid perf hits we want to make sure that we are not rebuilding the entire tree on each call
        if (this._mutationTimeout !== null) {
            window.clearTimeout(this._mutationTimeout);
        }
        this._mutationTimeout = window.setTimeout(() => {
            this._mutationTimeout = null;
            this.forceUpdate();
        }, 32);
    }
    componentDidMount() {
        this._onSelectionChangeObserver = this.props.globalState.onSelectionChangedObservable.add((entity) => {
            if (this.state.selectedEntity !== entity) {
                this.setState({ selectedEntity: entity });
            }
        });
        this._onSelectionRenamedObserver = this.props.globalState.onSelectionRenamedObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        if (this._onSelectionChangeObserver) {
            this.props.globalState.onSelectionChangedObservable.remove(this._onSelectionChangeObserver);
        }
        if (this._onSelectionRenamedObserver) {
            this.props.globalState.onSelectionRenamedObservable.remove(this._onSelectionRenamedObserver);
        }
        if (this._onNewSceneAddedObserver) {
            EngineStore.LastCreatedEngine.onNewSceneAddedObservable.remove(this._onNewSceneAddedObserver);
        }
        if (this._onNewSceneObserver) {
            this.props.globalState.onNewSceneObservable.remove(this._onNewSceneObserver);
        }
        const scene = this.state.scene;
        scene.onNewSkeletonAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewCameraAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewLightAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewMaterialAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewMeshAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewTextureAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onNewTransformNodeAddedObservable.removeCallback(this._sceneMutationFunc);
        scene.onSkeletonRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onMeshRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onCameraRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onLightRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onMaterialRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onTransformNodeRemovedObservable.removeCallback(this._sceneMutationFunc);
        scene.onTextureRemovedObservable.removeCallback(this._sceneMutationFunc);
    }
    filterContent(filter) {
        this.setState({ filter: filter });
    }
    findSiblings(parent, items, target, goNext, data) {
        if (!items) {
            return false;
        }
        const sortedItems = Tools.SortAndFilter(parent, items);
        if (!items || sortedItems.length === 0) {
            return false;
        }
        for (const item of sortedItems) {
            if (item === target) {
                // found the current selection!
                data.found = true;
                if (!goNext) {
                    if (data.previousOne) {
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(data.previousOne);
                    }
                    return true;
                }
            }
            else {
                if (data.found) {
                    this.props.globalState.onSelectionChangedObservable.notifyObservers(item);
                    return true;
                }
                data.previousOne = item;
            }
            if (item.getChildren && item.reservedDataStore && item.reservedDataStore.isExpanded) {
                if (this.findSiblings(item, item.getChildren(), target, goNext, data)) {
                    return true;
                }
            }
        }
        return false;
    }
    processKeys(keyEvent, allNodes) {
        if (!this.state.selectedEntity) {
            return;
        }
        const scene = this.state.scene;
        let search = false;
        let goNext = false;
        if (keyEvent.keyCode === 38) {
            // up
            search = true;
        }
        else if (keyEvent.keyCode === 40) {
            // down
            goNext = true;
            search = true;
        }
        else if (keyEvent.keyCode === 13 || keyEvent.keyCode === 39) {
            // enter or right
            const reservedDataStore = this.state.selectedEntity.reservedDataStore;
            if (reservedDataStore && reservedDataStore.setExpandedState) {
                reservedDataStore.setExpandedState(true);
            }
            keyEvent.preventDefault();
            return;
        }
        else if (keyEvent.keyCode === 37) {
            // left
            const reservedDataStore = this.state.selectedEntity.reservedDataStore;
            if (reservedDataStore && reservedDataStore.setExpandedState) {
                reservedDataStore.setExpandedState(false);
            }
            keyEvent.preventDefault();
            return;
        }
        else if (keyEvent.keyCode === 46) {
            // delete
            this.state.selectedEntity.dispose();
            this.props.globalState.onSelectionChangedObservable.notifyObservers(scene);
        }
        if (!search) {
            return;
        }
        keyEvent.preventDefault();
        const data = {};
        for (const nodeGroup of allNodes) {
            if (this.findSiblings(null, nodeGroup, this.state.selectedEntity, goNext, data)) {
                break;
            }
        }
    }
    _getPipelineContextMenus(scene, pipelines) {
        const defaultMenuItems = [];
        if (scene.activeCamera) {
            if (!pipelines.some((p) => p.getClassName() === "DefaultRenderingPipeline")) {
                defaultMenuItems.push({
                    label: "Add new Default Rendering Pipeline",
                    action: () => {
                        const newPipeline = new DefaultRenderingPipeline("Default rendering pipeline", true, scene, scene.cameras);
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(newPipeline);
                    },
                });
            }
            if (!pipelines.some((p) => p.getClassName() === "SSAORenderingPipeline")) {
                defaultMenuItems.push({
                    label: "Add new SSAO Rendering Pipeline",
                    action: () => {
                        const newPipeline = new SSAORenderingPipeline("SSAO rendering pipeline", scene, 1, scene.cameras);
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(newPipeline);
                    },
                });
            }
            if (scene.getEngine().getCaps().drawBuffersExtension && !pipelines.some((p) => p.getClassName() === "SSAORenderingPipeline")) {
                defaultMenuItems.push({
                    label: "Add new SSAO2 Rendering Pipeline",
                    action: () => {
                        const newPipeline = new SSAO2RenderingPipeline("SSAO2 rendering pipeline", scene, 1, scene.cameras);
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(newPipeline);
                    },
                });
            }
            if (scene.getEngine().getCaps().drawBuffersExtension && scene.getEngine().getCaps().texelFetch && !pipelines.some((p) => p.getClassName() === "SSRRenderingPipeline")) {
                defaultMenuItems.push({
                    label: "Add new SSR Rendering Pipeline",
                    action: () => {
                        const newPipeline = new SSRRenderingPipeline("SSR rendering pipeline", scene, scene.cameras);
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(newPipeline);
                    },
                });
            }
            if (scene.getEngine().getCaps().drawBuffersExtension &&
                scene.getEngine().getCaps().texelFetch &&
                !pipelines.some((p) => p.getClassName() === "IBLShadowsRenderingPipeline")) {
                defaultMenuItems.push({
                    label: "Add new IBL Shadows Rendering Pipeline",
                    action: () => {
                        const newPipeline = new IblShadowsRenderPipeline("IBL Shadows rendering pipeline", scene, {}, scene.cameras);
                        this.props.globalState.onSelectionChangedObservable.notifyObservers(newPipeline);
                    },
                });
            }
        }
        const customMenuItems = this.props.contextMenu?.pipeline || [];
        const useDefaults = !this.props.contextMenuOverride?.includes("pipeline");
        return useDefaults ? [...defaultMenuItems, ...customMenuItems] : customMenuItems;
    }
    _getNodeContextMenus(scene) {
        const defaultMenuItems = [];
        defaultMenuItems.push({
            label: "Add new point light",
            action: () => {
                const newPointLight = new PointLight("point light", Vector3.Zero(), scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newPointLight);
            },
        });
        defaultMenuItems.push({
            label: "Add new directional light",
            action: () => {
                const newDirectionalLight = new DirectionalLight("directional light", new Vector3(-1, -1, -0.5), scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newDirectionalLight);
            },
        });
        defaultMenuItems.push({
            label: "Add new free camera",
            action: () => {
                const newFreeCamera = new FreeCamera("free camera", scene.activeCamera ? scene.activeCamera.globalPosition : new Vector3(0, 0, -5), scene);
                if (scene.activeCamera) {
                    newFreeCamera.minZ = scene.activeCamera.minZ;
                    newFreeCamera.maxZ = scene.activeCamera.maxZ;
                    if (scene.activeCamera.getTarget) {
                        newFreeCamera.setTarget(scene.activeCamera.getTarget());
                    }
                }
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newFreeCamera);
            },
        });
        defaultMenuItems.push({
            label: "Add new mesh from Node Geometry",
            action: () => {
                const ng = new NodeGeometry("Node Geometry");
                ng.setToDefault();
                ng.build();
                const newMesh = ng.createMesh("Node geometry mesh", scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newMesh);
            },
        });
        const customMenuItems = this.props.contextMenu?.node || [];
        const useDefaults = !this.props.contextMenuOverride?.includes("node");
        return useDefaults ? [...defaultMenuItems, ...customMenuItems] : customMenuItems;
    }
    _getMaterialsContextMenus(scene) {
        const getUniqueName = (name) => {
            let idSubscript = 1;
            while (scene.getMaterialById(name)) {
                name = name + " " + idSubscript++;
            }
            return name;
        };
        const defaultMenuItems = [];
        defaultMenuItems.push({
            label: "Add new standard material",
            action: () => {
                const newStdMaterial = new StandardMaterial(getUniqueName("Standard material"), scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newStdMaterial);
            },
        });
        defaultMenuItems.push({
            label: "Add new PBR material",
            action: () => {
                const newPBRMaterial = new PBRMaterial(getUniqueName("PBR material"), scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newPBRMaterial);
            },
        });
        defaultMenuItems.push({
            label: "Add new node material",
            action: () => {
                const newNodeMaterial = new NodeMaterial(getUniqueName("node material"), scene);
                newNodeMaterial.setToDefault();
                newNodeMaterial.build(false, false, true);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newNodeMaterial);
            },
        });
        const customMenuItems = this.props.contextMenu?.materials || [];
        const useDefaults = !this.props.contextMenuOverride?.includes("materials");
        return useDefaults ? [...defaultMenuItems, ...customMenuItems] : customMenuItems;
    }
    _getSpriteManagersContextMenus(scene) {
        const defaultMenuItems = [];
        defaultMenuItems.push({
            label: "Add new sprite manager",
            action: () => {
                const newSpriteManager = new SpriteManager("Default sprite manager", "//playground.babylonjs.com/textures/player.png", 500, 64, scene);
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newSpriteManager);
            },
        });
        const customMenuItems = this.props.contextMenu?.spriteManagers || [];
        const useDefaults = !this.props.contextMenuOverride?.includes("spriteManagers");
        return useDefaults ? [...defaultMenuItems, ...customMenuItems] : customMenuItems;
    }
    _getParticleSystemsContextMenus(scene) {
        const defaultMenuItems = [];
        defaultMenuItems.push({
            label: "Add new CPU particle system",
            action: () => {
                const newSystem = ParticleHelper.CreateDefault(Vector3.Zero(), 10000, scene);
                newSystem.name = "CPU particle system";
                newSystem.start();
                this.props.globalState.onSelectionChangedObservable.notifyObservers(newSystem);
            },
        });
        if (GPUParticleSystem.IsSupported) {
            defaultMenuItems.push({
                label: "Add new GPU particle system",
                action: () => {
                    const newSystem = ParticleHelper.CreateDefault(Vector3.Zero(), 10000, scene, true);
                    newSystem.name = "GPU particle system";
                    newSystem.start();
                    this.props.globalState.onSelectionChangedObservable.notifyObservers(newSystem);
                },
            });
        }
        const customMenuItems = this.props.contextMenu?.particleSystems || [];
        const useDefaults = !this.props.contextMenuOverride?.includes("particleSystems");
        return useDefaults ? [...defaultMenuItems, ...customMenuItems] : customMenuItems;
    }
    renderContent(allNodes) {
        const scene = this.state.scene;
        if (!scene) {
            this._onNewSceneAddedObserver = EngineStore.LastCreatedEngine.onNewSceneAddedObservable.addOnce((scene) => this.setState({ scene: scene }));
            return null;
        }
        if (!this._hooked) {
            this._hooked = true;
            scene.onNewSkeletonAddedObservable.add(this._sceneMutationFunc);
            scene.onNewCameraAddedObservable.add(this._sceneMutationFunc);
            scene.onNewLightAddedObservable.add(this._sceneMutationFunc);
            scene.onNewMaterialAddedObservable.add(this._sceneMutationFunc);
            scene.onNewMeshAddedObservable.add(this._sceneMutationFunc);
            scene.onNewTextureAddedObservable.add(this._sceneMutationFunc);
            scene.onNewTransformNodeAddedObservable.add(this._sceneMutationFunc);
            scene.onSkeletonRemovedObservable.add(this._sceneMutationFunc);
            scene.onMeshRemovedObservable.add(this._sceneMutationFunc);
            scene.onCameraRemovedObservable.add(this._sceneMutationFunc);
            scene.onLightRemovedObservable.add(this._sceneMutationFunc);
            scene.onMaterialRemovedObservable.add(this._sceneMutationFunc);
            scene.onTransformNodeRemovedObservable.add(this._sceneMutationFunc);
            scene.onTextureRemovedObservable.add(this._sceneMutationFunc);
        }
        const guiElements = scene.textures.filter((t) => t.getClassName() === "AdvancedDynamicTexture");
        const textures = scene.textures.filter((t) => t.getClassName() !== "AdvancedDynamicTexture");
        const postProcesses = scene.postProcesses;
        const pipelines = scene.postProcessRenderPipelineManager.supportedPipelines;
        // Context menus
        const pipelineContextMenus = this._getPipelineContextMenus(scene, pipelines);
        const nodeContextMenus = this._getNodeContextMenus(scene);
        const materialsContextMenus = this._getMaterialsContextMenus(scene);
        const spriteManagersContextMenus = this._getSpriteManagersContextMenus(scene);
        const particleSystemsContextMenus = this._getParticleSystemsContextMenus(scene);
        const materials = [];
        materials.push(...scene.materials);
        if (scene.multiMaterials && scene.multiMaterials.length) {
            materials.push(...scene.multiMaterials);
        }
        const rootNodes = scene.rootNodes.slice(0);
        // Adding nodes parented to a bone
        for (const mesh of scene.meshes) {
            if (mesh.parent && mesh.parent.getClassName() === "Bone") {
                rootNodes.push(mesh);
            }
        }
        allNodes.push(rootNodes, scene.skeletons, materials, textures, postProcesses, pipelines, scene.effectLayers, scene.particleSystems, scene.spriteManagers, guiElements, scene.animationGroups);
        if (scene.mainSoundTrack) {
            allNodes.push(scene.mainSoundTrack.soundCollection);
        }
        return (_jsxs("div", { id: "tree", onContextMenu: (e) => e.preventDefault(), children: [_jsx(SceneExplorerFilterComponent, { onFilter: (filter) => this.filterContent(filter) }), _jsx(SceneTreeItemComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, scene: scene, onRefresh: () => this.forceUpdate(), onSelectionChangedObservable: this.props.globalState.onSelectionChangedObservable }), _jsx(TreeItemComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, contextMenuItems: nodeContextMenus, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: rootNodes, label: "Nodes", offset: 1, filter: this.state.filter }), scene.skeletons.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.skeletons, label: "Skeletons", offset: 1, filter: this.state.filter })), _jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: materials, contextMenuItems: materialsContextMenus, label: "Materials", offset: 1, filter: this.state.filter }), _jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: textures, label: "Textures", offset: 1, filter: this.state.filter }), postProcesses.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: postProcesses, label: "Post-processes", offset: 1, filter: this.state.filter })), _jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, contextMenuItems: pipelineContextMenus, selectedEntity: this.state.selectedEntity, items: pipelines, label: "Rendering pipelines", offset: 1, filter: this.state.filter }), scene.effectLayers && scene.effectLayers.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.effectLayers, label: "Effect layers", offset: 1, filter: this.state.filter })), _jsx(TreeItemComponent, { globalState: this.props.globalState, contextMenuItems: particleSystemsContextMenus, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.particleSystems, label: "Particle systems", offset: 1, filter: this.state.filter }), _jsx(TreeItemComponent, { globalState: this.props.globalState, contextMenuItems: spriteManagersContextMenus, forceSubitems: true, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.spriteManagers, label: "Sprite managers", offset: 1, filter: this.state.filter }), guiElements && guiElements.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: guiElements, label: "GUI", offset: 1, filter: this.state.filter })), scene.animationGroups.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.animationGroups, label: "Animation groups", offset: 1, filter: this.state.filter })), scene.mainSoundTrack && scene.mainSoundTrack.soundCollection.length > 0 && (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: scene.mainSoundTrack.soundCollection, label: "Sounds", offset: 1, filter: this.state.filter })), this.props.additionalNodes &&
                    this.props.additionalNodes.map((additionalNode) => {
                        return (_jsx(TreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.state.selectedEntity, items: additionalNode.getContent(), label: additionalNode.name, offset: 1, filter: this.state.filter }, additionalNode.name));
                    })] }));
    }
    onClose() {
        if (!this.props.onClose) {
            return;
        }
        this.props.onClose();
    }
    onPopup() {
        if (!this.props.onPopup) {
            return;
        }
        this.props.onPopup();
    }
    render() {
        const allNodes = [];
        if (this.props.popupMode) {
            return (_jsxs("div", { id: "sceneExplorer", tabIndex: 0, onKeyDown: (keyEvent) => this.processKeys(keyEvent, allNodes), children: [!this.props.noHeader && (_jsx(HeaderComponent, { title: "SCENE EXPLORER", noClose: this.props.noClose, noExpand: this.props.noExpand, noCommands: this.props.noCommands, onClose: () => this.onClose(), onPopup: () => this.onPopup() })), this.renderContent(allNodes)] }));
        }
        if (this._once) {
            this._once = false;
            // A bit hacky but no other way to force the initial width to 300px and not auto
            setTimeout(() => {
                const element = document.getElementById("sceneExplorer");
                if (!element) {
                    return;
                }
                element.style.width = "300px";
            }, 150);
        }
        return (_jsxs(ResizableCasted, { tabIndex: -1, id: "sceneExplorer", defaultSize: { height: "100%" }, ref: this._sceneExplorerRef, minWidth: 300, maxWidth: 600, minHeight: "100%", enable: { top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }, onKeyDown: (keyEvent) => this.processKeys(keyEvent, allNodes), children: [!this.props.noHeader && (_jsx(HeaderComponent, { title: "SCENE EXPLORER", noClose: this.props.noClose, noExpand: this.props.noExpand, noCommands: this.props.noCommands, onClose: () => this.onClose(), onPopup: () => this.onPopup() })), this.renderContent(allNodes)] }));
    }
}
//# sourceMappingURL=sceneExplorerComponent.js.map