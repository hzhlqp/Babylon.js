import { jsx as _jsx } from "react/jsx-runtime";
import { ClassNames } from "./classNames";
import styles from "./Icon.modules.scss";
export const Icon = ({ color = "dark", icon }) => {
    return _jsx("img", { src: icon, style: { width: "100%", height: "100%" }, className: ClassNames({ light: color === "light" }, styles) });
};
//# sourceMappingURL=Icon.js.map