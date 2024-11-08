import { jsx as _jsx } from "react/jsx-runtime";
import { useDrag } from "react-dnd";
import { ResizeDirections, ElementTypes } from "./types";
import { ClassNames } from "../classNames";
import style from "./FlexibleResizeBar.modules.scss";
/**
 * A component that renders a bar that the user can drag to resize.
 * @param props properties
 * @returns resize bar element
 */
export const FlexibleResizeBar = (props) => {
    const [_, drag] = useDrag(() => ({
        type: ElementTypes.RESIZE_BAR,
        item: { direction: props.direction, rowNumber: props.rowNumber, columnNumber: props.columnNumber },
        collect(monitor) {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    }));
    return (_jsx("div", { className: ClassNames({ rowDragHandler: props.direction === ResizeDirections.ROW, columnDragHandler: props.direction === ResizeDirections.COLUMN }, style), ref: drag }));
};
//# sourceMappingURL=FlexibleResizeBar.js.map