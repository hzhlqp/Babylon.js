import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { GraphContainer } from "./GraphContainer";
import { GraphLine } from "./GraphLine";
import { SingleGraphNode } from "./GraphNode";
import { GraphNodesContainer } from "./GraphNodesContainer";
import { GraphLinesContainer } from "./GraphLinesContainer";
import { GraphContextManager } from "./GraphContextManager";
const fullscreenStyle = { width: "100%", height: "100%" };
/**
 * This component is a bridge between the app logic related to the graph, and the actual rendering
 * of it. It manages the nodes' positions and selection states.
 * @param props
 * @returns
 */
export const NodeRenderer = (props) => {
    const { nodes, connections, updateConnections, highlightedNode } = props;
    // Store the nodes positions
    const [pos, setPos] = useState({});
    const [selectedLine, setSelectedLine] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const updatePos = (id, x, y) => {
        setPos((currentPos) => {
            const currPos = currentPos[id] || { x: 0, y: 0 };
            currentPos[id] = { x: currPos.x + x, y: currPos.y + y };
            return { ...currentPos };
        });
    };
    const onNodesConnected = (sourceId, targetId) => {
        updateConnections(sourceId, targetId);
    };
    const onLineSelected = (lineId) => {
        setSelectedLine(lineId);
        setSelectedNode(null);
    };
    const onNodeSelected = (nodeId) => {
        setSelectedNode(nodeId);
        setSelectedLine(null);
    };
    useEffect(() => {
        props.selectNode && props.selectNode(selectedNode);
    }, [selectedNode]);
    const onKeyDown = (evt) => {
        if (evt.key === "Delete") {
            if (selectedLine) {
                props.deleteLine(selectedLine);
            }
            else if (selectedNode) {
                props.deleteNode(selectedNode);
            }
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [selectedLine, selectedNode]);
    const graphContext = useMemo(() => ({ updatePos, onNodesConnected, onLineSelected, onNodeSelected }), []);
    return (_jsx("div", { style: fullscreenStyle, children: _jsx(GraphContextManager.Provider, { value: graphContext, children: _jsxs(GraphContainer, { children: [_jsx(GraphNodesContainer, { id: props.id, onNodeMoved: updatePos, children: nodes.map(({ id, label, customData }) => {
                            const posInRecord = pos[id] || { x: 0, y: 0 };
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            const CustomComponent = customData && customData.type && props.customComponents && props.customComponents[customData.type];
                            return (_jsx(SingleGraphNode, { parentContainerId: props.id, id: id, name: label, x: posInRecord.x, y: posInRecord.y, selected: id === selectedNode, highlighted: id === highlightedNode, children: CustomComponent && _jsx(CustomComponent, { ...customData.value }) }, id));
                        }) }), _jsx(GraphLinesContainer, { id: props.id, children: connections.map(({ id, sourceId, targetId }) => {
                            const sourcePos = pos[sourceId] || { x: 0, y: 0 };
                            const targetPos = pos[targetId] || { x: 0, y: 0 };
                            return _jsx(GraphLine, { id: id, x1: sourcePos.x, y1: sourcePos.y, x2: targetPos.x, y2: targetPos.y, selected: id === selectedLine }, id);
                        }) })] }) }) }));
};
//# sourceMappingURL=NodeRenderer.js.map