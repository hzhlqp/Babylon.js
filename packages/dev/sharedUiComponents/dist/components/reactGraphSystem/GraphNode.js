import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDrag } from "react-dnd";
import { ClassNames } from "../classNames";
import { GraphConnectorHandler } from "./GraphConnectorHandle";
import style from "./GraphNode.modules.scss";
import { useGraphContext } from "./useGraphContext";
export const SingleGraphNode = (props) => {
    const { id, name, x, y, selected, width = 100, height = 40, highlighted, parentContainerId } = props;
    const { onNodeSelected } = useGraphContext();
    const [, dragRef] = useDrag(() => ({
        type: "node",
        item: { id, parentContainerId },
        collect: (monitor) => ({
            isDrag: !!monitor.isDragging(),
        }),
    }), []);
    const onClick = () => {
        onNodeSelected && onNodeSelected(id);
    };
    return (_jsx("div", { ref: dragRef, className: ClassNames({ node: true, selected, highlighted }, style), style: { left: x, top: y, minWidth: width + "px", minHeight: height + "px" }, onClick: onClick, children: _jsxs("div", { className: style.container, children: [_jsx("h2", { children: name }), _jsx(GraphConnectorHandler, { parentContainerId: parentContainerId, parentId: id, parentX: x, parentY: y, offsetY: -height / 2, parentWidth: width, parentHeight: height }), props.children] }) }));
};
//# sourceMappingURL=GraphNode.js.map