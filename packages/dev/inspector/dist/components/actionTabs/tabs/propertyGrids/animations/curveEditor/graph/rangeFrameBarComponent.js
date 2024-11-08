import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
const tickDistance = 25; // x distance between consecutive ticks
export class RangeFrameBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this._viewWidth = 748;
        this._offsetX = 10;
        this._isMounted = false;
        this.state = {};
        this._svgHost = React.createRef();
        this.props.context.onHostWindowResized.add(() => {
            this._computeSizes();
        });
        this._onActiveAnimationChangedObserver = this.props.context.onActiveAnimationChanged.add(() => {
            if (!this._isMounted) {
                return;
            }
            this._computeSizes();
            this.forceUpdate();
        });
        this._onPlayheadMovedObserver = this.props.context.onPlayheadMoved.add(() => {
            this.forceUpdate();
        });
        this.props.context.onFrameSet.add(() => {
            if (!this._isMounted) {
                return;
            }
            this.forceUpdate();
        });
        this._onFrameManuallyEnteredObserver = this.props.context.onFrameManuallyEntered.add(() => {
            if (!this._isMounted) {
                return;
            }
            this.forceUpdate();
        });
        this.props.context.onRangeUpdated.add(() => {
            if (!this._isMounted) {
                return;
            }
            this.forceUpdate();
        });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onPlayheadMovedObserver) {
            this.props.context.onPlayheadMoved.remove(this._onPlayheadMovedObserver);
        }
        if (this._onFrameManuallyEnteredObserver) {
            this.props.context.onFrameManuallyEntered.remove(this._onFrameManuallyEnteredObserver);
        }
        this._isMounted = false;
    }
    _computeSizes() {
        if (!this._svgHost.current) {
            return;
        }
        this._viewWidth = this._svgHost.current.clientWidth;
        this.props.context.onRangeFrameBarResized.notifyObservers(this._viewWidth);
        this.forceUpdate();
    }
    _dropKeyFrames(animation) {
        const from = this.props.context.fromKey;
        const to = this.props.context.toKey;
        const range = to - from;
        const convertRatio = range / this._viewWidth;
        const keys = animation.getKeys();
        return keys.map((k, i) => {
            const x = (k.frame - from) / convertRatio;
            return (_jsx("line", { x1: x, y1: "0px", x2: x, y2: "40px", style: {
                    stroke: "#ffc017",
                    strokeWidth: 0.5,
                } }, "frame-line" + k.frame + i));
        });
    }
    _buildActiveFrame() {
        if (this.props.context.activeFrame === null || this.props.context.activeFrame === undefined) {
            return null;
        }
        const from = this.props.context.fromKey;
        const to = this.props.context.toKey;
        const range = to - from;
        const convertRatio = range / this._viewWidth;
        const x = (this.props.context.activeFrame - from) / convertRatio;
        return (_jsx("line", { x1: x, y1: "0px", x2: x, y2: "40px", style: {
                stroke: "#ffffff",
                strokeWidth: 0.5,
            } }, "line-activeFrame"));
    }
    _buildFrames() {
        if (this.props.context.activeAnimations.length === 0) {
            return null;
        }
        const from = this.props.context.fromKey;
        const to = this.props.context.toKey;
        const range = to - from;
        const convertRatio = range / this._viewWidth;
        const dist = tickDistance;
        const offset = Math.max(Math.floor(dist * convertRatio), 1);
        const steps = [];
        const start = from;
        const end = start + range;
        for (let step = start; step <= end; step += offset) {
            steps.push(step);
        }
        if (steps[steps.length - 1] < end - offset / 2) {
            steps.push(end);
        }
        return steps.map((s, i) => {
            const x = (s - from) / convertRatio;
            return (_jsxs("g", { children: [_jsx("line", { x1: x, y1: "22px", x2: x, y2: "40px", style: {
                            stroke: "#333333",
                            strokeWidth: 0.5,
                        } }, "line" + s + i), _jsx("text", { x: x, y: 0, dx: "6px", textAnchor: "middle", dy: "14px", style: {
                            fontFamily: "acumin-pro-condensed",
                            fontSize: `12px`,
                            fill: "#555555",
                            textAlign: "center",
                        }, children: s.toFixed(0) }, "label" + s + i)] }, "axis" + s + i));
        });
    }
    render() {
        const viewBox = `${-this._offsetX} 0 ${this._viewWidth + this._offsetX * 4} 40`;
        return (_jsx("div", { id: "range-frame-bar", children: _jsxs("svg", { id: "svg-range-frames", viewBox: viewBox, ref: this._svgHost, children: [this._buildFrames(), this.props.context.activeAnimations.map((a) => {
                        return this._dropKeyFrames(a);
                    }), this._buildActiveFrame()] }) }));
    }
}
//# sourceMappingURL=rangeFrameBarComponent.js.map