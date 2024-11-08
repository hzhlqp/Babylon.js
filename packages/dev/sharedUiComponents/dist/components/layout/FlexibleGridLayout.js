import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { FlexibleDragHandler } from "./FlexibleDragHandler";
import { LayoutContext } from "./LayoutContext";
import { FlexibleGridContainer } from "./FlexibleGridContainer";
/**
 * This component represents a grid layout that can be resized and rearranged
 * by the user.
 * @param props properties
 * @returns layout element
 */
export const FlexibleGridLayout = (props) => {
    const [layout, setLayout] = useState(props.layoutDefinition);
    const containerDiv = useRef(null);
    const containerSize = useRef({ width: 0, height: 0 });
    useEffect(() => {
        if (containerDiv.current) {
            containerSize.current.width = containerDiv.current.clientWidth;
            containerSize.current.height = containerDiv.current.clientHeight;
        }
    }, [containerDiv]);
    return (_jsx(DndProvider, { backend: TouchBackend, options: { enableMouseEvents: true }, children: _jsx(LayoutContext.Provider, { value: { layout, setLayout }, children: _jsx(FlexibleDragHandler, { containerSize: containerSize.current, children: _jsx("div", { style: { width: "100%", height: "100%" }, ref: containerDiv, children: _jsx(FlexibleGridContainer, {}) }) }) }) }));
};
//# sourceMappingURL=FlexibleGridLayout.js.map