import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { copyCommandToClipboard, getClassNameWithNamespace } from "../copyCommandToClipboard";
import copyIcon from "../imgs/copy.svg";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Null_Value = Number.MAX_SAFE_INTEGER;
export class OptionsLine extends React.Component {
    _remapValueIn(value) {
        return this.props.allowNullValue && value === null ? Null_Value : value;
    }
    _remapValueOut(value) {
        return this.props.allowNullValue && value === Null_Value ? null : value;
    }
    _getValue(props) {
        if (props.extractValue) {
            return props.extractValue(props.target);
        }
        return props.target && props.propertyName ? props.target[props.propertyName] : props.options[props.defaultIfNull || 0];
    }
    constructor(props) {
        super(props);
        this._localChange = false;
        this.state = { value: this._remapValueIn(this._getValue(props)) };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this._localChange) {
            this._localChange = false;
            return true;
        }
        const newValue = this._remapValueIn(nextProps.extractValue ? nextProps.extractValue(this.props.target) : nextProps.target[nextProps.propertyName]);
        if (newValue != null && newValue !== nextState.value) {
            nextState.value = newValue;
            return true;
        }
        return false;
    }
    raiseOnPropertyChanged(newValue, previousValue) {
        if (!this.props.onPropertyChangedObservable) {
            return;
        }
        this.props.onPropertyChangedObservable.notifyObservers({
            object: this.props.target,
            property: this.props.propertyName,
            value: newValue,
            initialValue: previousValue,
            allowNullValue: this.props.allowNullValue,
        });
    }
    setValue(value) {
        this.setState({ value: value });
    }
    updateValue(valueString) {
        const value = this.props.valuesAreStrings ? valueString : parseInt(valueString);
        this._localChange = true;
        const store = this.props.extractValue ? this.props.extractValue(this.props.target) : this.props.target[this.props.propertyName];
        if (!this.props.noDirectUpdate) {
            this.props.target[this.props.propertyName] = this._remapValueOut(value);
        }
        this.setState({ value: value });
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
        const newValue = this.props.extractValue ? this.props.extractValue(this.props.target) : this.props.target[this.props.propertyName];
        this.raiseOnPropertyChanged(newValue, store);
    }
    // Copy to clipboard the code this option actually does
    // Example : material.sideOrientation = 1;
    onCopyClick() {
        if (this.props && this.props.target) {
            const { className, babylonNamespace } = getClassNameWithNamespace(this.props.target);
            const targetName = "globalThis.debugNode";
            const targetProperty = this.props.propertyName;
            const value = this.props.extractValue ? this.props.extractValue(this.props.target) : this.props.target[this.props.propertyName];
            const strCommand = targetName + "." + targetProperty + " = " + value + ";// (debugNode as " + babylonNamespace + className + ")";
            copyCommandToClipboard(strCommand);
        }
        else {
            copyCommandToClipboard("undefined");
        }
    }
    render() {
        return (_jsxs("div", { className: "listLine" + (this.props.className ? " " + this.props.className : ""), children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, color: "black", className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsx("div", { className: "options", children: _jsx("select", { onChange: (evt) => this.updateValue(evt.target.value), value: this.state.value ?? "", children: this.props.options.map((option, i) => {
                            return (_jsx("option", { selected: option.selected, value: option.value, title: option.label, children: option.label }, option.label + i));
                        }) }) }), _jsx("div", { className: "copy hoverIcon", onClick: () => this.onCopyClick(), title: "Copy to clipboard", children: _jsx("img", { src: copyIcon, alt: "Copy" }) })] }));
    }
}
//# sourceMappingURL=optionsLineComponent.js.map