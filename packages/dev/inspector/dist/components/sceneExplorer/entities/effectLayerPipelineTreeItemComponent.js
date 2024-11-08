import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class EffectLayerItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "effectLayerTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.layer.name, onClick: () => this.props.onClick(), icon: faSun, color: "Plum" }), _jsx(ExtensionsComponent, { target: this.props.layer, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=effectLayerPipelineTreeItemComponent.js.map