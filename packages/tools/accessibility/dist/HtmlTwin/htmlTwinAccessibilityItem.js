import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export function HTMLTwinAccessibilityItem(props) {
    const { description, a11yItem, children } = props;
    if (description && a11yItem) {
        if (a11yItem.isActionable) {
            return (_jsxs("button", { tabIndex: a11yItem.isFocusable ? 0 : -1, onClick: () => a11yItem.triggerEvent("click"), onContextMenu: () => a11yItem.triggerEvent("contextmenu"), onFocus: () => a11yItem.focus(), onBlur: () => a11yItem.blur(), ...a11yItem.entity.accessibilityTag?.aria, children: [description, children] }));
        }
        else {
            return (_jsxs("div", { tabIndex: a11yItem.isFocusable ? 0 : -1, onClick: () => a11yItem.triggerEvent("click"), onContextMenu: () => a11yItem.triggerEvent("contextmenu"), onFocus: () => a11yItem.focus(), onBlur: () => a11yItem.blur(), ...a11yItem.entity.accessibilityTag?.aria, children: [description, children] }));
        }
    }
    else {
        return _jsx(_Fragment, { children: children });
    }
}
//# sourceMappingURL=htmlTwinAccessibilityItem.js.map