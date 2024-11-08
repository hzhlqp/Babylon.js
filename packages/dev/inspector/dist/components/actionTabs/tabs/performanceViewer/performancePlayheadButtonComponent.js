import { jsx as _jsx } from "react/jsx-runtime";
export const PerformancePlayheadButtonComponent = ({ returnToPlayhead }) => {
    const onReturnToPlayheadClick = () => {
        returnToPlayhead.notifyObservers();
    };
    return (_jsx("button", { className: "performancePlayheadButton", onClick: onReturnToPlayheadClick, title: "Return to Playhead", children: "Return" }));
};
//# sourceMappingURL=performancePlayheadButtonComponent.js.map