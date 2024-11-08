import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class TreeItemLabelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }
    onClick() {
        if (!this.props.onClick || this.props.renaming) {
            return;
        }
        this.props.onClick();
    }
    onBlur() {
        this.props.setRenaming(false);
    }
    render() {
        // if editing, overwrite string with local value
        const label = this.props.renaming ? this.state.value : this.props.label || "No Name";
        return (_jsx("div", { className: "title", onClick: () => this.onClick(), children: this.props.renaming ? (_jsx("input", { type: "text", onBlur: () => this.onBlur(), autoFocus: true, value: label, onChange: (ev) => {
                    this.props.onChange(ev.target.value);
                    this.setState({ value: ev.target.value });
                }, onKeyDown: (ev) => {
                    if (ev.key === "Enter")
                        this.onBlur();
                }, className: "titleText" })) : (_jsx("div", { className: "titleText", onDoubleClick: () => {
                    this.props.setRenaming(true);
                    this.setState({ value: label });
                }, children: label })) }));
    }
}
//# sourceMappingURL=treeItemLabelComponent.js.map