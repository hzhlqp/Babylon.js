import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ControlButtonComponent } from "../controls/controlButtonComponent";
import firstKeyIcon from "../assets/animationLastKeyIcon.svg";
import firstKeyHoverIcon from "../assets/animationLastKeyHoverIcon.svg";
import revKeyIcon from "../assets/animationPlayRevIcon.svg";
import revKeyHoverIcon from "../assets/animationPlayRevHoverIcon.svg";
import fwdKeyIcon from "../assets/animationPlayFwdIcon.svg";
import fwdKeyHoverIcon from "../assets/animationPlayFwdHoverIcon.svg";
import nextKeyIcon from "../assets/animationNextKeyIcon.svg";
import nextKeyHoverIcon from "../assets/animationNextKeyHoverIcon.svg";
import startKeyIcon from "../assets/animationStartIcon.svg";
import startKeyHoverIcon from "../assets/animationStartHoverIcon.svg";
import endKeyIcon from "../assets/animationEndIcon.svg";
import endKeyHoverIcon from "../assets/animationEndHoverIcon.svg";
import stopIcon from "../assets/animationStopIcon.svg";
import stopHoverIcon from "../assets/animationStopHoverIcon.svg";
import nextFrameIcon from "../assets/animationNextFrameIcon.svg";
import nextFrameHoverIcon from "../assets/animationNextFrameHoverIcon.svg";
import lastFrameIcon from "../assets/animationLastFrameIcon.svg";
import lastFrameHoverIcon from "../assets/animationLastFrameHoverIcon.svg";
export class MediaPlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {};
        this.props.context.onAnimationStateChanged.add(() => {
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
        this._isMounted = false;
    }
    _onFirstKey() {
        this.props.context.onMoveToFrameRequired.notifyObservers(this.props.context.fromKey);
    }
    _onPrevKey() {
        const prevKey = this.props.context.getPrevKey();
        if (prevKey !== null) {
            this.props.context.onMoveToFrameRequired.notifyObservers(prevKey);
        }
    }
    _onRewind() {
        this.props.context.play(false);
        this.forceUpdate();
    }
    _onForward() {
        this.props.context.play(true);
        this.forceUpdate();
    }
    _onPrevFrame() {
        this.props.context.onMoveToFrameRequired.notifyObservers(Math.max(0, this.props.context.activeFrame - 1));
    }
    _onNextFrame() {
        this.props.context.onMoveToFrameRequired.notifyObservers(this.props.context.activeFrame + 1);
    }
    _onNextKey() {
        const nextKey = this.props.context.getNextKey();
        if (nextKey !== null) {
            this.props.context.onMoveToFrameRequired.notifyObservers(nextKey);
        }
    }
    _onEndKey() {
        this.props.context.onMoveToFrameRequired.notifyObservers(this.props.context.toKey);
    }
    _onStop() {
        this.props.context.stop();
        this.forceUpdate();
    }
    render() {
        return (_jsxs("div", { id: "media-player", children: [_jsx(ControlButtonComponent, { tooltip: "Rewind to the first frame of the selected timeline", id: "start-key", context: this.props.context, globalState: this.props.globalState, icon: startKeyIcon, hoverIcon: startKeyHoverIcon, onClick: () => this._onFirstKey() }), _jsx(ControlButtonComponent, { tooltip: "Rewind to the previous frame", id: "prev-frame", context: this.props.context, globalState: this.props.globalState, icon: lastFrameIcon, hoverIcon: lastFrameHoverIcon, onClick: () => this._onPrevFrame() }), _jsx(ControlButtonComponent, { tooltip: "Rewind to the previous key frame", id: "first-key", context: this.props.context, globalState: this.props.globalState, icon: firstKeyIcon, hoverIcon: firstKeyHoverIcon, onClick: () => this._onPrevKey() }), ((this.props.context.isPlaying && this.props.context.forwardAnimation) || !this.props.context.isPlaying) && (_jsx(ControlButtonComponent, { tooltip: "Play backwards", id: "rev-key", context: this.props.context, globalState: this.props.globalState, icon: revKeyIcon, hoverIcon: revKeyHoverIcon, onClick: () => this._onRewind() })), this.props.context.isPlaying && !this.props.context.forwardAnimation && (_jsx(ControlButtonComponent, { tooltip: "Stop", id: "stop-key", context: this.props.context, globalState: this.props.globalState, icon: stopIcon, hoverIcon: stopHoverIcon, onClick: () => this._onStop() })), ((this.props.context.isPlaying && !this.props.context.forwardAnimation) || !this.props.context.isPlaying) && (_jsx(ControlButtonComponent, { tooltip: "Play forwards", id: "fwd-key", context: this.props.context, globalState: this.props.globalState, icon: fwdKeyIcon, hoverIcon: fwdKeyHoverIcon, onClick: () => this._onForward() })), this.props.context.isPlaying && this.props.context.forwardAnimation && (_jsx(ControlButtonComponent, { tooltip: "Stop", id: "stop-key", context: this.props.context, globalState: this.props.globalState, icon: stopIcon, hoverIcon: stopHoverIcon, onClick: () => this._onStop() })), _jsx(ControlButtonComponent, { tooltip: "Advance to the next key frame", id: "next-key", context: this.props.context, globalState: this.props.globalState, icon: nextKeyIcon, hoverIcon: nextKeyHoverIcon, onClick: () => this._onNextKey() }), _jsx(ControlButtonComponent, { tooltip: "Advance to the next frame", id: "next-frame", context: this.props.context, globalState: this.props.globalState, icon: nextFrameIcon, hoverIcon: nextFrameHoverIcon, onClick: () => this._onNextFrame() }), _jsx(ControlButtonComponent, { tooltip: "Advance to the last frame of the selected timeline", id: "end-key", context: this.props.context, globalState: this.props.globalState, icon: endKeyIcon, hoverIcon: endKeyHoverIcon, onClick: () => this._onEndKey() })] }));
    }
}
//# sourceMappingURL=mediaPlayerComponent.js.map