import { jsx as _jsx } from "react/jsx-runtime";
import { useDrag } from "react-dnd";
/**
 * An icon that can be dragged by the user
 * @param props properties
 * @returns draggable icon element
 */
export const DraggableIcon = (props) => {
    const [, drag] = useDrag(() => ({
        type: props.type,
        item: props.item,
        collect(monitor) {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    }));
    return _jsx("img", { ref: drag, src: props.src });
};
//# sourceMappingURL=DraggableIcon.js.map