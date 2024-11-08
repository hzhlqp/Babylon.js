import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class TextLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onLink() {
        if (this.props.url) {
            window.open(this.props.url, "_blank");
            return;
        }
        if (!this.props.onLink) {
            return;
        }
        this.props.onLink();
    }
    renderContent() {
        if (this.props.ignoreValue) {
            return null;
        }
        if (this.props.onLink || this.props.url) {
            return (_jsx("div", { className: "link-value", title: this.props.tooltip ?? this.props.label ?? "", onClick: () => this.onLink(), children: this.props.url ? "doc" : this.props.value || "no name" }));
        }
        return (_jsx("div", { className: "value", title: this.props.tooltip ?? this.props.label ?? "", style: { color: this.props.color ? this.props.color : "" }, children: this.props.value || "no name" }));
    }
    render() {
        return (_jsxs("div", { className: this.props.underline ? "textLine underline" : "textLine" + (this.props.additionalClass ? " " + this.props.additionalClass : ""), children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.tooltip ?? this.props.label ?? "", children: this.props.label ?? "" }), this.renderContent()] }));
    }
}
//# sourceMappingURL=textLineComponent.js.map