import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FrameBarComponent } from "./frameBarComponent";
import { GraphComponent } from "./graphComponent";
import { PlayHeadComponent } from "./playHeadComponent";
import { RangeFrameBarComponent } from "./rangeFrameBarComponent";
import "../scss/canvas.scss";
export class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._onActiveAnimationChangedObserver = this.props.context.onActiveAnimationChanged.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
    }
    render() {
        return (_jsxs("div", { id: "canvas-zone", children: [_jsx(FrameBarComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(GraphComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(PlayHeadComponent, { context: this.props.context, globalState: this.props.globalState }), _jsx(RangeFrameBarComponent, { context: this.props.context, globalState: this.props.globalState }), this.props.context.activeAnimations.length > 0 && _jsx("div", { id: "angle-mode" })] }));
    }
}
//# sourceMappingURL=canvasComponent.js.map