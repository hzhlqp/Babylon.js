import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class TextureTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "textureTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.texture.name, onClick: () => this.props.onClick(), icon: faImage, color: "mediumpurple" }), _jsx(ExtensionsComponent, { target: this.props.texture, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=textureTreeItemComponent.js.map