import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class TransformNodeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const transformNode = this.props.transformNode;
        return (_jsxs("div", { className: "transformNodeTools", children: [_jsx(TreeItemLabelComponent, { label: transformNode.name, onClick: () => this.props.onClick(), icon: faCodeBranch, color: "cornflowerblue" }), _jsx(ExtensionsComponent, { target: transformNode, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=transformNodeTreeItemComponent.js.map