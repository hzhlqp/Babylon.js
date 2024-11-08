import { jsx as _jsx } from "react/jsx-runtime";
import { Vector2 } from "core/Maths/math";
import { useEffect, useRef } from "react";
import { useDragLayer } from "react-dnd";
/**
 * This component contains all the nodes and handles their dragging
 * @param props properties
 * @returns graph node container element
 */
export const GraphNodesContainer = (props) => {
    const lastDragPos = useRef(null);
    const { currentOffset, item, isDragging } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset(),
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
    }));
    useEffect(() => {
        if (currentOffset && item) {
            if (lastDragPos.current) {
                const delta = new Vector2(currentOffset.x, currentOffset.y).subtract(lastDragPos.current);
                props.onNodeMoved?.(item.id, delta.x, delta.y);
            }
            lastDragPos.current = new Vector2(currentOffset.x, currentOffset.y);
        }
    }, [currentOffset, item]);
    useEffect(() => {
        if (!isDragging) {
            lastDragPos.current = null;
        }
    }, [isDragging]);
    return _jsx("div", { children: props.children });
};
//# sourceMappingURL=GraphNodesContainer.js.map