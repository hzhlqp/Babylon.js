import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faBrush, faPen } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class MaterialTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const nmeIcon = this.props.material.getClassName() === "NodeMaterial" ? (_jsx("div", { className: "icon", onClick: () => {
                this.props.material.edit({ nodeEditorConfig: { backgroundColor: this.props.material.getScene().clearColor } });
            }, title: "Node Material Editor", color: "white", children: _jsx(FontAwesomeIcon, { icon: faPen }) })) : null;
        return (_jsxs("div", { className: "materialTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.material.name, onClick: () => this.props.onClick(), icon: faBrush, color: "orange" }), _jsx(ExtensionsComponent, { target: this.props.material, extensibilityGroups: this.props.extensibilityGroups }), nmeIcon] }));
    }
}
//# sourceMappingURL=materialTreeItemComponent.js.map