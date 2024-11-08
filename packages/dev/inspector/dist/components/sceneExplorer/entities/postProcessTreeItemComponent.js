import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class PostProcessItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "postProcessTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.postProcess.name, onClick: () => this.props.onClick(), icon: faMagic, color: "red" }), _jsx(ExtensionsComponent, { target: this.props.postProcess, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=postProcessTreeItemComponent.js.map