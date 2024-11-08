import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { PopupComponent } from "../../../../../popupComponent";
import { BottomBarComponent } from "./bottomBar/bottomBarComponent";
import { TopBarComponent } from "./topBarComponent";
import { CanvasComponent } from "./graph/canvasComponent";
import { SideBarComponent } from "./sideBar/sideBarComponent";
import "./scss/curveEditor.scss";
export class AnimationCurveEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }
    onCloseAnimationCurveEditor(window) {
        if (window !== null) {
            window.close();
        }
        this.setState({ isOpen: false });
        this.props.context.activeAnimations = [];
        this.props.context.onActiveAnimationChanged.notifyObservers({});
    }
    shouldComponentUpdate(newProps, newState) {
        if (newState.isOpen !== this.state.isOpen) {
            if (newState.isOpen) {
                this.props.context.prepare();
                if (this.props.context.animations && this.props.context.animations.length) {
                    setTimeout(() => {
                        this.props.context.activeAnimations.push(this.props.context.useTargetAnimations
                            ? this.props.context.animations[0].animation
                            : this.props.context.animations[0]);
                        this.props.context.onActiveAnimationChanged.notifyObservers({});
                    });
                }
            }
            return true;
        }
        return false;
    }
    _onKeyDown(evt) {
        switch (evt.key) {
            case "Delete":
            case "Backspace":
                if (this.props.context.activeKeyPoints?.length && !this.props.context.focusedInput) {
                    this.props.context.onDeleteKeyActiveKeyPoints.notifyObservers();
                }
                break;
            case " ":
                if (this.props.context.isPlaying) {
                    this.props.context.stop();
                }
                else {
                    this.props.context.play(true);
                }
                break;
            case "a":
                if (evt.ctrlKey) {
                    this.props.context.onSelectAllKeys.notifyObservers();
                    this.props.context.onActiveKeyPointChanged.notifyObservers();
                    evt.preventDefault();
                }
                break;
            case "ArrowLeft":
                if (!this.props.context.focusedInput) {
                    this.props.context.onMoveToFrameRequired.notifyObservers(Math.max(0, this.props.context.activeFrame - 1));
                }
                break;
            case "ArrowRight":
                if (!this.props.context.focusedInput) {
                    this.props.context.onMoveToFrameRequired.notifyObservers(Math.min(this.props.context.clipLength, this.props.context.activeFrame + 1));
                }
                break;
            case "ArrowDown": {
                const prevKey = this.props.context.getPrevKey();
                if (prevKey !== null) {
                    this.props.context.onMoveToFrameRequired.notifyObservers(prevKey);
                }
                break;
            }
            case "ArrowUp": {
                const nextKey = this.props.context.getNextKey();
                if (nextKey !== null) {
                    this.props.context.onMoveToFrameRequired.notifyObservers(nextKey);
                }
            }
        }
    }
    render() {
        return (_jsxs(_Fragment, { children: [_jsx(ButtonLineComponent, { label: "Edit", onClick: () => {
                        this.setState({ isOpen: true });
                    } }), this.state.isOpen && (_jsx(PopupComponent, { id: "curve-editor", title: "Animation Curve Editor", size: { width: 1024, height: 512 }, onResize: () => this.props.context.onHostWindowResized.notifyObservers(), onClose: (window) => this.onCloseAnimationCurveEditor(window), onKeyDown: (evt) => this._onKeyDown(evt), children: _jsxs("div", { id: "curve-editor", children: [_jsx(TopBarComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(SideBarComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(CanvasComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(BottomBarComponent, { globalState: this.props.globalState, context: this.props.context })] }) }))] }));
    }
}
//# sourceMappingURL=animationCurveEditorComponent.js.map