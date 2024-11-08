import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import wireframe from "./svgs/wireframe.svg";
import matCap from "./svgs/matCap.svg";
import texture from "./svgs/textureIcon.svg";
import vertexColor from "./svgs/vertexColor.svg";
import doubleSided from "./svgs/doubleSided.svg";
import { PreviewMode } from "./previewMode";
export class PreviewAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onPointerOverCanvas = () => {
            this.props.globalState.pointerOverCanvas = true;
        };
        this._onPointerOutCanvas = () => {
            this.props.globalState.pointerOverCanvas = false;
        };
        this.state = { isLoading: true };
        this._onIsLoadingChangedObserver = this.props.globalState.onIsLoadingChanged.add((state) => this.setState({ isLoading: state }));
        this._onResetRequiredObserver = this.props.globalState.onResetRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.globalState.onIsLoadingChanged.remove(this._onIsLoadingChangedObserver);
        this.props.globalState.onResetRequiredObservable.remove(this._onResetRequiredObserver);
    }
    changeWireframe() {
        if (this.props.globalState.previewMode === PreviewMode.Wireframe) {
            this.props.globalState.previewMode = PreviewMode.Normal;
        }
        else {
            this.props.globalState.previewMode = PreviewMode.Wireframe;
        }
        this.forceUpdate();
    }
    changeVertexColor() {
        if (this.props.globalState.previewMode === PreviewMode.VertexColor) {
            this.props.globalState.previewMode = PreviewMode.Normal;
        }
        else {
            this.props.globalState.previewMode = PreviewMode.VertexColor;
        }
        this.forceUpdate();
    }
    changeMatCap() {
        if (this.props.globalState.previewMode === PreviewMode.MatCap) {
            this.props.globalState.previewMode = PreviewMode.Normal;
        }
        else {
            this.props.globalState.previewMode = PreviewMode.MatCap;
        }
        this.forceUpdate();
    }
    changeTexture() {
        if (this.props.globalState.previewMode === PreviewMode.Textured) {
            this.props.globalState.previewMode = PreviewMode.Normal;
        }
        else {
            this.props.globalState.previewMode = PreviewMode.Textured;
        }
        this.forceUpdate();
    }
    changeNormals() {
        if (this.props.globalState.previewMode === PreviewMode.Normals) {
            this.props.globalState.previewMode = PreviewMode.Normal;
        }
        else {
            this.props.globalState.previewMode = PreviewMode.Normals;
        }
        this.forceUpdate();
    }
    render() {
        return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "preview", style: { height: this.props.width + "px" }, children: [_jsx("canvas", { onPointerOver: this._onPointerOverCanvas, onPointerOut: this._onPointerOutCanvas, id: "preview-canvas" }), _jsx("div", { className: "waitPanel" + (this.state.isLoading ? "" : " hidden"), children: "Please wait, loading..." })] }), _jsx(_Fragment, { children: _jsxs("div", { id: "preview-config-bar", children: [_jsx("div", { title: "Render with normals", onClick: () => this.changeNormals(), className: "button mat-normals" + (this.props.globalState.previewMode === PreviewMode.Normals ? " selected" : ""), children: _jsx("img", { src: doubleSided, alt: "" }) }), _jsx("div", { title: "Render with texture", onClick: () => this.changeTexture(), className: "button mat-texture" + (this.props.globalState.previewMode === PreviewMode.Textured ? " selected" : ""), children: _jsx("img", { src: texture, alt: "" }) }), _jsx("div", { title: "Render with mat cap", onClick: () => this.changeMatCap(), className: "button mat-cap" + (this.props.globalState.previewMode === PreviewMode.MatCap ? " selected" : ""), children: _jsx("img", { src: matCap, alt: "" }) }), _jsx("div", { title: "Render with vertex color", onClick: () => this.changeVertexColor(), className: "button vertex-color" + (this.props.globalState.previewMode === PreviewMode.VertexColor ? " selected" : ""), children: _jsx("img", { src: vertexColor, alt: "" }) }), _jsx("div", { title: "Render with wireframe", onClick: () => this.changeWireframe(), className: "button wireframe" + (this.props.globalState.previewMode === PreviewMode.Wireframe ? " selected" : ""), children: _jsx("img", { src: wireframe, alt: "" }) })] }) })] }));
    }
}
//# sourceMappingURL=previewAreaComponent.js.map