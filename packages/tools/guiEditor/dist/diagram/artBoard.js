import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CoordinateHelper, Rect } from "./coordinateHelper";
export class ArtBoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounds: new Rect(0, 0, 0, 0),
        };
        this.props.globalState.onArtBoardUpdateRequiredObservable.add(() => this.update());
    }
    update() {
        const visibleRegion = this.props.globalState.workbench.visibleRegionContainer;
        if (!visibleRegion)
            return;
        const localBounds = CoordinateHelper.ComputeLocalBounds(visibleRegion);
        const topLeftRTT = CoordinateHelper.NodeToRTTSpace(visibleRegion, localBounds.left, localBounds.top, undefined);
        const topLeftCanvas = CoordinateHelper.RttToCanvasSpace(topLeftRTT.x, topLeftRTT.y);
        const bottomRightRTT = CoordinateHelper.NodeToRTTSpace(visibleRegion, localBounds.right, localBounds.bottom, undefined);
        const bottomRightCanvas = CoordinateHelper.RttToCanvasSpace(bottomRightRTT.x, bottomRightRTT.y);
        this.setState({
            bounds: new Rect(topLeftCanvas.x, topLeftCanvas.y, bottomRightCanvas.x, bottomRightCanvas.y),
        });
    }
    render() {
        const style = {
            top: `${this.state.bounds.top}px`,
            left: `${this.state.bounds.left}px`,
            width: `${this.state.bounds.width}px`,
            height: `${this.state.bounds.height}px`,
        };
        return (_jsxs(_Fragment, { children: [_jsx("div", { className: "artboard-stroke", style: style }), _jsx("div", { className: "artboard-background", style: style })] }));
    }
}
//# sourceMappingURL=artBoard.js.map