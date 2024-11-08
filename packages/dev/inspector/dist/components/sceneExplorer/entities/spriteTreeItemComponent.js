import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class SpriteTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "spriteTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.sprite.name || "No name", onClick: () => this.props.onClick(), icon: faGhost, color: "blanchedalmond" }), _jsx(ExtensionsComponent, { target: this.props.sprite, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=spriteTreeItemComponent.js.map