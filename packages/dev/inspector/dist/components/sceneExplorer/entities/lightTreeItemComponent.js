import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faEye } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbubRegular } from "@fortawesome/free-regular-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class LightTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        const light = this.props.light;
        this.state = { isEnabled: light.isEnabled(), isGizmoEnabled: light.reservedDataStore && light.reservedDataStore.lightGizmo };
    }
    switchIsEnabled() {
        const light = this.props.light;
        light.setEnabled(!light.isEnabled());
        this.props.globalState.onPropertyChangedObservable.notifyObservers({ object: light, property: "isEnabled", value: light.isEnabled(), initialValue: !light.isEnabled() });
        this.setState({ isEnabled: light.isEnabled() });
    }
    toggleGizmo() {
        const light = this.props.light;
        if (light.reservedDataStore && light.reservedDataStore.lightGizmo) {
            if (light.getScene().reservedDataStore && light.getScene().reservedDataStore.gizmoManager) {
                light.getScene().reservedDataStore.gizmoManager.attachToMesh(null);
            }
            this.props.globalState.enableLightGizmo(light, false);
            this.setState({ isGizmoEnabled: false });
        }
        else {
            this.props.globalState.enableLightGizmo(light, true, this.props.gizmoCamera);
            this.setState({ isGizmoEnabled: true });
        }
    }
    render() {
        const isEnabledElement = this.state.isEnabled ? _jsx(FontAwesomeIcon, { icon: faLightbubRegular }) : _jsx(FontAwesomeIcon, { icon: faLightbubRegular, className: "isNotActive" });
        const isGizmoEnabled = this.state.isGizmoEnabled || (this.props.light && this.props.light.reservedDataStore && this.props.light.reservedDataStore.lightGizmo) ? (_jsx(FontAwesomeIcon, { icon: faEye })) : (_jsx(FontAwesomeIcon, { icon: faEye, className: "isNotActive" }));
        return (_jsxs("div", { className: "lightTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.light.name, onClick: () => this.props.onClick(), icon: faLightbulb, color: "yellow" }), _jsx("div", { className: "visibility icon", onClick: () => this.switchIsEnabled(), title: "Turn on/off the light", children: isEnabledElement }), _jsx("div", { className: "enableGizmo icon", onClick: () => this.toggleGizmo(), title: "Turn on/off the light's gizmo", children: isGizmoEnabled }), _jsx(ExtensionsComponent, { target: this.props.light, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=lightTreeItemComponent.js.map