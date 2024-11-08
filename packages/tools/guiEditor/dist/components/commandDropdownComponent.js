import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
export class CommandDropdownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false, activeState: "" };
    }
    render() {
        return (_jsxs(_Fragment, { children: [this.state.isExpanded && (_jsx("div", { className: "command-dropdown-blocker", onClick: () => {
                        this.setState({ isExpanded: false });
                    } })), _jsxs("div", { className: "command-dropdown-root", children: [_jsxs("div", { className: "command-dropdown" + (this.state.isExpanded ? " activated" : ""), title: this.props.tooltip, onClick: () => {
                                this.setState({ isExpanded: false });
                                const newState = !this.state.isExpanded;
                                const pgHost = document.getElementById("embed-host");
                                if (pgHost) {
                                    pgHost.style.zIndex = newState ? "0" : "10";
                                }
                                this.setState({ isExpanded: newState });
                            }, children: [this.props.icon && (_jsx("div", { className: "command-dropdown-icon", children: _jsx("img", { src: this.props.icon }) })), !this.props.icon && _jsx("div", { className: "command-dropdown-active" })] }), this.state.isExpanded && (_jsx("div", { className: "command-dropdown-content sub1" + (this.props.toRight ? " toRight" : ""), children: this.props.items.map((m) => {
                                if (!m.fileButton) {
                                    return (_jsxs("div", { className: "command-dropdown-label" + (m.isActive ? " active" : ""), onClick: () => {
                                            if (!m.onClick) {
                                                this.forceUpdate();
                                                return;
                                            }
                                            if (!m.subItems) {
                                                m.onClick();
                                                this.setState({ isExpanded: false, activeState: m.label });
                                            }
                                        }, title: m.label, children: [!m.icon && _jsx("div", { className: "command-dropdown-label-text", children: (m.isActive ? "> " : "") + m.label }), m.icon && (_jsx("div", { className: "command-dropdown-icon", children: _jsx("img", { src: m.icon }) })), m.onCheck && (_jsx("input", { type: "checkBox", className: "command-dropdown-label-check", onChange: (evt) => {
                                                    this.forceUpdate();
                                                    m.onCheck(evt.target.checked);
                                                }, checked: false })), m.subItems && _jsx("div", { className: "command-dropdown-arrow", children: ">" }), m.subItems && (_jsx("div", { className: "sub-items ", children: m.subItems.map((s) => {
                                                    return (_jsx("div", { className: "sub-item", onClick: () => {
                                                            m.onClick();
                                                            this.setState({ isExpanded: false });
                                                        }, children: _jsx("div", { className: "sub-item-label", children: s }) }, s));
                                                }) }))] }, m.label));
                                }
                                else {
                                    return (_jsx(FileButtonLine, { label: !m.loadControlButton ? "Load" : "Load control", onClick: (file) => this.props.globalState[!m.loadControlButton ? "onLoadObservable" : "onControlLoadObservable"].notifyObservers(file), accept: ".json" }, m.label));
                                }
                            }) }))] })] }));
    }
}
//# sourceMappingURL=commandDropdownComponent.js.map