import { jsx as _jsx } from "react/jsx-runtime";
import style from "./FlexibleColumn.modules.scss";
/**
 * This component represents a single column in the layout. It receives a width
 * that it occupies and the content to display
 * @param props
 * @returns
 */
export const FlexibleColumn = (props) => {
    return (_jsx("div", { style: { width: props.width }, className: style.flexibleColumn, children: props.children }));
};
//# sourceMappingURL=FlexibleColumn.js.map