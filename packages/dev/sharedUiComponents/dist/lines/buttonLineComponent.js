import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class ButtonLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "buttonLine" + (this.props.isDisabled ? " disabled" : ""), children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("button", { onClick: () => this.props.onClick(), children: this.props.label })] }));
    }
}
//# sourceMappingURL=buttonLineComponent.js.map