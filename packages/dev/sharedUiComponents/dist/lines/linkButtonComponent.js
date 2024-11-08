import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class LinkButtonComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onLink() {
        if (this.props.url) {
            window.open(this.props.url, "_blank");
        }
    }
    render() {
        return (_jsxs("div", { className: "linkButtonLine", children: [_jsx("div", { className: "link", title: this.props.label, onClick: () => this.onLink(), children: this.props.label }), _jsx("div", { className: "link-button", children: _jsx("button", { onClick: () => this.props.onClick(), children: this.props.buttonLabel }) }), this.props.icon && (_jsx("div", { className: "link-icon hoverIcon", onClick: () => {
                        if (this.props.onIconClick) {
                            this.props.onIconClick();
                        }
                    }, children: _jsx(FontAwesomeIcon, { icon: this.props.icon }) }))] }));
    }
}
//# sourceMappingURL=linkButtonComponent.js.map