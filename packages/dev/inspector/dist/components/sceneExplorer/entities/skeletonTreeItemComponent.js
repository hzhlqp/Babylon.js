import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class SkeletonTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const skeleton = this.props.skeleton;
        return (_jsxs("div", { className: "skeletonTools", children: [_jsx(TreeItemLabelComponent, { label: skeleton.name || "no name", onClick: () => this.props.onClick(), icon: faSkull, color: "gray" }), _jsx(ExtensionsComponent, { target: skeleton, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=skeletonTreeItemComponent.js.map