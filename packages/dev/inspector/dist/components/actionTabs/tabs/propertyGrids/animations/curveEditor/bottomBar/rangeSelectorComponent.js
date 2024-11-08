import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import handleIcon from "../assets/scrollbarHandleIcon.svg";
export class RangeSelectorComponent extends React.Component {
    constructor(props) {
        super(props);
        this._viewWidth = 748;
        this.state = {};
        this._rangeHost = React.createRef();
        this._rangeScrollbarHost = React.createRef();
        this.props.context.onHostWindowResized.add(() => {
            this._computeSizes();
        });
        this.props.context.onFrameSet.add(() => {
            this.forceUpdate();
        });
        this.props.context.onAnimationsLoaded.add(() => {
            this.forceUpdate();
        });
        this._updateLimits();
    }
    _computeSizes() {
        if (!this._rangeHost.current) {
            return;
        }
        this._viewWidth = this._rangeHost.current.clientWidth - 4;
        this.forceUpdate();
    }
    _onPointerDown(evt) {
        this._bothHandleIsActive = false;
        if (evt.nativeEvent.target.id === "left-handle") {
            this._leftHandleIsActive = true;
        }
        else if (evt.nativeEvent.target.id === "right-handle") {
            this._leftHandleIsActive = false;
        }
        else {
            this._bothHandleIsActive = true;
            this._currentOffset = evt.nativeEvent.clientX;
            this._currentFrom = this.props.context.fromKey;
            this._currentTo = this.props.context.toKey;
        }
        this._pointerIsDown = true;
        evt.currentTarget.setPointerCapture(evt.pointerId);
    }
    _onPointerMove(evt) {
        if (!this._pointerIsDown) {
            return;
        }
        if (!this.props.context.animations || !this.props.context.animations.length) {
            return;
        }
        this._updateLimits();
        let left = evt.nativeEvent.offsetX;
        if (this._bothHandleIsActive) {
            left = evt.nativeEvent.clientX - this._currentOffset;
        }
        let offset = (left / this._viewWidth) * (this._maxFrame - this._minFrame);
        const newValue = Math.min(this._maxFrame, Math.max(this._minFrame, Math.round(this._minFrame + offset)));
        if (this._bothHandleIsActive) {
            if (this._currentTo + offset > this._maxFrame) {
                offset = this._maxFrame - this._currentTo;
            }
            if (this._currentFrom + offset < this._minFrame) {
                offset = this._minFrame - this._currentFrom;
            }
            this.props.context.fromKey = Math.min(this._maxFrame, Math.max(this._minFrame, (this._currentFrom + offset) | 0));
            this.props.context.toKey = Math.min(this._maxFrame, Math.max(this._minFrame, (this._currentTo + offset) | 0));
        }
        else if (this._leftHandleIsActive) {
            this.props.context.fromKey = newValue;
            this.props.context.fromKey = Math.min(this.props.context.toKey - 1, this.props.context.fromKey);
        }
        else {
            this.props.context.toKey = newValue;
            this.props.context.toKey = Math.max(this.props.context.fromKey + 1, this.props.context.toKey);
        }
        this.props.context.onRangeUpdated.notifyObservers();
        this.props.context.stop();
        this.forceUpdate();
    }
    _updateLimits() {
        if (!this.props.context.animations || !this.props.context.animations.length) {
            return;
        }
        let minFrame = Number.MAX_VALUE;
        let maxFrame = -Number.MAX_VALUE;
        for (const animation of this.props.context.animations) {
            const keys = this.props.context.useTargetAnimations ? animation.animation.getKeys() : animation.getKeys();
            minFrame = Math.min(minFrame, keys[0].frame);
            maxFrame = Math.max(maxFrame, keys[keys.length - 1].frame);
        }
        this._minFrame = minFrame;
        this._maxFrame = maxFrame;
    }
    _onPointerUp(evt) {
        this._pointerIsDown = false;
        evt.currentTarget.releasePointerCapture(evt.pointerId);
    }
    render() {
        this._updateLimits();
        const ratio = this._maxFrame - this._minFrame;
        if (this.props.context.toKey > this._maxFrame) {
            this.props.context.toKey = this._maxFrame;
        }
        return (_jsx("div", { id: "range-selector", ref: this._rangeHost, onPointerDown: (evt) => this._onPointerDown(evt), onPointerMove: (evt) => this._onPointerMove(evt), onPointerUp: (evt) => this._onPointerUp(evt), children: _jsxs("div", { id: "range-scrollbar", ref: this._rangeScrollbarHost, style: {
                    left: `${2 + ((this.props.context.fromKey - this._minFrame) / ratio) * this._viewWidth}px`,
                    right: `${2 + ((this._maxFrame - this.props.context.toKey) / ratio) * this._viewWidth}px`,
                }, children: [_jsx("div", { id: "left-handle", className: "handle", children: _jsx("img", { src: handleIcon }) }), _jsx("div", { id: "from-key", children: this.props.context.fromKey | 0 }), _jsx("div", { id: "to-key", children: this.props.context.toKey | 0 }), _jsx("div", { id: "right-handle", className: "handle", children: _jsx("img", { src: handleIcon }) })] }) }));
    }
}
//# sourceMappingURL=rangeSelectorComponent.js.map