import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class AnimationGroupItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const animationGroup = this.props.animationGroup;
        return (_jsxs("div", { className: "animationGroupTools", children: [_jsx(TreeItemLabelComponent, { label: animationGroup.name, onClick: () => this.props.onClick(), icon: faLayerGroup, color: "cornflowerblue" }), _jsx(ExtensionsComponent, { target: animationGroup, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=animationGroupTreeItemComponent.js.map