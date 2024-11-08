import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import style from "./FlexibleDropZone.modules.scss";
import { FlexibleResizeBar } from "./FlexibleResizeBar";
import { ResizeDirections } from "./types";
/**
 * This component contains the drag and drop zone for the resize bars that
 * allow redefining width and height of layout elements
 * @param props properties
 * @returns drop zone element
 */
export const FlexibleDropZone = (props) => {
    return (_jsxs("div", { className: style.flexibleDropZoneContainer, children: [props.children, _jsx(FlexibleResizeBar, { rowNumber: props.rowNumber, columnNumber: props.columnNumber, direction: ResizeDirections.COLUMN }), _jsx(FlexibleResizeBar, { rowNumber: props.rowNumber, columnNumber: props.columnNumber, direction: ResizeDirections.ROW })] }));
};
//# sourceMappingURL=FlexibleDropZone.js.map