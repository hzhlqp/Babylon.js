import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faCamera, faEye } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class CameraTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        const camera = this.props.camera;
        const scene = camera.getScene();
        this.state = { isActive: scene.activeCamera === camera, isGizmoEnabled: camera.reservedDataStore && camera.reservedDataStore.cameraGizmo };
    }
    setActive() {
        const camera = this.props.camera;
        const scene = camera.getScene();
        const previousActiveCamera = scene.activeCamera;
        scene.activeCamera = camera;
        camera.attachControl(true);
        this.props.globalState.onPropertyChangedObservable.notifyObservers({ object: scene, property: "activeCamera", value: camera, initialValue: previousActiveCamera });
        this.setState({ isActive: true });
    }
    componentDidMount() {
        const scene = this.props.camera.getScene();
        this._onBeforeRenderObserver = scene.onBeforeRenderObservable.add(() => {
            const camera = this.props.camera;
            // This will deactivate the previous camera when the camera is changed. Multiple camera's cycle frequently so only do this for single cameras
            if (this.state.isActive && scene.activeCameras && scene.activeCameras.length <= 1 && scene.activeCamera !== camera) {
                camera.detachControl();
            }
            const newState = scene.activeCamera === camera;
            if (newState !== this.state.isActive) {
                this.setState({ isActive: newState });
            }
        });
    }
    componentWillUnmount() {
        if (this._onBeforeRenderObserver) {
            const camera = this.props.camera;
            const scene = camera.getScene();
            scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
        }
    }
    toggleGizmo() {
        const camera = this.props.camera;
        if (camera.reservedDataStore && camera.reservedDataStore.cameraGizmo) {
            if (camera.getScene().reservedDataStore && camera.getScene().reservedDataStore.gizmoManager) {
                camera.getScene().reservedDataStore.gizmoManager.attachToMesh(null);
            }
            this.props.globalState.enableCameraGizmo(camera, false);
            this.setState({ isGizmoEnabled: false });
        }
        else {
            this.props.globalState.enableCameraGizmo(camera, true, this.props.gizmoCamera);
            this.setState({ isGizmoEnabled: true });
        }
    }
    render() {
        const isActiveElement = this.state.isActive ? _jsx(FontAwesomeIcon, { icon: faVideo }) : _jsx(FontAwesomeIcon, { icon: faVideo, className: "isNotActive" });
        const scene = this.props.camera.getScene();
        const isGizmoEnabled = this.state.isGizmoEnabled || (this.props.camera && this.props.camera.reservedDataStore && this.props.camera.reservedDataStore.cameraGizmo) ? (_jsx(FontAwesomeIcon, { icon: faEye })) : (_jsx(FontAwesomeIcon, { icon: faEye, className: "isNotActive" }));
        return (_jsxs("div", { className: "cameraTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.camera.name, onClick: () => this.props.onClick(), icon: faCamera, color: "green" }), (!scene.activeCameras || scene.activeCameras.length === 0) && (_jsx("div", { className: "activeCamera icon", onClick: () => this.setActive(), title: "Set as main camera and attach to controls", children: isActiveElement })), _jsx("div", { className: "enableGizmo icon", onClick: () => this.toggleGizmo(), title: "Turn on/off the camera's gizmo", children: isGizmoEnabled }), _jsx(ExtensionsComponent, { target: this.props.camera, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=cameraTreeItemComponent.js.map