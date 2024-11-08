import { jsx as _jsx } from "react/jsx-runtime";
import { ClassNames } from "../classNames";
import style from "./CommandButton.modules.scss";
export const CommandButtonComponent = (props) => {
    return (_jsx("div", { className: ClassNames({ commandButton: true, active: props.isActive, disabled: props.disabled }, style), onClick: props.onClick, title: `${props.tooltip} ${props.shortcut ? " (" + props.shortcut + ")" : ""}`, children: _jsx("div", { className: ClassNames({ commandButtonIcon: true }, style), children: _jsx("img", { src: props.icon, title: props.iconLabel, alt: props.iconLabel, draggable: false }) }) }));
};
//# sourceMappingURL=CommandButtonComponent.js.map