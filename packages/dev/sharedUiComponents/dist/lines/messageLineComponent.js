import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class MessageLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.icon) {
            return (_jsxs("div", { className: "iconMessageLine", children: [_jsx("div", { className: "icon", style: { color: this.props.color ? this.props.color : "" }, children: _jsx(FontAwesomeIcon, { icon: this.props.icon }) }), _jsx("div", { className: "value", title: this.props.text, children: this.props.text })] }));
        }
        return (_jsx("div", { className: "messageLine", children: _jsx("div", { className: "value", title: this.props.text, style: { color: this.props.color ? this.props.color : "" }, children: this.props.text }) }));
    }
}
//# sourceMappingURL=messageLineComponent.js.map