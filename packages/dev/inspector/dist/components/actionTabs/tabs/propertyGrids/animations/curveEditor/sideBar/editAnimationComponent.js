import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Animation } from "core/Animations/animation";
export class EditAnimationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isVisible: false, animation: null };
        this._root = React.createRef();
        this._displayName = React.createRef();
        this._property = React.createRef();
        this._loopModeElement = React.createRef();
        this._onEditAnimationRequiredObserver = this.props.context.onEditAnimationRequired.add((animation) => {
            this.setState({
                isVisible: true,
                animation: animation,
            });
        });
    }
    componentWillUnmount() {
        if (this._onEditAnimationRequiredObserver) {
            this.props.context.onEditAnimationRequired.remove(this._onEditAnimationRequiredObserver);
        }
    }
    close() {
        this.setState({ isVisible: false });
        this.props.context.onEditAnimationUIClosed.notifyObservers();
    }
    validate() {
        const context = this.props.context;
        const document = this._displayName.current.ownerDocument;
        const displayName = this._displayName.current.value;
        const property = this._property.current.value;
        const loopModeValue = this._loopModeElement.current.value;
        if (!displayName) {
            document.defaultView.alert("Please define a display name");
            return;
        }
        if (!property) {
            document.defaultView.alert("Please define a property");
            return;
        }
        const animation = this.state.animation;
        animation.name = displayName;
        if (animation.targetProperty !== property) {
            animation.targetProperty = property;
            animation.targetPropertyPath = property.split(".");
            context.stop();
        }
        switch (loopModeValue) {
            case "Cycle": {
                animation.loopMode = Animation.ANIMATIONLOOPMODE_CYCLE;
                break;
            }
            case "Relative": {
                animation.loopMode = Animation.ANIMATIONLOOPMODE_RELATIVE;
                break;
            }
            case "Relative from current": {
                animation.loopMode = Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT;
                break;
            }
            case "Constant": {
                animation.loopMode = Animation.ANIMATIONLOOPMODE_CONSTANT;
                break;
            }
        }
        this.close();
    }
    render() {
        if (!this.state.isVisible) {
            return null;
        }
        const loopModes = ["Relative", "Cycle", "Constant", "", "Yoyo", "Relative from current"];
        return (_jsxs("div", { id: "edit-animation-pane", ref: this._root, children: [_jsx("div", { id: "edit-animation-display-name-label", children: "Display Name" }), _jsx("div", { id: "edit-animation-property-label", children: "Property" }), _jsx("div", { id: "edit-animation-loop-mode-label", children: "Loop Mode" }), _jsx("input", { type: "text", id: "edit-animation-name", ref: this._displayName, className: "input-text", defaultValue: this.state.animation.name || "" }), _jsx("input", { type: "text", id: "edit-animation-property", ref: this._property, className: "input-text", defaultValue: this.state.animation.targetProperty }), _jsx("select", { id: "edit-animation-loop-mode", className: "option", ref: this._loopModeElement, defaultValue: loopModes[this.state.animation.loopMode ?? 1], children: loopModes
                        .filter((value) => value !== "")
                        .map((loopMode, i) => {
                        return (_jsx("option", { value: loopMode, title: loopMode, children: loopMode }, loopMode + i));
                    }) }), _jsxs("div", { id: "edit-animation", children: [_jsx("button", { className: "simple-button", id: "edit-animation-ok", type: "button", onClick: () => this.validate(), children: "OK" }), _jsx("button", { className: "simple-button", id: "edit-animation-cancel", type: "button", onClick: () => this.close(), children: "Cancel" })] })] }));
    }
}
//# sourceMappingURL=editAnimationComponent.js.map