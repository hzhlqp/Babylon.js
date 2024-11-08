import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrag, useDrop } from "react-dnd";
import { ClassNames } from "../classNames";
import { ElementTypes } from "./types";
import style from "./FlexibleTab.modules.scss";
/**
 * A component that renders a tab that the user can click
 * to activate or drag to reorder. It also listens for
 * drop events if the user wants to drop another tab
 * after it.
 * @param props properties
 * @returns FlexibleTab element
 */
export const FlexibleTab = (props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ElementTypes.TAB,
        item: props.item,
        collect(monitor) {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    }), [props.item]);
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ElementTypes.TAB,
        drop: (item, monitor) => {
            props.onTabDroppedAction(item);
        },
        collect(monitor) {
            return {
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            };
        },
    }), [props.onTabDroppedAction]);
    return (_jsxs("div", { className: ClassNames({ tab: true, tabSelected: props.selected, tabGrabbed: isDragging, tabNormal: !props.selected && !isDragging }, style), children: [_jsx("div", { ref: drag, className: style.tabText, onClick: props.onClick, children: props.title }), _jsx("div", { className: ClassNames({ dropZone: true, dropZoneCanDrop: canDrop }, style), ref: drop }), _jsx("div", { className: ClassNames({ dropBarIndicator: true, dropBarIndicatorOver: isOver }, style) })] }));
};
//# sourceMappingURL=FlexibleTab.js.map