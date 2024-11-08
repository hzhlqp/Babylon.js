import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Toggle.modules.scss";
import { ClassNames } from "./classNames";
import toggleOnIcon30px from "../imgs/toggleOnIcon_30px.svg";
import toggleMixedIcon30px from "../imgs/toggleMixedIcon_30px.svg";
import toggleOffIcon30px from "../imgs/toggleOffIcon_30px.svg";
import { Icon } from "./Icon";
const Icons = {
    on: toggleOnIcon30px,
    mixed: toggleMixedIcon30px,
    off: toggleOffIcon30px,
};
export const Toggle = ({ color = "dark", toggled = "off", padded = false, onToggle = () => { } }) => {
    return (_jsxs("label", { className: ClassNames({ toggle: true, padded }, styles), children: [_jsx("input", { type: "checkbox", style: { display: "none" }, checked: toggled === "on", onChange: () => onToggle() }), _jsx(Icon, { icon: Icons[toggled], color: color })] }));
};
//# sourceMappingURL=Toggle.js.map