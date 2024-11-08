import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ClassNames } from "../classNames";
import style from "./GraphConnectorHandle.modules.scss";
import { useGraphContext } from "./useGraphContext";
/**
 * This component is used to initiate a connection between two nodes. Simply
 * drag the handle in a node and drop it in another node to create a connection.
 * @returns connector element
 */
export const GraphConnectorHandler = ({ parentId, parentX, parentY, offsetX = 0, offsetY = 0, parentWidth, parentHeight, parentContainerId }) => {
    const { onNodesConnected } = useGraphContext();
    const centerX = offsetX + parentWidth / 2;
    const centerY = offsetY + parentHeight / 2;
    const [, dragRef] = useDrag(() => ({
        type: "connector",
        item: { parentId, x: parentX + centerX, y: parentY + centerY, parentContainerId },
        canDrag: () => parentX !== undefined && parentY !== undefined,
    }), [parentId, parentX, parentY]);
    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "connector",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        canDrop: (item) => {
            return item.parentContainerId === parentContainerId;
        },
        drop: (item) => {
            onNodesConnected && onNodesConnected(item.parentId, parentId);
        },
    }));
    const attachRef = useCallback((ref) => {
        dragRef(ref);
        dropRef(ref);
    }, [dragRef, dropRef]);
    return _jsx("div", { ref: attachRef, className: ClassNames({ handle: true, hovered: isOver }, style), style: { top: centerY + "px", left: centerX + "px" } });
};
//# sourceMappingURL=GraphConnectorHandle.js.map