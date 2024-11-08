import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ActionButtonComponent } from "./controls/actionButtonComponent";
import { TextInputComponent } from "./controls/textInputComponent";
import "./scss/topBar.scss";
import logoIcon from "./assets/babylonLogo.svg";
import frameIcon from "./assets/frameIcon.svg";
import newKeyIcon from "./assets/newKeyIcon.svg";
import flatTangentIcon from "./assets/flatTangentIcon.svg";
import linearTangentIcon from "./assets/linearTangentIcon.svg";
import breakTangentIcon from "./assets/breakTangentIcon.svg";
import unifyTangentIcon from "./assets/unifyTangentIcon.svg";
import stepTangentIcon from "./assets/stepTangentIcon.svg";
export class TopBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { keyFrameValue: "", keyValue: "", frameControlEnabled: false, valueControlEnabled: false };
        this._onFrameSetObserver = this.props.context.onFrameSet.add((newFrameValue) => {
            this.setState({ keyFrameValue: newFrameValue.toFixed(0) });
        });
        this._onValueSetObserver = this.props.context.onValueSet.add((newValue) => {
            this.setState({ keyValue: newValue.toFixed(2) });
        });
        this._onActiveAnimationChangedObserver = this.props.context.onActiveAnimationChanged.add(() => {
            this.setState({ keyFrameValue: "", keyValue: "" });
        });
        this._onActiveKeyPointChanged = this.props.context.onActiveKeyPointChanged.add(() => {
            const numKeys = this.props.context.activeKeyPoints?.length || 0;
            const numAnims = new Set(this.props.context.activeKeyPoints?.map((keyPointComponent) => keyPointComponent.props.curve.animation.uniqueId)).size;
            const frameControlEnabled = (numKeys === 1 && numAnims === 1) || (numKeys > 1 && numAnims > 1);
            const valueControlEnabled = numKeys > 0;
            const hasActiveQuaternionAnimation = this.props.context.hasActiveQuaternionAnimationKeyPoints();
            this.setState({
                keyFrameValue: "",
                keyValue: "",
                frameControlEnabled: frameControlEnabled && !hasActiveQuaternionAnimation,
                valueControlEnabled: valueControlEnabled && !hasActiveQuaternionAnimation,
            });
        });
    }
    componentWillUnmount() {
        if (this._onFrameSetObserver) {
            this.props.context.onFrameSet.remove(this._onFrameSetObserver);
        }
        if (this._onValueSetObserver) {
            this.props.context.onValueSet.remove(this._onValueSetObserver);
        }
        if (this._onActiveAnimationChangedObserver) {
            this.props.context.onActiveAnimationChanged.remove(this._onActiveAnimationChangedObserver);
        }
        if (this._onActiveKeyPointChanged) {
            this.props.context.onActiveKeyPointChanged.remove(this._onActiveKeyPointChanged);
        }
    }
    render() {
        const hasActiveAnimations = this.props.context.activeAnimations.length > 0;
        return (_jsxs("div", { id: "top-bar", children: [_jsx("img", { id: "top-bar-logo", src: logoIcon }), _jsx("div", { id: "top-bar-parent-name", children: this.props.context.title }), _jsx(TextInputComponent, { className: hasActiveAnimations && this.state.frameControlEnabled ? "" : "disabled", isNumber: true, value: this.state.keyFrameValue, tooltip: "Frame", id: "key-frame", onValueAsNumberChanged: (newValue) => {
                        if (newValue !== 0) {
                            this.props.context.onFrameManuallyEntered.notifyObservers(newValue);
                        }
                    }, globalState: this.props.globalState, context: this.props.context, disabled: parseFloat(this.state.keyFrameValue) === 0 }), _jsx(TextInputComponent, { className: hasActiveAnimations && this.state.valueControlEnabled ? "" : "disabled", isNumber: true, value: this.state.keyValue, tooltip: "Value", id: "key-value", onValueAsNumberChanged: (newValue) => this.props.context.onValueManuallyEntered.notifyObservers(newValue), globalState: this.props.globalState, context: this.props.context }), _jsx(ActionButtonComponent, { className: hasActiveAnimations ? "" : "disabled", tooltip: "New key", id: "new-key", globalState: this.props.globalState, context: this.props.context, icon: newKeyIcon, onClick: () => this.props.context.onCreateOrUpdateKeyPointRequired.notifyObservers() }), _jsx(ActionButtonComponent, { tooltip: "Frame canvas", id: "frame-canvas", globalState: this.props.globalState, context: this.props.context, icon: frameIcon, onClick: () => this.props.context.onFrameRequired.notifyObservers() }), _jsx(ActionButtonComponent, { className: this.props.context.activeKeyPoints && this.props.context.activeKeyPoints.length > 0 ? "" : "disabled", tooltip: "Flatten tangent", id: "flatten-tangent", globalState: this.props.globalState, context: this.props.context, icon: flatTangentIcon, onClick: () => this.props.context.onFlattenTangentRequired.notifyObservers() }), _jsx(ActionButtonComponent, { className: this.props.context.activeKeyPoints && this.props.context.activeKeyPoints.length > 0 ? "" : "disabled", tooltip: "Linear tangent", id: "linear-tangent", globalState: this.props.globalState, context: this.props.context, icon: linearTangentIcon, onClick: () => this.props.context.onLinearTangentRequired.notifyObservers() }), _jsx(ActionButtonComponent, { className: this.props.context.activeKeyPoints && this.props.context.activeKeyPoints.length > 0 ? "" : "disabled", tooltip: "Break tangent", id: "break-tangent", globalState: this.props.globalState, context: this.props.context, icon: breakTangentIcon, onClick: () => this.props.context.onBreakTangentRequired.notifyObservers() }), _jsx(ActionButtonComponent, { className: this.props.context.activeKeyPoints && this.props.context.activeKeyPoints.length > 0 ? "" : "disabled", tooltip: "Unify tangent", id: "unify-tangent", globalState: this.props.globalState, context: this.props.context, icon: unifyTangentIcon, onClick: () => this.props.context.onUnifyTangentRequired.notifyObservers() }), _jsx(ActionButtonComponent, { className: this.props.context.activeKeyPoints && this.props.context.activeKeyPoints.length > 0 ? "" : "disabled", tooltip: "Step tangent", id: "step-tangent", globalState: this.props.globalState, context: this.props.context, icon: stepTangentIcon, onClick: () => this.props.context.onStepTangentRequired.notifyObservers() })] }));
    }
}
//# sourceMappingURL=topBarComponent.js.map