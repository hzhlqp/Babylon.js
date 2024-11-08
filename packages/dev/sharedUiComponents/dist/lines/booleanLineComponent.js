import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
export class BooleanLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const check = this.props.value ? _jsx(FontAwesomeIcon, { icon: faCheck }) : _jsx(FontAwesomeIcon, { icon: faTimesCircle });
        const className = this.props.value ? "value check" : "value uncheck";
        return (_jsxs("div", { className: "textLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsx("div", { className: className, children: check })] }));
    }
}
//# sourceMappingURL=booleanLineComponent.js.map