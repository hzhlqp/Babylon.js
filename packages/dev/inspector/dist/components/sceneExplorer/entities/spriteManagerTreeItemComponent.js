import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class SpriteManagerTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "spriteManagerTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.spriteManager.name || "No name", onClick: () => this.props.onClick(), icon: faAddressBook, color: "blanchedalmond" }), _jsx(ExtensionsComponent, { target: this.props.spriteManager, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=spriteManagerTreeItemComponent.js.map