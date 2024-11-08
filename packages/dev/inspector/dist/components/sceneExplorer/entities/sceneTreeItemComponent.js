import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PointerEventTypes } from "core/Events/pointerEvents";
import { GizmoManager } from "core/Gizmos/gizmoManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faImage, faCrosshairs, faArrowsAlt, faCompress, faRedoAlt, faVectorSquare, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
import { UtilityLayerRenderer } from "core/Rendering/utilityLayerRenderer";
import { PropertyChangedEvent } from "../../../components/propertyChangedEvent";
import { TmpVectors, Vector3 } from "core/Maths/math";
import { setDebugNode } from "../treeNodeDebugger";
export class SceneTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this._posDragEnd = null;
        this._scaleDragEnd = null;
        this._rotateDragEnd = null;
        const scene = this.props.scene;
        let gizmoMode = 0;
        if (scene.reservedDataStore && scene.reservedDataStore.gizmoManager) {
            const manager = scene.reservedDataStore.gizmoManager;
            if (manager.positionGizmoEnabled) {
                gizmoMode = 1;
            }
            else if (manager.rotationGizmoEnabled) {
                gizmoMode = 2;
            }
            else if (manager.scaleGizmoEnabled) {
                gizmoMode = 3;
            }
            else if (manager.boundingBoxGizmoEnabled) {
                gizmoMode = 4;
            }
            // autopicking is disable by default
            manager.enableAutoPicking = false;
        }
        this.state = { isSelected: false, isInPickingMode: false, gizmoMode: gizmoMode, isInWorldCoodinatesMode: false };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selectedEntity) {
            if (nextProps.scene === nextProps.selectedEntity) {
                nextState.isSelected = true;
                return true;
            }
            else {
                nextState.isSelected = false;
            }
        }
        this.updateGizmoAutoPicking(nextState.isInPickingMode);
        return true;
    }
    updateGizmoAutoPicking(isInPickingMode) {
        const scene = this.props.scene;
        if (scene.reservedDataStore && scene.reservedDataStore.gizmoManager) {
            const manager = scene.reservedDataStore.gizmoManager;
            manager.enableAutoPicking = isInPickingMode;
        }
    }
    componentDidMount() {
        if (!this.props.onSelectionChangedObservable) {
            return;
        }
        const scene = this.props.scene;
        this._onSelectionChangeObserver = this.props.onSelectionChangedObservable.add((entity) => {
            this._selectedEntity = entity;
            if (entity && scene.reservedDataStore && scene.reservedDataStore.gizmoManager) {
                const manager = scene.reservedDataStore.gizmoManager;
                const className = entity.getClassName();
                if (className === "TransformNode" || className.indexOf("Mesh") !== -1) {
                    manager.attachToMesh(entity);
                }
                else if (className.indexOf("Light") !== -1) {
                    if (!this._selectedEntity.reservedDataStore || !this._selectedEntity.reservedDataStore.lightGizmo) {
                        this.props.globalState.enableLightGizmo(this._selectedEntity, true, this.props.gizmoCamera);
                        this.forceUpdate();
                    }
                    manager.attachToNode(this._selectedEntity.reservedDataStore.lightGizmo.attachedNode);
                }
                else if (className.indexOf("Camera") !== -1) {
                    if (!this._selectedEntity.reservedDataStore || !this._selectedEntity.reservedDataStore.cameraGizmo) {
                        this.props.globalState.enableCameraGizmo(this._selectedEntity, true, this.props.gizmoCamera);
                        this.forceUpdate();
                    }
                    manager.attachToNode(this._selectedEntity.reservedDataStore.cameraGizmo.attachedNode);
                }
                else if (className.indexOf("Bone") !== -1) {
                    manager.attachToMesh(this._selectedEntity._linkedTransformNode ? this._selectedEntity._linkedTransformNode : this._selectedEntity);
                    if (!this._selectedEntity._linkedTransformNode) {
                        manager.additionalTransformNode = this._getMeshFromBone(this._selectedEntity, scene);
                    }
                }
                else {
                    manager.attachToNode(null);
                }
            }
        });
    }
    _getMeshFromBone(bone, scene) {
        const skeleton = bone.getSkeleton();
        // First try to find a mesh for which we've enabled the skeleton viewer
        for (const mesh of scene.meshes) {
            const skeletonViewer = mesh.reservedDataStore?.skeletonViewer;
            if (skeletonViewer && skeletonViewer.skeleton === skeleton) {
                return mesh;
            }
        }
        // Not found, return the first mesh that uses the skeleton
        for (const mesh of scene.meshes) {
            if (mesh.skeleton === skeleton) {
                return mesh;
            }
        }
        return undefined;
    }
    componentWillUnmount() {
        const scene = this.props.scene;
        if (this._onPointerObserver) {
            scene.onPointerObservable.remove(this._onPointerObserver);
            this._onPointerObserver = null;
        }
        if (this._gizmoLayerOnPointerObserver) {
            scene.onPointerObservable.remove(this._gizmoLayerOnPointerObserver);
            this._gizmoLayerOnPointerObserver = null;
        }
        if (this._onSelectionChangeObserver && this.props.onSelectionChangedObservable) {
            this.props.onSelectionChangedObservable.remove(this._onSelectionChangeObserver);
        }
    }
    onSelect() {
        if (!this.props.onSelectionChangedObservable) {
            return;
        }
        const scene = this.props.scene;
        // Put scene object into window.debugNode
        setDebugNode(scene);
        this.props.onSelectionChangedObservable.notifyObservers(scene);
    }
    onCoordinatesMode() {
        const scene = this.props.scene;
        const manager = scene.reservedDataStore.gizmoManager;
        // flip coordinate system
        manager.coordinatesMode = this.state.isInWorldCoodinatesMode ? 1 /* GizmoCoordinatesMode.Local */ : 0 /* GizmoCoordinatesMode.World */;
        this.setState({ isInWorldCoodinatesMode: !this.state.isInWorldCoodinatesMode });
    }
    onPickingMode() {
        const scene = this.props.scene;
        if (this._onPointerObserver) {
            scene.onPointerObservable.remove(this._onPointerObserver);
            this._onPointerObserver = null;
        }
        if (!this.state.isInPickingMode) {
            this._onPointerObserver = scene.onPointerObservable.add(() => {
                const pickPosition = scene.unTranslatedPointer;
                const pickInfo = scene.pick(pickPosition.x, pickPosition.y, (mesh) => mesh.isEnabled() && mesh.isVisible && mesh.getTotalVertices() > 0, false, undefined, (p0, p1, p2, ray) => {
                    if (!this.props.globalState.ignoreBackfacesForPicking) {
                        return true;
                    }
                    const p0p1 = TmpVectors.Vector3[0];
                    const p1p2 = TmpVectors.Vector3[1];
                    let normal = TmpVectors.Vector3[2];
                    p1.subtractToRef(p0, p0p1);
                    p2.subtractToRef(p1, p1p2);
                    normal = Vector3.Cross(p0p1, p1p2);
                    return Vector3.Dot(normal, ray.direction) < 0;
                });
                // Pick light gizmos first
                if (this.props.globalState.lightGizmos.length > 0) {
                    const gizmoScene = this.props.globalState.lightGizmos[0].gizmoLayer.utilityLayerScene;
                    const pickInfo = gizmoScene.pick(pickPosition.x, pickPosition.y, (m) => {
                        for (const g of this.props.globalState.lightGizmos) {
                            if (g.attachedNode == m) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (pickInfo && pickInfo.hit && this.props.onSelectionChangedObservable) {
                        this.props.onSelectionChangedObservable.notifyObservers(pickInfo.pickedMesh);
                        return;
                    }
                }
                // Pick camera gizmos
                if (this.props.globalState.cameraGizmos.length > 0) {
                    const gizmoScene = this.props.globalState.cameraGizmos[0].gizmoLayer.utilityLayerScene;
                    const pickInfo = gizmoScene.pick(pickPosition.x, pickPosition.y, (m) => {
                        for (const g of this.props.globalState.cameraGizmos) {
                            if (g.attachedNode == m) {
                                return true;
                            }
                        }
                        return false;
                    });
                    if (pickInfo && pickInfo.hit && this.props.onSelectionChangedObservable) {
                        this.props.onSelectionChangedObservable.notifyObservers(pickInfo.pickedMesh);
                        return;
                    }
                }
                if (pickInfo && pickInfo.hit && this.props.onSelectionChangedObservable) {
                    this.props.onSelectionChangedObservable.notifyObservers(pickInfo.pickedMesh);
                }
            }, PointerEventTypes.POINTERTAP);
        }
        this.setState({ isInPickingMode: !this.state.isInPickingMode });
    }
    setGizmoMode(mode) {
        const scene = this.props.scene;
        if (!scene.reservedDataStore) {
            scene.reservedDataStore = {};
        }
        if (this._gizmoLayerOnPointerObserver) {
            scene.onPointerObservable.remove(this._gizmoLayerOnPointerObserver);
            this._gizmoLayerOnPointerObserver = null;
        }
        if (!scene.reservedDataStore.gizmoManager) {
            scene.reservedDataStore.gizmoManager = new GizmoManager(scene, undefined, new UtilityLayerRenderer(scene), new UtilityLayerRenderer(scene));
        }
        if (this.props.gizmoCamera) {
            scene.reservedDataStore.gizmoManager.utilityLayer.setRenderCamera(this.props.gizmoCamera);
        }
        const manager = scene.reservedDataStore.gizmoManager;
        // Allow picking of light gizmo when a gizmo mode is selected
        this._gizmoLayerOnPointerObserver = UtilityLayerRenderer.DefaultUtilityLayer.utilityLayerScene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == PointerEventTypes.POINTERDOWN) {
                if (pointerInfo.pickInfo && pointerInfo.pickInfo.pickedMesh) {
                    let node = pointerInfo.pickInfo.pickedMesh;
                    // Attach to the most parent node
                    while (node && node.parent != null) {
                        node = node.parent;
                    }
                    for (const gizmo of this.props.globalState.lightGizmos) {
                        if (gizmo._rootMesh == node) {
                            manager.attachToNode(gizmo.attachedNode);
                        }
                    }
                }
            }
        });
        manager.boundingBoxGizmoEnabled = false;
        manager.positionGizmoEnabled = false;
        manager.rotationGizmoEnabled = false;
        manager.scaleGizmoEnabled = false;
        if (this.state.gizmoMode === mode) {
            mode = 0;
            manager.dispose();
            scene.reservedDataStore.gizmoManager = null;
        }
        else {
            switch (mode) {
                case 1:
                    manager.positionGizmoEnabled = true;
                    if (!this._posDragEnd) {
                        // Record movement for generating replay code
                        this._posDragEnd = manager.gizmos.positionGizmo.onDragEndObservable.add(() => {
                            if (manager.gizmos.positionGizmo && manager.gizmos.positionGizmo.attachedNode) {
                                const lightGizmo = manager.gizmos.positionGizmo.attachedNode.reservedDataStore
                                    ? manager.gizmos.positionGizmo.attachedNode.reservedDataStore.lightGizmo
                                    : null;
                                const objLight = lightGizmo && lightGizmo.light ? lightGizmo.light : manager.gizmos.positionGizmo.attachedNode;
                                if (objLight.position) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objLight;
                                    e.property = "position";
                                    e.value = objLight.position;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                                else {
                                    const cameraGizmo = manager.gizmos.positionGizmo.attachedNode.reservedDataStore
                                        ? manager.gizmos.positionGizmo.attachedNode.reservedDataStore.cameraGizmo
                                        : null;
                                    const objCamera = cameraGizmo && cameraGizmo.camera ? cameraGizmo.camera : manager.gizmos.positionGizmo.attachedNode;
                                    if (objCamera.position) {
                                        const e = new PropertyChangedEvent();
                                        e.object = objCamera;
                                        e.property = "position";
                                        e.value = objCamera.position;
                                        this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                    }
                                }
                            }
                        });
                    }
                    break;
                case 2:
                    manager.rotationGizmoEnabled = true;
                    if (!this._rotateDragEnd) {
                        // Record movement for generating replay code
                        this._rotateDragEnd = manager.gizmos.rotationGizmo.onDragEndObservable.add(() => {
                            if (manager.gizmos.rotationGizmo && manager.gizmos.rotationGizmo.attachedNode) {
                                const lightGizmo = manager.gizmos.rotationGizmo.attachedNode.reservedDataStore
                                    ? manager.gizmos.rotationGizmo.attachedNode.reservedDataStore.lightGizmo
                                    : null;
                                const objLight = lightGizmo && lightGizmo.light ? lightGizmo.light : manager.gizmos.rotationGizmo.attachedNode;
                                const cameraGizmo = manager.gizmos.rotationGizmo.attachedNode.reservedDataStore
                                    ? manager.gizmos.rotationGizmo.attachedNode.reservedDataStore.cameraGizmo
                                    : null;
                                const objCamera = cameraGizmo && cameraGizmo.camera ? cameraGizmo.camera : manager.gizmos.rotationGizmo.attachedNode;
                                if (objLight.rotationQuaternion) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objLight;
                                    e.property = "rotationQuaternion";
                                    e.value = objLight.rotationQuaternion;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                                else if (objLight.rotation) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objLight;
                                    e.property = "rotation";
                                    e.value = objLight.rotation;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                                else if (objLight.direction) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objLight;
                                    e.property = "direction";
                                    e.value = objLight.direction;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                                else if (objCamera.rotationQuaternion) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objCamera;
                                    e.property = "rotationQuaternion";
                                    e.value = objCamera.rotationQuaternion;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                                else if (objCamera.rotation) {
                                    const e = new PropertyChangedEvent();
                                    e.object = objCamera;
                                    e.property = "rotation";
                                    e.value = objCamera.rotation;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                            }
                        });
                    }
                    break;
                case 3:
                    manager.scaleGizmoEnabled = true;
                    if (!this._scaleDragEnd) {
                        // Record movement for generating replay code
                        this._scaleDragEnd = manager.gizmos.scaleGizmo.onDragEndObservable.add(() => {
                            if (manager.gizmos.scaleGizmo && manager.gizmos.scaleGizmo.attachedMesh) {
                                const lightGizmo = manager.gizmos.scaleGizmo.attachedMesh.reservedDataStore
                                    ? manager.gizmos.scaleGizmo.attachedMesh.reservedDataStore.lightGizmo
                                    : null;
                                const obj = lightGizmo && lightGizmo.light ? lightGizmo.light : manager.gizmos.scaleGizmo.attachedMesh;
                                if (obj.scaling) {
                                    const e = new PropertyChangedEvent();
                                    e.object = obj;
                                    e.property = "scaling";
                                    e.value = obj.scaling;
                                    this.props.globalState.onPropertyChangedObservable.notifyObservers(e);
                                }
                            }
                        });
                    }
                    break;
                case 4:
                    manager.boundingBoxGizmoEnabled = true;
                    if (manager.gizmos.boundingBoxGizmo) {
                        manager.gizmos.boundingBoxGizmo.fixedDragMeshScreenSize = true;
                    }
                    break;
            }
            if (this._selectedEntity && this._selectedEntity.getClassName) {
                const className = this._selectedEntity.getClassName();
                if (className === "TransformNode" || className.indexOf("Mesh") !== -1) {
                    manager.attachToMesh(this._selectedEntity);
                }
                else if (className.indexOf("Light") !== -1) {
                    if (!this._selectedEntity.reservedDataStore || !this._selectedEntity.reservedDataStore.lightGizmo) {
                        this.props.globalState.enableLightGizmo(this._selectedEntity, true, this.props.gizmoCamera);
                        this.forceUpdate();
                    }
                    manager.attachToNode(this._selectedEntity.reservedDataStore.lightGizmo.attachedNode);
                }
                else if (className.indexOf("Camera") !== -1) {
                    if (!this._selectedEntity.reservedDataStore || !this._selectedEntity.reservedDataStore.cameraGizmo) {
                        this.props.globalState.enableCameraGizmo(this._selectedEntity, true, this.props.gizmoCamera);
                        this.forceUpdate();
                    }
                    manager.attachToNode(this._selectedEntity.reservedDataStore.cameraGizmo.attachedNode);
                }
                else if (className.indexOf("Bone") !== -1) {
                    manager.attachToMesh(this._selectedEntity._linkedTransformNode ? this._selectedEntity._linkedTransformNode : this._selectedEntity);
                    if (!this._selectedEntity._linkedTransformNode) {
                        manager.additionalTransformNode = this._getMeshFromBone(this._selectedEntity, scene);
                    }
                }
            }
        }
        this.setState({ gizmoMode: mode });
    }
    render() {
        return (_jsx("div", { className: this.state.isSelected ? "itemContainer selected" : "itemContainer", children: _jsxs("div", { className: "sceneNode", children: [_jsxs("div", { className: "sceneTitle", onClick: () => this.onSelect(), children: [_jsx(FontAwesomeIcon, { icon: faImage }), "\u00A0Scene"] }), _jsx("div", { className: this.state.gizmoMode === 1 ? "translation selected icon" : "translation icon", onClick: () => this.setGizmoMode(1), title: "Enable/Disable position mode", children: _jsx(FontAwesomeIcon, { icon: faArrowsAlt }) }), _jsx("div", { className: this.state.gizmoMode === 2 ? "rotation selected icon" : "rotation icon", onClick: () => this.setGizmoMode(2), title: "Enable/Disable rotation mode", children: _jsx(FontAwesomeIcon, { icon: faRedoAlt }) }), _jsx("div", { className: this.state.gizmoMode === 3 ? "scaling selected icon" : "scaling icon", onClick: () => this.setGizmoMode(3), title: "Enable/Disable scaling mode", children: _jsx(FontAwesomeIcon, { icon: faCompress }) }), _jsx("div", { className: this.state.gizmoMode === 4 ? "bounding selected icon" : "bounding icon", onClick: () => this.setGizmoMode(4), title: "Enable/Disable bounding box mode", children: _jsx(FontAwesomeIcon, { icon: faVectorSquare }) }), _jsx("div", { className: "separator" }), _jsx("div", { className: this.state.isInPickingMode ? "pickingMode selected icon" : "pickingMode icon", onClick: () => this.onPickingMode(), title: "Turn picking mode on/off", children: _jsx(FontAwesomeIcon, { icon: faCrosshairs }) }), _jsx("div", { className: this.state.isInWorldCoodinatesMode ? "coordinates selected icon" : "coordinates icon", onClick: () => this.onCoordinatesMode(), title: "Switch between world and local coordinates", children: _jsx(FontAwesomeIcon, { icon: faLocationDot }) }), _jsx("div", { className: "refresh icon", onClick: () => this.props.onRefresh(), title: "Refresh the explorer", children: _jsx(FontAwesomeIcon, { icon: faSyncAlt }) }), _jsx(ExtensionsComponent, { target: this.props.scene, extensibilityGroups: this.props.extensibilityGroups })] }) }));
    }
}
//# sourceMappingURL=sceneTreeItemComponent.js.map