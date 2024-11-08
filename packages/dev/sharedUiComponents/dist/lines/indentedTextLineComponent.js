import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class IndentedTextLineComponent extends React.Component {
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
        if (this.props.onLink || this.props.url) {
            return (_jsx("div", { className: "link-value", title: this.props.value, onClick: () => this.onLink(), children: this.props.url ? "doc" : this.props.value || "no name" }));
        }
        return (_jsx("div", { className: "value", title: this.props.value, style: { color: this.props.color ? this.props.color : "" }, children: this.props.value || "no name" }));
    }
    render() {
        return (_jsx("div", { className: "indented " + (this.props.underline ? "textLine underline" : "textLine" + (this.props.additionalClass ? " " + this.props.additionalClass : "")), children: this.renderContent() }));
    }
}
//# sourceMappingURL=indentedTextLineComponent.js.map