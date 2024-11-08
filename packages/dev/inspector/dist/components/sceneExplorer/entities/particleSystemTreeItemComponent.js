import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faBraille } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class ParticleSystemTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "particleSystemTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.system.name || "Particle system", onClick: () => this.props.onClick(), icon: faBraille, color: "crimson" }), _jsx(ExtensionsComponent, { target: this.props.system, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=particleSystemTreeItemComponent.js.map