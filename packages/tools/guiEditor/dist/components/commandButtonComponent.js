import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class CommandButtonComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let divClassName = this.props.altStyle ? `command-button-alt${this.props.disabled ? "-disabled" : ""}${this.props.isActive ? "-" : ""}` : `command-button`;
        let iconClassName = `command-button-icon `;
        if (this.props.isActive) {
            divClassName += " active";
            iconClassName += " active";
        }
        if (this.props.disabled) {
            divClassName += " disabled";
        }
        else if (this.props.copyDeleteDisabled) {
            divClassName += " copyAndDeleteDisabled";
        }
        else if (this.props.pasteDisabled) {
            divClassName += " pasteDisabled";
        }
        return (_jsxs("div", { className: divClassName, onClick: this.props.onClick, title: `${this.props.tooltip} ${this.props.shortcut ? " (" + this.props.shortcut + ")" : ""}`, children: [_jsx("div", { className: iconClassName, children: _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: this.props.isActive ? "active" : "", draggable: false }) }), _jsx("div", { className: "command-label", children: this.props.tooltip })] }));
    }
}
//# sourceMappingURL=commandButtonComponent.js.map