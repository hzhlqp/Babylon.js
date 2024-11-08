import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class ValueLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const digits = this.props.fractionDigits !== undefined ? this.props.fractionDigits : 2;
        const value = this.props.value.toFixed(digits) + (this.props.units ? " " + this.props.units : "");
        return (_jsxs("div", { className: "textLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsx("div", { className: "value", style: { color: this.props.color ? this.props.color : "" }, children: value })] }));
    }
}
//# sourceMappingURL=valueLineComponent.js.map