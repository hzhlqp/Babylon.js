import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class BoneTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const bone = this.props.bone;
        return (_jsxs("div", { className: "skeletonTools", children: [_jsx(TreeItemLabelComponent, { label: bone.name || "no name", onClick: () => this.props.onClick(), icon: faBone, color: "lightgray" }), _jsx(ExtensionsComponent, { target: bone, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=boneTreeItemComponent.js.map