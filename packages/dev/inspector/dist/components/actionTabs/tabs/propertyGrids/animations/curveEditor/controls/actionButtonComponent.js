import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class ActionButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (_jsx("div", { title: this.props.tooltip, className: "action-button" + (this.props.isActive ? " active" : "") + (this.props.className ? " " + this.props.className : ""), id: this.props.id, onClick: () => this.props.onClick(), children: _jsx("img", { className: "action-button-image", src: this.props.icon }) }));
    }
}
//# sourceMappingURL=actionButtonComponent.js.map