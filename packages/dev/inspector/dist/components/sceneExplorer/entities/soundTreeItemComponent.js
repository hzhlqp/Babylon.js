import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../treeItemLabelComponent";
import { ExtensionsComponent } from "../extensionsComponent";
import * as React from "react";
export class SoundTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const sound = this.props.sound;
        return (_jsxs("div", { className: "soundTools", children: [_jsx(TreeItemLabelComponent, { label: sound.name, onClick: () => this.props.onClick(), icon: faMusic, color: "teal" }), _jsx(ExtensionsComponent, { target: sound, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=soundTreeItemComponent.js.map