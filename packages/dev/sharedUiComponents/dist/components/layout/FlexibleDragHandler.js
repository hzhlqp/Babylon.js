import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useRef } from "react";
import { Vector2 } from "core/Maths/math";
import { useDrop } from "react-dnd";
import { ElementTypes } from "./types";
import { addPercentageStringToNumber, getPosInLayout } from "./utils";
import { LayoutContext } from "./LayoutContext";
/**
 * This component receives the drop events and updates the layout accordingly
 * @param props properties
 * @returns DragHandler element
 */
export const FlexibleDragHandler = (props) => {
    const { layout, setLayout } = useContext(LayoutContext);
    // CLICK/DRAG INFORMATION
    const pointerPos = useRef(null);
    const [_, drop] = useDrop(() => ({
        accept: [ElementTypes.RESIZE_BAR],
        hover(item, monitor) {
            const anyitem = item;
            const xy = monitor.getClientOffset();
            const pos = new Vector2(xy.x, xy.y);
            if (pointerPos.current) {
                if (monitor.getItemType() === ElementTypes.RESIZE_BAR) {
                    onResize(anyitem.rowNumber, anyitem.columnNumber, pos, pointerPos.current, anyitem.direction);
                }
            }
            pointerPos.current = pos;
        },
        drop(item, monitor) {
            pointerPos.current = null;
        },
    }));
    const getLayoutProperty = (layout, property) => {
        if (property === "width") {
            return layout[property];
        }
        else {
            return layout[property];
        }
    };
    const setLayoutProperty = (layout, property, value) => {
        if (property === "width") {
            layout[property] = value;
        }
        else {
            layout[property] = value;
        }
    };
    const processResize = (pos, prevPos, row0, column0, row1, column1, axis, maxAxisValue, property, minFinalValue) => {
        // Check axis difference
        const axisDiff = pos[axis] - prevPos[axis];
        try {
            // Get layout rows
            const layoutElement0 = getPosInLayout(layout, column0, row0);
            const layoutElement1 = getPosInLayout(layout, column1, row1);
            if (layoutElement0 && layoutElement1) {
                const percDiff = (axisDiff / maxAxisValue) * 100;
                const newValue0 = addPercentageStringToNumber(getLayoutProperty(layoutElement0, property), percDiff);
                const newValue1 = addPercentageStringToNumber(getLayoutProperty(layoutElement1, property), -percDiff);
                if (newValue0 >= minFinalValue && newValue1 >= minFinalValue) {
                    setLayoutProperty(layoutElement0, property, newValue0.toFixed(2) + "%");
                    setLayoutProperty(layoutElement1, property, newValue1.toFixed(2) + "%");
                }
                setLayout({ ...layout });
            }
        }
        catch (e) {
            // If an error occurred, we're trying to resize something invalid, so don't do anything
            return;
        }
    };
    const processResizeRow = (pos, prevPos, args) => {
        processResize(pos, prevPos, args.row, args.column, args.row + 1, args.column, "y", props.containerSize.height, "height", 5);
    };
    const processResizeColumn = (pos, prevPos, args) => {
        processResize(pos, prevPos, undefined, args.column, undefined, args.column + 1, "x", props.containerSize.width, "width", 5);
    };
    const onResize = (row, column, pos, prevPos, type) => {
        if (type === "row") {
            processResizeRow(pos, prevPos, { row, column });
        }
        else {
            processResizeColumn(pos, prevPos, { row, column });
        }
        pointerPos.current = pos;
    };
    return (_jsx("div", { ref: drop, style: { width: "100%", height: "100%" }, children: props.children }));
};
//# sourceMappingURL=FlexibleDragHandler.js.map