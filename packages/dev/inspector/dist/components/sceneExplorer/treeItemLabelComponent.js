import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class TreeItemLabelComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick() {
        if (!this.props.onClick) {
            return;
        }
        this.props.onClick();
    }
    render() {
        return (_jsxs("div", { className: "title", title: this.props.label, onClick: () => this.onClick(), children: [_jsx("div", { className: "titleIcon", children: _jsx(FontAwesomeIcon, { icon: this.props.icon, color: this.props.color }) }), _jsx("div", { className: "titleText", children: this.props.label || "no name" })] }));
    }
}
//# sourceMappingURL=treeItemLabelComponent.js.map