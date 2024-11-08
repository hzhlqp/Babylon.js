import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { SelectionState } from "../graph/keyPoint";
import selectedIcon from "../assets/keySelectedIcon.svg";
export class AnimationSubEntryComponent extends React.Component {
    constructor(props) {
        super(props);
        let isSelected = false;
        if (this.props.context.activeAnimations.indexOf(this.props.animation) !== -1 && this.props.context.activeKeyPoints) {
            for (const keyPoint of this.props.context.activeKeyPoints) {
                if (keyPoint.state.selectedState === SelectionState.Selected && keyPoint.props.channel === this.props.color) {
                    isSelected = true;
                }
            }
        }
        this.state = { isSelected: isSelected };
        this._onActiveAnimationChangedObserver = props.context.onActiveAnimationChanged.add(() => {
            this.forceUpdate();
        });
        this._onActiveKeyPointChangedObserver = this.props.context.onActiveKeyPointChanged.add(() => {
            let isSelected = false;
            if (this.props.context.activeKeyPoints) {
                for (const activeKeyPoint of this.props.context.activeKeyPoints) {
                    if (activeKeyPoint.props.curve.animation === this.props.animation &&
                        activeKeyPoint.props.channel === this.props.color &&
                        this.props.context.activeAnimations.indexOf(this.props.animation) !== -1) {
                        isSelected = true;
                        break;
                    }
                }
            }
            this.setState({ isSelected: isSelected });
        });
    }
    componentWillUnmount() {
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onActiveKeyPointChangedObserver) {
            this.props.context.onActiveKeyPointChanged.remove(this._onActiveKeyPointChangedObserver);
        }
    }
    _activate(evt) {
        const index = this.props.context.activeAnimations.indexOf(this.props.animation);
        if (index !== -1 && this.props.context.getActiveChannel(this.props.animation) === this.props.color) {
            return;
        }
        if (!evt.ctrlKey) {
            this.props.context.activeAnimations = [this.props.animation];
            this.props.context.resetAllActiveChannels();
        }
        else {
            if (index === -1) {
                this.props.context.activeAnimations.push(this.props.animation);
            }
        }
        this.props.context.enableChannel(this.props.animation, this.props.color);
        this.props.context.onActiveAnimationChanged.notifyObservers({});
    }
    render() {
        const isActive = this.props.context.activeAnimations.indexOf(this.props.animation) !== -1 && this.props.context.isChannelEnabled(this.props.animation, this.props.color);
        return (_jsx(_Fragment, { children: _jsxs("div", { className: "animation-entry" + (isActive ? " isActive" : ""), children: [this.state.isSelected && (_jsx("div", { className: "animation-active-indicator", children: _jsx("img", { src: selectedIcon }) })), _jsx("div", { className: "animation-name", style: {
                            color: this.props.color,
                        }, onClick: (evt) => this._activate(evt), children: this.props.subName })] }) }));
    }
}
//# sourceMappingURL=animationSubEntryComponent.js.map