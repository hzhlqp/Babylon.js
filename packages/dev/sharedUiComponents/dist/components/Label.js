import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClassNames } from "./classNames";
import styles from "./Label.modules.scss";
export const Label = ({ text, children, color }) => {
    return (_jsxs("label", { className: ClassNames({ label: true, light: color === "light", dark: color === "dark" }, styles), children: [_jsx("span", { children: text }), children] }));
};
//# sourceMappingURL=Label.js.map