import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Observable } from "core/Misc/observable";
import { PerformanceViewerSidebarComponent } from "./performanceViewerSidebarComponent";
import { PerformancePlayheadButtonComponent } from "./performancePlayheadButtonComponent";
import { CanvasGraphComponent } from "../../../graph/canvasGraphComponent";
export const PerformanceViewerPopupComponent = (props) => {
    const { scene, layoutObservable, returnToLiveObservable, performanceCollector, initialGraphSize } = props;
    const [onVisibleRangeChangedObservable] = useState(new Observable());
    return (_jsxs("div", { id: "performance-viewer", children: [_jsx(PerformancePlayheadButtonComponent, { returnToPlayhead: returnToLiveObservable }), _jsx(PerformanceViewerSidebarComponent, { collector: performanceCollector, onVisibleRangeChangedObservable: onVisibleRangeChangedObservable }), _jsx(CanvasGraphComponent, { id: "performance-viewer-graph", returnToPlayheadObservable: returnToLiveObservable, layoutObservable: layoutObservable, scene: scene, collector: performanceCollector, onVisibleRangeChangedObservable: onVisibleRangeChangedObservable, initialGraphSize: initialGraphSize })] }));
};
//# sourceMappingURL=performanceViewerPopupComponent.js.map