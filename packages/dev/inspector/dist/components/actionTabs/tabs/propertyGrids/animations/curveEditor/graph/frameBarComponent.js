import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
// x distance between consecutive ticks on the frame
const baseTickDistance = 25;
const minTickDistance = 35;
export class FrameBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this._graphAbsoluteWidth = 788;
        this._viewWidth = 748;
        this._viewScale = 1;
        this._offsetX = 0;
        this.state = {};
        this._svgHost = React.createRef();
        this.props.context.onHostWindowResized.add(() => {
            this._computeSizes();
        });
        this._onActiveAnimationChangedObserver = this.props.context.onActiveAnimationChanged.add(() => {
            this._computeSizes();
            this.forceUpdate();
        });
        this.props.context.onGraphMoved.add((x) => {
            this._offsetX = x;
            this.forceUpdate();
        });
        this.props.context.onGraphScaled.add((scale) => {
            this._viewScale = scale;
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
    }
    _computeSizes() {
        if (!this._svgHost.current) {
            return;
        }
        this._viewWidth = this._svgHost.current.clientWidth;
        this.forceUpdate();
    }
    _buildFrames() {
        if (this.props.context.activeAnimations.length === 0) {
            return null;
        }
        const minFrame = this.props.context.referenceMinFrame;
        const maxFrame = this.props.context.referenceMaxFrame;
        const range = maxFrame - minFrame;
        const convertRatio = range / this._graphAbsoluteWidth;
        const dist = Math.max(baseTickDistance * this._viewScale, minTickDistance); // x distance between consecutive ticks
        let offset = Math.floor(dist * convertRatio);
        const steps = [];
        if (offset === 0) {
            offset = 1;
        }
        const startPosition = this._offsetX * convertRatio;
        const start = minFrame - ((startPosition / offset) | 0) * offset;
        const end = start + this._viewWidth * this._viewScale * convertRatio;
        for (let step = start - offset; step <= end + offset; step += offset) {
            steps.push(step);
        }
        return steps.map((s) => {
            const x = (s - minFrame) / convertRatio;
            return (_jsxs("g", { children: [_jsx("line", { x1: x, y1: `${5 * this._viewScale}px`, x2: x, y2: `${30 * this._viewScale}px`, style: {
                            stroke: "#333333",
                            strokeWidth: 0.5,
                        } }, "line" + s), _jsx("text", { x: x, y: 0, dx: `${7 * this._viewScale}px`, textAnchor: "middle", dy: `${15 * this._viewScale}px`, style: {
                            fontFamily: "acumin-pro-condensed",
                            fontSize: `${10 * this._viewScale}px`,
                            fill: "#555555",
                            textAlign: "center",
                        }, children: s.toFixed(0) }, "label" + s)] }, "axis" + s));
        });
    }
    render() {
        const viewBox = `${-this._offsetX} 0 ${Math.round(this._viewWidth * this._viewScale)} ${Math.round(30 * this._viewScale)}`;
        return (_jsxs("div", { id: "frame-bar", children: [this.props.context.activeAnimations.length > 0 && _jsx("div", { id: "angle-unit" }), _jsx("div", { id: "frames", children: _jsx("svg", { id: "svg-frames", viewBox: viewBox, ref: this._svgHost, children: this._buildFrames() }) })] }));
    }
}
//# sourceMappingURL=frameBarComponent.js.map