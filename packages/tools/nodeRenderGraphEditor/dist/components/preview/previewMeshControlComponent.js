import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { PreviewType } from "./previewType";
import { DataStorage } from "core/Misc/dataStorage";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import popUpIcon from "./svgs/popOut.svg";
import envPicker from "./svgs/envPicker.svg";
import frameIcon from "./svgs/frameIcon.svg";
export class PreviewMeshControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this._filePickerRef = React.createRef();
        this._envPickerRef = React.createRef();
        this._onResetRequiredObserver = this.props.globalState.onResetRequiredObservable.add(() => {
            this.forceUpdate();
        });
        this._onDropEventObserver = this.props.globalState.onDropEventReceivedObservable.add((event) => {
            this.useCustomMesh(event);
        });
        this._onRefreshPreviewMeshControlComponentRequiredObserver = this.props.globalState.onRefreshPreviewMeshControlComponentRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.globalState.onResetRequiredObservable.remove(this._onResetRequiredObserver);
        this.props.globalState.onDropEventReceivedObservable.remove(this._onDropEventObserver);
        this.props.globalState.onRefreshPreviewMeshControlComponentRequiredObservable.remove(this._onRefreshPreviewMeshControlComponentRequiredObserver);
    }
    changeMeshType(newOne) {
        if (this.props.globalState.previewType === newOne) {
            return;
        }
        this.props.globalState.previewType = newOne;
        this.props.globalState.stateManager.onPreviewCommandActivated.notifyObservers(false);
        DataStorage.WriteNumber("PreviewType", newOne);
        this.forceUpdate();
    }
    useCustomMesh(evt) {
        const files = evt.target?.files || evt.dataTransfer?.files;
        if (files && files.length) {
            const file = files[0];
            this.props.globalState.previewFile = file;
            this.props.globalState.previewType = PreviewType.Custom;
            this.props.globalState.listOfCustomPreviewFiles = [...files];
            this.props.globalState.stateManager.onPreviewCommandActivated.notifyObservers(false);
            this.forceUpdate();
        }
        if (this._filePickerRef.current) {
            this._filePickerRef.current.value = "";
        }
    }
    useCustomEnv(evt) {
        const files = evt.target?.files || evt.dataTransfer?.files;
        if (files && files.length) {
            const file = files[0];
            this.props.globalState.envFile = file;
            this.props.globalState.envType = PreviewType.Custom;
            this.props.globalState.stateManager.onPreviewCommandActivated.notifyObservers(false);
            this.forceUpdate();
        }
        if (this._envPickerRef.current) {
            this._envPickerRef.current.value = "";
        }
    }
    onPopUp() {
        this.props.togglePreviewAreaComponent();
    }
    frame() {
        this.props.globalState.onFrame.notifyObservers();
    }
    render() {
        const meshTypeOptions = [
            { label: "Cube", value: PreviewType.Box },
            { label: "Cylinder", value: PreviewType.Cylinder },
            { label: "Plane", value: PreviewType.Plane },
            { label: "Shader ball", value: PreviewType.ShaderBall },
            { label: "Sphere", value: PreviewType.Sphere },
            { label: "Load...", value: PreviewType.Custom + 1 },
        ];
        if (this.props.globalState.listOfCustomPreviewFiles.length > 0) {
            meshTypeOptions.splice(0, 0, {
                label: "Custom",
                value: PreviewType.Custom,
            });
        }
        const options = meshTypeOptions;
        const accept = ".*";
        return (_jsxs("div", { id: "preview-mesh-bar", children: [_jsxs(_Fragment, { children: [_jsx(OptionsLine, { label: "", options: options, target: this.props.globalState, propertyName: "previewType", noDirectUpdate: true, onSelect: (value) => {
                                if (value !== PreviewType.Custom + 1) {
                                    this.changeMeshType(value);
                                }
                                else {
                                    this._filePickerRef.current?.click();
                                }
                            } }), _jsxs("div", { style: {
                                display: "none",
                            }, title: "Preview with a custom mesh", children: [_jsx("input", { ref: this._filePickerRef, multiple: true, id: "file-picker", type: "file", onChange: (evt) => this.useCustomMesh(evt), accept: accept }), _jsx("input", { ref: this._envPickerRef, id: "env-picker", accept: ".env", type: "file", onChange: (evt) => this.useCustomEnv(evt) })] }), _jsx("div", { id: "env-button", title: "Environment image", className: "button", onClick: (_) => this._envPickerRef.current?.click(), children: _jsx("img", { src: envPicker, alt: "", id: "env-picker-image" }) }), _jsx("div", { title: "Frame camera", onClick: () => this.frame(), className: "button", id: "frame-button", children: _jsx("img", { src: frameIcon, alt: "" }) })] }), _jsx("div", { title: "Open preview in new window", id: "preview-new-window", onClick: () => this.onPopUp(), className: "button", children: _jsx("img", { src: popUpIcon, alt: "" }) })] }));
    }
}
//# sourceMappingURL=previewMeshControlComponent.js.map