import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import resetButton from "./assets/reset.svg";
import uploadButton from "./assets/upload.svg";
import saveButton from "./assets/save.svg";
import babylonLogo from "./assets/babylonLogo.svg";
import resizeButton from "./assets/resizeTool.svg";
import mipUp from "./assets/mipUp.svg";
import mipDown from "./assets/mipDown.svg";
import posX from "./assets/posX.svg";
import negX from "./assets/negX.svg";
import posY from "./assets/posY.svg";
import negY from "./assets/negY.svg";
import posZ from "./assets/posZ.svg";
import negZ from "./assets/negZ.svg";
export class PropertiesBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this._faces = [posX, negX, posY, negY, posZ, negZ];
        this.state = {
            width: props.size.width,
            height: props.size.height,
        };
    }
    _pixelData(props) {
        return (_jsxs("span", { className: "pixel-data", children: [props.name, ": ", _jsx("span", { className: "value", children: props.data !== undefined ? props.data : "-" })] }));
    }
    _getNewDimension(oldDim, newDim) {
        if (!isNaN(newDim)) {
            if (parseInt(newDim) > 0) {
                if (Number.isInteger(parseInt(newDim)))
                    return parseInt(newDim);
            }
        }
        return oldDim;
    }
    componentWillUpdate(nextProps) {
        if (nextProps.size.width != this.props.size.width || nextProps.size.height != this.props.size.height) {
            this.setState({
                width: nextProps.size.width,
                height: nextProps.size.height,
            });
        }
    }
    render() {
        const { mipLevel, setMipLevel, pixelData, resizeTexture, texture, face, setFace, saveTexture, resetTexture, uploadTexture } = this.props;
        const maxLevels = Math.floor(Math.log2(Math.max(texture.getSize().width, texture.getSize().height)));
        const engine = texture.getScene().getEngine();
        const mipsEnabled = !texture.noMipmap && engine.getCaps().textureLOD;
        return (_jsxs("div", { id: "properties", children: [_jsx("div", { className: "tab", id: "logo-tab", children: _jsx("img", { className: "icon", src: babylonLogo }) }), _jsxs("div", { id: "left", children: [_jsx("div", { className: "tab", id: "dimensions-tab", children: _jsxs("form", { onSubmit: (evt) => {
                                    this.props.resizeTexture(this.state.width, this.state.height);
                                    evt.preventDefault();
                                }, children: [_jsxs("label", { className: "dimensions", children: ["W:", " ", _jsx("input", { type: "text", value: this.state.width, readOnly: texture.isCube, onChange: (evt) => this.setState({ width: this._getNewDimension(this.state.width, evt.target.value) }) })] }), _jsxs("label", { className: "dimensions", children: ["H:", " ", _jsx("input", { type: "text", value: this.state.height, readOnly: texture.isCube, onChange: (evt) => this.setState({ height: this._getNewDimension(this.state.height, evt.target.value) }) })] }), !texture.isCube && (_jsx("img", { id: "resize", className: "icon button", title: "Resize", alt: "Resize", src: resizeButton, onClick: () => resizeTexture(this.state.width, this.state.height) }))] }) }), _jsxs("div", { className: "tab", id: "pixel-coords-tab", children: [_jsx(this._pixelData, { name: "X", data: pixelData.x }), _jsx(this._pixelData, { name: "Y", data: pixelData.y })] }), _jsxs("div", { className: "tab", id: "pixel-color-tab", children: [_jsx(this._pixelData, { name: "R", data: pixelData.r }), _jsx(this._pixelData, { name: "G", data: pixelData.g }), _jsx(this._pixelData, { name: "B", data: pixelData.b }), _jsx(this._pixelData, { name: "A", data: pixelData.a })] }), texture.isCube && (_jsx("div", { className: "tab", id: "face-tab", children: this._faces.map((value, index) => (_jsx("img", { className: face == index ? "icon face button active" : "icon face button", src: value, onClick: () => setFace(index) }, index))) })), mipsEnabled && (_jsxs("div", { className: "tab", id: "mip-tab", children: [_jsx("img", { title: "Mip Preview Up", className: "icon button", src: mipUp, onClick: () => mipLevel > 0 && setMipLevel(mipLevel - 1) }), _jsx("img", { title: "Mip Preview Down", className: "icon button", src: mipDown, onClick: () => mipLevel < maxLevels && setMipLevel(mipLevel + 1) })] }))] }), _jsxs("div", { className: "tab", id: "right-tab", children: [_jsx("img", { title: "Reset", className: "icon button", src: resetButton, onClick: () => resetTexture() }), _jsxs("label", { children: [_jsx("input", { accept: ".jpg, .png, .tga, .dds, .env, .exr", type: "file", onChange: (evt) => {
                                        const files = evt.target.files;
                                        if (files && files.length) {
                                            uploadTexture(files[0]);
                                        }
                                        evt.target.value = "";
                                    } }), _jsx("img", { title: "Upload", className: "icon button", src: uploadButton })] }), _jsx("img", { title: "Save", className: "icon button", src: saveButton, onClick: () => saveTexture() })] })] }));
    }
}
//# sourceMappingURL=propertiesBar.js.map