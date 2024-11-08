import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { copyCommandToClipboard, getClassNameWithNamespace } from "../copyCommandToClipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { conflictingValuesPlaceholder } from "./targetsProxy";
import copyIcon from "../imgs/copy.svg";
import toggleOnIcon40px from "../imgs/toggleOnIcon_40px.svg";
import toggleOffIcon40px from "../imgs/toggleOffIcon_40px.svg";
import toggleOnIcon30px from "../imgs/toggleOnIcon_30px.svg";
import toggleMixedIcon30px from "../imgs/toggleMixedIcon_30px.svg";
import toggleOffIcon30px from "../imgs/toggleOffIcon_30px.svg";
const Icons = {
    size30: {
        on: toggleOnIcon30px,
        mixed: toggleMixedIcon30px,
        off: toggleOffIcon30px,
    },
    size40: {
        on: toggleOnIcon40px,
        mixed: "",
        off: toggleOffIcon40px,
    },
};
export class CheckBoxLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        if (this.props.isSelected) {
            this.state = { isSelected: this.props.isSelected(), isConflict: false };
        }
        else {
            this.state = {
                isSelected: this.props.target[this.props.propertyName] === true,
                isConflict: this.props.target[this.props.propertyName] === conflictingValuesPlaceholder,
            };
        }
        if (this.props.disabled) {
            this.state = { ...this.state, isDisabled: this.props.disabled };
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        let selected;
        if (nextProps.isSelected) {
            selected = nextProps.isSelected();
        }
        else {
            selected = nextProps.target[nextProps.propertyName] === true;
            if (nextProps.target[nextProps.propertyName] === conflictingValuesPlaceholder) {
                nextState.isConflict = true;
            }
        }
        if (selected !== nextState.isSelected || this._localChange) {
            nextState.isSelected = selected;
            this._localChange = false;
            return true;
        }
        if (nextProps.disabled !== nextState.isDisabled) {
            return true;
        }
        return nextProps.label !== this.props.label || nextProps.target !== this.props.target || nextState.isConflict !== this.state.isConflict;
    }
    onChange() {
        this._localChange = true;
        if (this.props.onSelect) {
            this.props.onSelect(!this.state.isSelected);
        }
        else {
            if (this.props.onPropertyChangedObservable) {
                this.props.onPropertyChangedObservable.notifyObservers({
                    object: this.props.target,
                    property: this.props.propertyName,
                    value: !this.state.isSelected,
                    initialValue: this.state.isSelected,
                });
            }
            if (this.props.target && this.props.propertyName) {
                this.props.target[this.props.propertyName] = !this.state.isSelected;
            }
        }
        if (this.props.onValueChanged) {
            this.props.onValueChanged();
        }
        this.setState({ isSelected: !this.state.isSelected, isConflict: false });
    }
    // Copy to clipboard the code this checkbox actually does
    // Example : mesh.checkCollisions = true;
    onCopyClick() {
        if (this.props && this.props.target) {
            const { className, babylonNamespace } = getClassNameWithNamespace(this.props.target);
            const targetName = "globalThis.debugNode";
            const targetProperty = this.props.propertyName;
            const value = this.props.target[this.props.propertyName];
            const strCommand = targetName + "." + targetProperty + " = " + value + ";// (debugNode as " + babylonNamespace + className + ")";
            copyCommandToClipboard(strCommand);
        }
        else {
            copyCommandToClipboard("undefined");
        }
    }
    render() {
        const icons = this.props.large ? Icons.size40 : Icons.size30;
        const icon = this.state.isConflict ? icons.mixed : this.state.isSelected ? icons.on : icons.off;
        return (_jsxs("div", { className: "checkBoxLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), this.props.label && (_jsx("div", { className: "label", title: this.props.iconLabel, children: this.props.label })), this.props.faIcons && (_jsx(FontAwesomeIcon, { className: `cbx ${this.props.disabled ? "disabled" : ""}`, icon: this.state.isSelected ? this.props.faIcons.enabled : this.props.faIcons.disabled, onClick: () => !this.props.disabled && this.onChange() })), !this.props.faIcons && (_jsx("div", { className: "checkBox", children: _jsxs("label", { className: `container lbl${this.props.disabled ? " disabled" : ""} ${this.state.isSelected ? "checked" : ""}`, children: [_jsx("input", { type: "checkbox", className: `cbx hidden ${this.state.isConflict ? "conflict" : ""}`, checked: this.state.isSelected, onChange: () => this.onChange(), disabled: !!this.props.disabled }), _jsx("img", { className: "icon", src: icon, alt: this.props.label })] }) })), _jsx("div", { className: "copy hoverIcon", onClick: () => this.onCopyClick(), title: "Copy to clipboard", children: _jsx("img", { src: copyIcon, alt: "Copy" }) })] }));
    }
}
//# sourceMappingURL=checkBoxLineComponent.js.map