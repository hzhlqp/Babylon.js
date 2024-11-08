import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class ControlButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (_jsxs("div", { title: this.props.tooltip, className: "control-button" + (this.props.className ? " " + this.props.className : ""), id: this.props.id, onClick: () => this.props.onClick(), children: [_jsx("img", { className: "control-button-image", src: this.props.icon }), _jsx("img", { className: "control-button-hover-image", src: this.props.hoverIcon })] }));
    }
}
//# sourceMappingURL=controlButtonComponent.js.map