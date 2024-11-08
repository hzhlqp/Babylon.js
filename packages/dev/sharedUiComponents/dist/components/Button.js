import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Button.modules.scss";
import { ClassNames } from "./classNames";
export const Button = ({ disabled, active, onClick, children, color, size, title, backgroundColor }) => {
    return (_jsx("button", { className: ClassNames({ button: true, active, wide: size === "wide", small: size === "small", smaller: size === "smaller", light: color === "light", dark: color === "dark" }, styles), disabled: disabled, onClick: onClick, title: title, style: { backgroundColor }, children: children }));
};
//# sourceMappingURL=Button.js.map