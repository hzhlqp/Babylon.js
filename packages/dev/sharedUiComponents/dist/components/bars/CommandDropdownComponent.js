import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { FileButtonLineComponent } from "../lines/FileButtonLineComponent";
import { JoinClassNames } from "../classNames";
import style from "./CommandDropdown.modules.scss";
export class CommandDropdownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false, activeState: "" };
    }
    render() {
        return (_jsxs(_Fragment, { children: [this.state.isExpanded && (_jsx("div", { className: style.commandDropdownBlocker, onClick: () => {
                        this.setState({ isExpanded: false });
                    } })), _jsxs("div", { className: style.commandDropdownRoot, children: [_jsxs("div", { className: JoinClassNames(style, "commandDropdown", this.state.isExpanded ? "activated" : ""), title: this.props.tooltip, onClick: () => {
                                this.setState({ isExpanded: false });
                                const newState = !this.state.isExpanded;
                                const pgHost = document.getElementById("embed-host");
                                if (pgHost) {
                                    pgHost.style.zIndex = newState ? "0" : "10";
                                }
                                this.setState({ isExpanded: newState });
                            }, children: [this.props.icon && (_jsx("div", { className: style.commandDropdownIcon, children: _jsx("img", { src: this.props.icon }) })), !this.props.icon && _jsx("div", { className: style.commandDropdownActive })] }), this.state.isExpanded && (_jsx("div", { className: JoinClassNames(style, "commandDropdownContent", this.props.toRight ? "toRight" : ""), children: this.props.items.map((m) => {
                                if (!m.fileButton) {
                                    return (_jsxs("div", { className: JoinClassNames(style, "commandDropdownLabel", m.isActive ? "active" : ""), onClick: () => {
                                            if (!m.onClick) {
                                                this.forceUpdate();
                                                return;
                                            }
                                            if (!m.subItems) {
                                                m.onClick();
                                                this.setState({ isExpanded: false, activeState: m.label });
                                            }
                                        }, title: m.label, children: [!m.icon && _jsx("div", { className: style.commandDropdownLabelText, children: (m.isActive ? "> " : "") + m.label }), m.icon && (_jsx("div", { className: style.commandDropdownIcon, children: _jsx("img", { src: m.icon }) })), m.onCheck && (_jsx("input", { type: "checkBox", className: style.commandDropdownLabelCheck, onChange: (evt) => {
                                                    this.forceUpdate();
                                                    m.onCheck(evt.target.checked);
                                                }, checked: false })), m.subItems && _jsx("div", { className: style.commandDropdownArrow, children: ">" }), m.subItems && (_jsx("div", { className: style.subItems, children: m.subItems.map((s) => {
                                                    return (_jsx("div", { className: style.subItem, onClick: () => {
                                                            m.onClick();
                                                            this.setState({ isExpanded: false });
                                                        }, children: _jsx("div", { children: s }) }, s));
                                                }) }))] }, m.label));
                                }
                                else {
                                    // eslint-disable-next-line no-console
                                    return _jsx(FileButtonLineComponent, { label: "Load", onClick: (file) => console.log("file btn clicked"), accept: ".json" }, m.label);
                                }
                            }) }))] })] }));
    }
}
//# sourceMappingURL=CommandDropdownComponent.js.map