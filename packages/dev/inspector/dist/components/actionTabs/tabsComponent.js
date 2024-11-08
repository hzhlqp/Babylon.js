import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export class TabsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onSelect(index) {
        this.props.onSelectedIndexChange(index);
    }
    renderLabel(child, index) {
        const activeClass = this.props.selectedIndex === index ? "label active" : "label";
        return (_jsx("div", { className: activeClass, onClick: () => this.onSelect(index), title: child.props.title, children: _jsx("div", { children: _jsx(FontAwesomeIcon, { icon: child.props.icon }) }) }, index));
    }
    render() {
        return (_jsxs("div", { className: "tabsMenu", onContextMenu: (e) => e.preventDefault(), children: [_jsx("div", { className: "labels", children: this.props.children.map((child, index) => {
                        return this.renderLabel(child, index);
                    }) }), _jsx("div", { className: "panes", children: this.props.children[this.props.selectedIndex] })] }));
    }
}
//# sourceMappingURL=tabsComponent.js.map