import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
export class PlayHeadComponent extends React.Component {
    constructor(props) {
        super(props);
        this._graphAbsoluteWidth = 788;
        this._viewScale = 1;
        this._offsetX = 0;
        this._offsetRange = 10;
        this._viewWidth = 748;
        this._rangeWidthToPlayheadWidth = 40;
        this.state = {};
        this._playHead = React.createRef();
        this._playHeadCircle = React.createRef();
        this._onActiveAnimationChangedObserver = this.props.context.onActiveAnimationChanged.add(() => {
            this.forceUpdate();
        });
        this._onRangeFrameBarResizedObserver = this.props.context.onRangeFrameBarResized.add((width) => {
            this._viewWidth = width - this._rangeWidthToPlayheadWidth;
        });
        this._onBeforeRenderObserver = this.props.context.scene.onBeforeRenderObservable.add(() => {
            if (this.props.context.activeAnimations.length === 0) {
                return;
            }
            const animation = this.props.context.activeAnimations[0];
            if (!animation) {
                return;
            }
            const runtimeAnimation = animation.runtimeAnimations[0];
            if (runtimeAnimation) {
                this._moveHead(runtimeAnimation.currentFrame);
            }
            else if (!this._playHeadCircle.current?.innerHTML) {
                this._moveHead(0);
            }
        });
        this._onMoveToFrameRequiredObserver = this.props.context.onMoveToFrameRequired.add((frame) => {
            this.props.context.moveToFrame(frame);
            this._moveHead(frame);
        });
        this._onGraphMovedObserver = this.props.context.onGraphMoved.add((x) => {
            this._offsetX = x;
            this.forceUpdate();
            this._moveHead(this.props.context.activeFrame);
        });
        this._onGraphScaledObserver = this.props.context.onGraphScaled.add((scale) => {
            this._viewScale = 1 / scale;
            this.forceUpdate();
            this._moveHead(this.props.context.activeFrame);
        });
    }
    _moveHead(frame) {
        if (!this._playHead.current || !this._playHeadCircle.current || frame === undefined) {
            return;
        }
        this._playHead.current.style.left = this._frameToPixel(frame) + "px";
        this._playHeadCircle.current.innerHTML = frame.toFixed(0);
        this.props.context.activeFrame = frame;
        this.props.context.onPlayheadMoved.notifyObservers(frame);
    }
    _frameToPixel(frame) {
        const minFrame = this.props.context.referenceMinFrame;
        const maxFrame = this.props.context.referenceMaxFrame;
        return (((frame - minFrame) / (maxFrame - minFrame)) * this._graphAbsoluteWidth + this._offsetX) * this._viewScale;
    }
    _pixelToFrame(pixel, locator) {
        const { minFrame, maxFrame, width, offset, scale } = locator;
        const animation = this.props.context.activeAnimations[0];
        const keys = animation.getKeys();
        return Math.max(((pixel / scale - offset) / width) * (maxFrame - minFrame) + minFrame, keys[0].frame);
    }
    componentWillUnmount() {
        if (this._onBeforeRenderObserver) {
            this.props.context.scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
            this._onBeforeRenderObserver = null;
        }
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onRangeFrameBarResizedObserver) {
            this.props.context.onRangeFrameBarResized.remove(this._onRangeFrameBarResizedObserver);
        }
        if (this._onMoveToFrameRequiredObserver) {
            this.props.context.onMoveToFrameRequired.remove(this._onMoveToFrameRequiredObserver);
        }
        if (this._onGraphMovedObserver) {
            this.props.context.onGraphMoved.remove(this._onGraphMovedObserver);
        }
        if (this._onGraphScaledObserver) {
            this.props.context.onGraphScaled.remove(this._onGraphScaledObserver);
        }
    }
    _getPixelValues(isRange) {
        let minFrame, maxFrame, width, offset, scale;
        if (isRange) {
            minFrame = this.props.context.fromKey;
            maxFrame = this.props.context.toKey;
            width = this._viewWidth;
            offset = this._offsetRange;
            scale = 1;
        }
        else {
            minFrame = this.props.context.referenceMinFrame;
            maxFrame = this.props.context.referenceMaxFrame;
            width = this._graphAbsoluteWidth;
            offset = this._offsetX;
            scale = this._viewScale;
        }
        return { minFrame, maxFrame, width, offset, scale };
    }
    _onPointerDown(evt, isRange) {
        evt.preventDefault();
        this._pointerIsDown = true;
        evt.currentTarget.setPointerCapture(evt.pointerId);
        const locator = this._getPixelValues(isRange);
        const frame = this._pixelToFrame(evt.nativeEvent.offsetX, locator);
        this.props.context.moveToFrame(frame);
        this._moveHead(frame);
    }
    _onPointerMove(evt, isRange) {
        if (!this._pointerIsDown) {
            return;
        }
        const locator = this._getPixelValues(isRange);
        const frame = this._pixelToFrame(evt.nativeEvent.offsetX, locator);
        this.props.context.moveToFrame(frame);
        this._moveHead(frame);
    }
    _onPointerUp(evt) {
        this._pointerIsDown = false;
        evt.currentTarget.releasePointerCapture(evt.pointerId);
    }
    render() {
        if (this.props.context.activeAnimations.length === 0) {
            return null;
        }
        return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "play-head", ref: this._playHead, children: [_jsx("div", { id: "play-head-bar" }), _jsx("div", { id: "play-head-circle", ref: this._playHeadCircle })] }), _jsx("div", { id: "play-head-control", onPointerDown: (evt) => this._onPointerDown(evt, false), onPointerMove: (evt) => this._onPointerMove(evt, false), onPointerUp: (evt) => this._onPointerUp(evt) }), _jsx("div", { id: "play-head-control-2", onPointerDown: (evt) => this._onPointerDown(evt, true), onPointerMove: (evt) => this._onPointerMove(evt, true), onPointerUp: (evt) => this._onPointerUp(evt) })] }));
    }
}
//# sourceMappingURL=playHeadComponent.js.map