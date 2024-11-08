import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ActionButtonComponent } from "../controls/actionButtonComponent";
import { AnimationListComponent } from "./animationListComponent";
import { TextInputComponent } from "../controls/textInputComponent";
import { SaveAnimationComponent } from "./saveAnimationComponent";
import { LoadAnimationComponent } from "./loadAnimationComponent";
import { AddAnimationComponent } from "./addAnimationComponent";
import { EditAnimationComponent } from "./editAnimationComponent";
import "../scss/sideBar.scss";
import addIcon from "../assets/addAnimationIcon.svg";
import loadIcon from "../assets/loadIcon.svg";
import saveIcon from "../assets/saveIcon.svg";
import editIcon from "../assets/editIcon.svg";
var Mode;
(function (Mode) {
    Mode[Mode["Edit"] = 0] = "Edit";
    Mode[Mode["Add"] = 1] = "Add";
    Mode[Mode["Load"] = 2] = "Load";
    Mode[Mode["Save"] = 3] = "Save";
})(Mode || (Mode = {}));
export class SideBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: Mode.Edit };
        this.props.context.onDeleteAnimation.add((animationToDelete) => {
            const indexInActiveList = this.props.context.activeAnimations.indexOf(animationToDelete);
            if (indexInActiveList !== -1) {
                this.props.context.activeAnimations.splice(indexInActiveList, 1);
                this.props.context.onActiveAnimationChanged.notifyObservers({});
            }
            let index = -1;
            if (this.props.context.useTargetAnimations) {
                const targetedAnimations = this.props.context.animations;
                for (let i = 0; i < targetedAnimations.length; i++) {
                    if (targetedAnimations[i].animation === animationToDelete) {
                        index = i;
                        break;
                    }
                }
            }
            else {
                index = this.props.context.animations.indexOf(animationToDelete);
            }
            if (index > -1) {
                this.props.context.animations.splice(index, 1);
                this.forceUpdate();
            }
        });
        this.props.context.onAnimationsLoaded.add(() => this.setState({ mode: Mode.Edit }));
    }
    _onAddAnimation() {
        if (this.state.mode === Mode.Add) {
            return;
        }
        this.setState({ mode: Mode.Add });
    }
    _onLoadAnimation() {
        if (this.state.mode === Mode.Load) {
            return;
        }
        this.setState({ mode: Mode.Load });
    }
    _onSaveAnimation() {
        if (this.state.mode === Mode.Save) {
            return;
        }
        this.setState({ mode: Mode.Save });
    }
    _onEditAnimation() {
        if (this.state.mode === Mode.Edit) {
            return;
        }
        this.setState({ mode: Mode.Edit });
    }
    render() {
        let fps = "60";
        if (this.props.context.animations && this.props.context.animations.length) {
            if (this.props.context.useTargetAnimations) {
                fps = this.props.context.animations[0].animation.framePerSecond.toString();
            }
            else {
                fps = this.props.context.animations[0].framePerSecond.toString();
            }
        }
        return (_jsxs("div", { id: "sideBar", children: [_jsxs("div", { id: "menu-bar", className: this.props.context.useTargetAnimations ? "small" : "", children: [!this.props.context.useTargetAnimations && (_jsx(ActionButtonComponent, { tooltip: "Add new animation", isActive: this.state.mode === Mode.Add, id: "add-animation", globalState: this.props.globalState, context: this.props.context, icon: addIcon, onClick: () => this._onAddAnimation() })), !this.props.context.useTargetAnimations && (_jsx(ActionButtonComponent, { tooltip: "Load animations", isActive: this.state.mode === Mode.Load, id: "load-animation", globalState: this.props.globalState, context: this.props.context, icon: loadIcon, onClick: () => this._onLoadAnimation() })), _jsx(ActionButtonComponent, { tooltip: "save current animations", isActive: this.state.mode === Mode.Save, id: "save-animation", globalState: this.props.globalState, context: this.props.context, icon: saveIcon, onClick: () => this._onSaveAnimation() }), _jsx(ActionButtonComponent, { tooltip: "Edit animations", isActive: this.state.mode === Mode.Edit, id: "edit-animation", globalState: this.props.globalState, context: this.props.context, icon: editIcon, onClick: () => this._onEditAnimation() }), _jsx(TextInputComponent, { value: fps, complement: " fps", isNumber: true, onValueAsNumberChanged: (value) => {
                                this.props.context.animations?.forEach((anim) => {
                                    if (this.props.context.useTargetAnimations) {
                                        anim.animation.framePerSecond = value;
                                    }
                                    else {
                                        anim.framePerSecond = value;
                                    }
                                });
                            }, tooltip: "Framerate", id: "framerate-animation", globalState: this.props.globalState, context: this.props.context })] }), this.state.mode === Mode.Edit && (_jsxs(_Fragment, { children: [_jsx(AnimationListComponent, { globalState: this.props.globalState, context: this.props.context }), _jsx(EditAnimationComponent, { globalState: this.props.globalState, context: this.props.context })] })), this.state.mode === Mode.Save && _jsx(SaveAnimationComponent, { globalState: this.props.globalState, context: this.props.context }), this.state.mode === Mode.Load && _jsx(LoadAnimationComponent, { globalState: this.props.globalState, context: this.props.context }), this.state.mode === Mode.Add && _jsx(AddAnimationComponent, { globalState: this.props.globalState, context: this.props.context })] }));
    }
}
//# sourceMappingURL=sideBarComponent.js.map