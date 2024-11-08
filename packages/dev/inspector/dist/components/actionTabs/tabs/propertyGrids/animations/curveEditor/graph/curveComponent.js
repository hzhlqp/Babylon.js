import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Animation } from "core/Animations/animation";
export class CurveComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSelected: false };
        this._onDataUpdatedObserver = this.props.curve.onDataUpdatedObservable.add(() => this.forceUpdate());
        this._onActiveAnimationChangedObserver = props.context.onActiveAnimationChanged.add(() => {
            if (this._onDataUpdatedObserver) {
                this.props.curve.onDataUpdatedObservable.remove(this._onDataUpdatedObserver);
            }
            this._onDataUpdatedObserver = null;
            this.forceUpdate();
        });
        this._onInterpolationModeSetObserver = props.context.onInterpolationModeSet.add(({ keyId, value }) => {
            this.props.curve.updateInterpolationMode(keyId, value);
        });
    }
    componentWillUnmount() {
        if (this._onDataUpdatedObserver) {
            this.props.curve.onDataUpdatedObservable.remove(this._onDataUpdatedObserver);
        }
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onInterpolationModeSetObserver) {
            this.props.context.onInterpolationModeSet.remove(this._onInterpolationModeSetObserver);
        }
    }
    componentDidUpdate() {
        if (!this._onDataUpdatedObserver) {
            this._onDataUpdatedObserver = this.props.curve.onDataUpdatedObservable.add(() => this.forceUpdate());
        }
        return true;
    }
    render() {
        if (!this.props.context.isChannelEnabled(this.props.curve.animation, this.props.curve.color)) {
            return null;
        }
        const pathStyle = {
            stroke: this.props.curve.color,
            fill: "none",
            strokeWidth: "1",
        };
        if (this.props.curve.animation.dataType === Animation.ANIMATIONTYPE_QUATERNION) {
            pathStyle["stroke-dasharray"] = "5";
            pathStyle["stroke-opacity"] = "0.5";
        }
        return (_jsx("svg", { style: { cursor: "pointer", overflow: "auto" }, children: _jsx("path", { d: this.props.curve.getPathData(this.props.convertX, this.props.convertY), style: pathStyle }) }));
    }
}
//# sourceMappingURL=curveComponent.js.map