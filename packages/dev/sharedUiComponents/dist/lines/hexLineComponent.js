import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class HexLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        this._propertyChange = true;
        const currentValue = this.props.target[this.props.propertyName];
        this.state = { value: currentValue ? (this.props.isInteger ? currentValue.toFixed(0) : currentValue.toFixed(this.props.digits || 3)) : "0" };
        this._store = currentValue;
    }
    componentWillUnmount() {
        this.unlock();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this._localChange) {
            this._localChange = false;
            return true;
        }
        const newValue = nextProps.target[nextProps.propertyName];
        const newValueString = newValue ? (this.props.isInteger ? newValue.toFixed(0) : newValue.toFixed(this.props.digits || 3)) : "0";
        if (newValueString !== nextState.value) {
            nextState.value = newValueString;
            return true;
        }
        return false;
    }
    raiseOnPropertyChanged(newValue, previousValue) {
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
        if (!this.props.onPropertyChangedObservable) {
            return;
        }
        this.props.onPropertyChangedObservable.notifyObservers({
            object: this.props.replaySourceReplacement ?? this.props.target,
            property: this.props.propertyName,
            value: newValue,
            initialValue: previousValue,
        });
    }
    convertToHexString(valueString) {
        while (valueString.length < 10) {
            valueString += "0";
        }
        return valueString;
    }
    updateValue(valueString, raisePropertyChanged) {
        if (valueString.substring(0, 2) != "0x") {
            if (valueString.substring(0, 1) != "0") {
                valueString = "0x" + valueString;
            }
            else {
                valueString = "0x" + valueString.substr(1);
            }
        }
        const valueSubstr = valueString.substr(2);
        if (valueSubstr != "" && /^[0-9A-Fa-f]+$/g.test(valueSubstr) == false) {
            return;
        }
        if (valueString.length > 10) {
            return;
        }
        const valueStringAsHex = this.convertToHexString(valueString);
        let valueAsNumber;
        valueAsNumber = parseInt(valueStringAsHex);
        if (!isNaN(valueAsNumber) && this.props.min !== undefined) {
            if (valueAsNumber < this.props.min) {
                valueAsNumber = this.props.min;
                valueString = valueAsNumber.toString();
            }
        }
        this._localChange = true;
        if (isNaN(valueAsNumber)) {
            return;
        }
        this.setState({ value: valueString });
        if (raisePropertyChanged) {
            this._propertyChange = true;
            this.props.target[this.props.propertyName] = valueAsNumber;
            this.raiseOnPropertyChanged(valueAsNumber, this._store);
        }
        else {
            this._propertyChange = false;
        }
        this._store = valueAsNumber;
    }
    lock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = true;
        }
    }
    unlock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = false;
        }
    }
    render() {
        let valueAsHex;
        if (this._propertyChange) {
            const valueAsNumber = parseInt(this.state.value);
            valueAsHex = valueAsNumber.toString(16);
            let hex0String = "";
            for (let i = 0; i < 8 - valueAsHex.length; i++) {
                //padding the '0's
                hex0String += "0";
            }
            valueAsHex = "0x" + hex0String + valueAsHex.toUpperCase();
        }
        else {
            valueAsHex = this.state.value;
        }
        return (_jsx("div", { children: !this.props.useEuler && (_jsxs("div", { className: this.props.additionalClass ? this.props.additionalClass + " floatLine" : "floatLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsx("div", { className: "value", children: _jsx("input", { type: "string", className: "hex-input", value: valueAsHex, onBlur: () => this.unlock(), onFocus: () => this.lock(), onChange: (evt) => this.updateValue(evt.target.value, false), onKeyDown: (evt) => {
                                if (evt.keyCode !== 13) {
                                    return;
                                }
                                this.updateValue(this.state.value, true);
                            } }) })] })) }));
    }
}
//# sourceMappingURL=hexLineComponent.js.map