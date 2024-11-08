import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrop } from "react-dnd";
import { GraphLine, MarkerArrowId } from "./GraphLine";
/**
 * this component handles the dragging of new connections
 * @param props
 * @returns
 */
export const GraphLinesContainer = (props) => {
    const [{ start, delta }, dropRef] = useDrop(() => ({
        accept: "connector",
        canDrop: (item) => {
            return item.parentContainerId === props.id;
        },
        collect: (monitor) => ({
            start: monitor.getItem(),
            delta: monitor.getDifferenceFromInitialOffset(),
        }),
    }));
    return (_jsxs("svg", { width: "100%", height: "100%", ref: dropRef, children: [_jsx("defs", { children: _jsx("marker", { id: MarkerArrowId, markerWidth: "15", markerHeight: "15", refX: "5", refY: "5", orient: "auto", children: _jsx("path", { d: "M 0 0 L 10 5 L 0 10 z", stroke: "black" }) }) }), props.children, start && start.parentContainerId === props.id && start.x !== undefined && start.y !== undefined && delta && (_jsx(GraphLine, { x1: start.x, y1: start.y, x2: start.x + delta.x, y2: start.y + delta.y, selected: false }))] }));
};
//# sourceMappingURL=GraphLinesContainer.js.map