import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Animation } from "core/Animations/animation";
import { ActionButtonComponent } from "../controls/actionButtonComponent";
import { AnimationSubEntryComponent } from "./animationSubEntryComponent";
import gearIcon from "../assets/animationOptionsIcon.svg";
import deleteIcon from "../assets/closeWindowIcon.svg";
import bulletIcon from "../assets/animationBulletIcon.svg";
import selectedIcon from "../assets/keySelectedIcon.svg";
import chevronIcon from "../assets/animationTriangleIcon.svg";
export class AnimationEntryComponent extends React.Component {
    constructor(props) {
        super(props);
        this._unmount = false;
        this.state = { isExpanded: false, isSelected: false };
        this._onActiveAnimationChangedObserver = props.context.onActiveAnimationChanged.add(() => {
            if (this._unmount) {
                return;
            }
            if (this.props.context.activeAnimations.indexOf(this.props.animation) === -1) {
                this.setState({ isSelected: false });
            }
            this.forceUpdate();
        });
        this._onActiveKeyPointChangedObserver = this.props.context.onActiveKeyPointChanged.add(() => {
            this.setState({
                isSelected: this.props.animation.dataType === Animation.ANIMATIONTYPE_FLOAT &&
                    this.props.context.activeAnimations.indexOf(this.props.animation) !== -1 &&
                    this.props.context.activeKeyPoints !== null &&
                    this.props.context.activeKeyPoints.length > 0 &&
                    this.props.context.activeKeyPoints.some((kp) => kp.props.curve.animation === this.props.animation),
            });
        });
        this._onSelectToActivatedObserver = this.props.context.onSelectToActivated.add((info) => {
            const currentIndex = this.props.context.getAnimationSortIndex(this.props.animation);
            const activeIndex = this.props.context.activeAnimations.indexOf(this.props.animation);
            if ((currentIndex > info.from && currentIndex <= info.to) || (currentIndex >= info.to && currentIndex < info.from)) {
                if (activeIndex === -1) {
                    this.props.context.activeAnimations.push(this.props.animation);
                }
            }
            else if (currentIndex !== info.from && activeIndex !== -1) {
                this.props.context.activeAnimations.splice(activeIndex, 1);
            }
        });
    }
    _onGear() {
        this.props.context.onEditAnimationUIClosed.addOnce(() => {
            if (!this._unmount) {
                this.forceUpdate();
            }
        });
        this.props.context.onEditAnimationRequired.notifyObservers(this.props.animation);
    }
    _onDelete() {
        this.props.context.onDeleteAnimation.notifyObservers(this.props.animation);
    }
    componentWillUnmount() {
        this._unmount = true;
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onActiveKeyPointChangedObserver) {
            this.props.context.onActiveKeyPointChanged.remove(this._onActiveKeyPointChangedObserver);
        }
        if (this._onSelectToActivatedObserver) {
            this.props.context.onSelectToActivated.remove(this._onSelectToActivatedObserver);
        }
    }
    _activate(evt) {
        if (evt.shiftKey) {
            if (this.props.context.activeAnimations.length > 0) {
                const firstOne = this.props.context.activeAnimations[0];
                const payload = {
                    from: this.props.context.getAnimationSortIndex(firstOne),
                    to: this.props.context.getAnimationSortIndex(this.props.animation),
                };
                this.props.context.onSelectToActivated.notifyObservers(payload);
                this.props.context.onActiveAnimationChanged.notifyObservers({});
            }
            return;
        }
        if (!evt.ctrlKey) {
            this.props.context.activeAnimations = [this.props.animation];
            this.props.context.resetAllActiveChannels();
        }
        else {
            const index = this.props.context.activeAnimations.indexOf(this.props.animation);
            if (index !== -1) {
                this.props.context.activeAnimations.splice(index, 1);
            }
            else {
                this.props.context.activeAnimations.push(this.props.animation);
            }
        }
        this.props.context.disableChannel(this.props.animation);
        this.props.context.onActiveAnimationChanged.notifyObservers({});
    }
    _expandOrCollapse() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }
    render() {
        const isActive = this.props.context.activeAnimations.indexOf(this.props.animation) !== -1;
        return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "animation-entry" + (isActive ? " isActive" : ""), children: [this.state.isSelected && (_jsx("div", { className: "animation-active-indicator", children: _jsx("img", { src: selectedIcon }) })), this.props.animation.dataType === Animation.ANIMATIONTYPE_FLOAT && (_jsx("div", { className: "animation-chevron", children: _jsx("img", { src: bulletIcon }) })), this.props.animation.dataType !== Animation.ANIMATIONTYPE_FLOAT && (_jsx("div", { className: "animation-chevron", onClick: () => this._expandOrCollapse(), children: _jsx("img", { className: "animation-chevron-image" + (this.state.isExpanded ? "" : " collapsed"), src: chevronIcon }) })), _jsx("div", { className: "animation-name", onClick: (evt) => this._activate(evt), children: this.props.animation.name }), _jsx(ActionButtonComponent, { className: "animation-options", context: this.props.context, globalState: this.props.globalState, icon: gearIcon, onClick: () => this._onGear() }), _jsx(ActionButtonComponent, { className: "animation-delete", context: this.props.context, globalState: this.props.globalState, icon: deleteIcon, onClick: () => this._onDelete() })] }), this.state.isExpanded && this.props.animation.dataType === Animation.ANIMATIONTYPE_COLOR3 && (_jsxs(_Fragment, { children: [_jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#DB3E3E", subName: "Red" }), _jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#51E22D", subName: "Green" }), _jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#00A3FF", subName: "Blue" })] })), this.state.isExpanded && this.props.animation.dataType === Animation.ANIMATIONTYPE_VECTOR3 && (_jsxs(_Fragment, { children: [_jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#DB3E3E", subName: "X" }), _jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#51E22D", subName: "Y" }), _jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#00A3FF", subName: "Z" })] })), this.state.isExpanded && this.props.animation.dataType === Animation.ANIMATIONTYPE_VECTOR2 && (_jsxs(_Fragment, { children: [_jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#DB3E3E", subName: "X" }), _jsx(AnimationSubEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.animation, color: "#51E22D", subName: "Y" })] }))] }));
    }
}
//# sourceMappingURL=animationEntryComponent.js.map