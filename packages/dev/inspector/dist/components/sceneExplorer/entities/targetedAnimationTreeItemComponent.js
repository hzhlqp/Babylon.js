import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class TargetedAnimationItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const targetedAnimation = this.props.targetedAnimation;
        return (_jsxs("div", { className: "targetedAnimationTools", children: [_jsx(TreeItemLabelComponent, { label: targetedAnimation.animation.name, onClick: () => this.props.onClick(), icon: faFilm, color: "cornflowerblue" }), _jsx(ExtensionsComponent, { target: targetedAnimation, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=targetedAnimationTreeItemComponent.js.map