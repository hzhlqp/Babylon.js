import { jsx as _jsx } from "react/jsx-runtime";
import { useGraphContext } from "./useGraphContext";
export const MarkerArrowId = "arrow";
/**
 * This component draws a SVG line between two points, with an optional marker
 * indicating direction
 * @param props properties
 * @returns graph line element
 */
export const GraphLine = (props) => {
    const { id, x1, x2, y1, y2, selected, directional = true } = props;
    const { onLineSelected } = useGraphContext();
    // Line is only selectable when it has an id
    const onClick = () => {
        id && onLineSelected && onLineSelected(id);
    };
    const xm = (x1 + x2) / 2;
    const ym = (y1 + y2) / 2;
    return (_jsx("path", { d: `M ${x1} ${y1} L ${xm} ${ym} L ${x2} ${y2}`, strokeWidth: 3, stroke: selected ? "yellow" : "black", onClick: onClick, markerMid: directional ? `url(#${MarkerArrowId})` : "" }));
};
//# sourceMappingURL=GraphLine.js.map