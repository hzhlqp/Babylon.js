import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube, faPen } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash, faSquare } from "@fortawesome/free-regular-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
import "core/Rendering/boundingBoxRenderer";
export class MeshTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        const mesh = this.props.mesh;
        this.state = { isBoundingBoxEnabled: mesh.showBoundingBox, isVisible: this.props.mesh.isVisible };
    }
    showBoundingBox() {
        const mesh = this.props.mesh;
        mesh.showBoundingBox = !this.state.isBoundingBoxEnabled;
        this.props.globalState.onPropertyChangedObservable.notifyObservers({
            object: mesh,
            property: "showBoundingBox",
            value: mesh.showBoundingBox,
            initialValue: !mesh.showBoundingBox,
        });
        this.setState({ isBoundingBoxEnabled: !this.state.isBoundingBoxEnabled });
    }
    switchVisibility() {
        const newState = !this.state.isVisible;
        this.setState({ isVisible: newState });
        this.props.mesh.isVisible = newState;
        this.props.globalState.onPropertyChangedObservable.notifyObservers({ object: this.props.mesh, property: "isVisible", value: newState, initialValue: !newState });
    }
    // mesh.name can fail the type check when we're in javascript, so
    // we can check to avoid crashing
    _getNameForLabel() {
        return typeof this.props.mesh.name === "string" ? this.props.mesh.name : "no name";
    }
    _editGeometry() {
        const mesh = this.props.mesh;
        mesh._internalMetadata.nodeGeometry.edit({
            nodeGeometryEditorConfig: {
                backgroundColor: mesh.getScene().clearColor,
                hostMesh: mesh,
                hostScene: mesh.getScene(),
            },
        });
    }
    render() {
        const mesh = this.props.mesh;
        const visibilityElement = this.state.isVisible ? _jsx(FontAwesomeIcon, { icon: faEye }) : _jsx(FontAwesomeIcon, { icon: faEyeSlash, className: "isNotActive" });
        return (_jsxs("div", { className: "meshTools", children: [_jsx(TreeItemLabelComponent, { label: this._getNameForLabel(), onClick: () => this.props.onClick(), icon: faCube, color: "dodgerblue" }), mesh._internalMetadata && mesh._internalMetadata.nodeGeometry && (_jsx("div", { className: "edit icon", onClick: () => this._editGeometry(), title: "Edit Node Geometry", children: _jsx(FontAwesomeIcon, { icon: faPen }) })), _jsx("div", { className: this.state.isBoundingBoxEnabled ? "bounding-box selected icon" : "bounding-box icon", onClick: () => this.showBoundingBox(), title: "Show/Hide bounding box", children: _jsx(FontAwesomeIcon, { icon: faSquare }) }), _jsx("div", { className: "visibility icon", onClick: () => this.switchVisibility(), title: "Show/Hide mesh", children: visibilityElement }), _jsx(ExtensionsComponent, { target: mesh, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=meshTreeItemComponent.js.map