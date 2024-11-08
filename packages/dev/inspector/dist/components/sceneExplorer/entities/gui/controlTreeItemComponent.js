import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faObjectGroup, faHighlighter, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../../treeItemLabelComponent";
import { ExtensionsComponent } from "../../extensionsComponent";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class ControlTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        const control = this.props.control;
        this.state = { isActive: control.isHighlighted, isVisible: control.isVisible };
    }
    highlight() {
        const control = this.props.control;
        control.isHighlighted = !control.isHighlighted;
        this.setState({ isActive: control.isHighlighted });
    }
    switchVisibility() {
        const newState = !this.state.isVisible;
        this.setState({ isVisible: newState });
        this.props.control.isVisible = newState;
    }
    render() {
        const control = this.props.control;
        const name = (control.name || "No name") + ` [${control.getClassName()}]`;
        const isActiveElement = this.state.isActive ? _jsx(FontAwesomeIcon, { icon: faHighlighter }) : _jsx(FontAwesomeIcon, { icon: faHighlighter, className: "isNotActive" });
        const visibilityElement = this.state.isVisible ? _jsx(FontAwesomeIcon, { icon: faEye }) : _jsx(FontAwesomeIcon, { icon: faEyeSlash, className: "isNotActive" });
        return (_jsxs("div", { className: "controlTools", children: [_jsx(TreeItemLabelComponent, { label: name, onClick: () => this.props.onClick(), icon: faObjectGroup, color: "greenyellow" }), _jsx("div", { className: "highlight icon", onClick: () => this.highlight(), title: "Highlight this control", children: isActiveElement }), _jsx("div", { className: "visibility icon", onClick: () => this.switchVisibility(), title: "Show/Hide control", children: visibilityElement }), _jsx(ExtensionsComponent, { target: control, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=controlTreeItemComponent.js.map