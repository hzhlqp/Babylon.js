import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Color3, Color4 } from "core/Maths/math.color";
import { DataStorage } from "core/Misc/dataStorage";
import popUpIcon from "./svgs/popOut.svg";
import colorPicker from "./svgs/colorPicker.svg";
import pauseIcon from "./svgs/pauseIcon.svg";
import playIcon from "./svgs/playIcon.svg";
import frameIcon from "./svgs/frameIcon.svg";
export class PreviewMeshControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this._colorInputRef = React.createRef();
        this._onResetRequiredObserver = this.props.globalState.onResetRequiredObservable.add(() => {
            this.forceUpdate();
        });
        this._onRefreshPreviewMeshControlComponentRequiredObserver = this.props.globalState.onRefreshPreviewMeshControlComponentRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.globalState.onResetRequiredObservable.remove(this._onResetRequiredObserver);
        this.props.globalState.onRefreshPreviewMeshControlComponentRequiredObservable.remove(this._onRefreshPreviewMeshControlComponentRequiredObserver);
    }
    onPopUp() {
        this.props.togglePreviewAreaComponent();
    }
    changeAnimation() {
        this.props.globalState.rotatePreview = !this.props.globalState.rotatePreview;
        this.props.globalState.onAnimationCommandActivated.notifyObservers();
        this.forceUpdate();
    }
    changeBackground(value) {
        const newColor = Color3.FromHexString(value);
        DataStorage.WriteNumber("BackgroundColorR", newColor.r);
        DataStorage.WriteNumber("BackgroundColorG", newColor.g);
        DataStorage.WriteNumber("BackgroundColorB", newColor.b);
        const newBackgroundColor = Color4.FromColor3(newColor, 1.0);
        this.props.globalState.backgroundColor = newBackgroundColor;
        this.props.globalState.onPreviewBackgroundChanged.notifyObservers();
    }
    changeBackgroundClick() {
        this._colorInputRef.current?.click();
    }
    frame() {
        this.props.globalState.onFrame.notifyObservers();
    }
    render() {
        return (_jsxs("div", { id: "preview-mesh-bar", children: [_jsxs(_Fragment, { children: [_jsx("div", { title: "Frame camera", onClick: () => this.frame(), className: "button", id: "frame-button", children: _jsx("img", { src: frameIcon, alt: "" }) }), _jsx("div", { title: "Turn-table animation", onClick: () => this.changeAnimation(), className: "button", id: "play-button", children: this.props.globalState.rotatePreview ? _jsx("img", { src: pauseIcon, alt: "" }) : _jsx("img", { src: playIcon, alt: "" }) }), _jsxs("div", { id: "color-picker-button", title: "Background color", className: "button align", onClick: (_) => this.changeBackgroundClick(), children: [_jsx("img", { src: colorPicker, alt: "", id: "color-picker-image" }), _jsx("input", { ref: this._colorInputRef, id: "color-picker", type: "color", value: this.props.globalState.backgroundColor.toHexString().slice(0, 7), onChange: (evt) => this.changeBackground(evt.target.value) })] })] }), _jsx("div", { title: "Open preview in new window", id: "preview-new-window", onClick: () => this.onPopUp(), className: "button", children: _jsx("img", { src: popUpIcon, alt: "" }) })] }));
    }
}
//# sourceMappingURL=previewMeshControlComponent.js.map