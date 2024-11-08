import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class TextInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value, isFocused: false };
    }
    _onChange(value) {
        if (this.props.isNumber) {
            const valueAsNumber = parseFloat(value);
            if (!isNaN(valueAsNumber)) {
                if (this.props.onValueAsNumberChanged) {
                    this.props.onValueAsNumberChanged(valueAsNumber, true);
                }
                this._lastKnownGoodValue = valueAsNumber.toString();
            }
            else if (value !== "-" && value !== "") {
                return;
            }
        }
        this._lastKnownGoodValue = value;
        this.setState({ value: value });
    }
    _onBlur() {
        this.props.context.focusedInput = false;
        if (this.props.isNumber) {
            const valueAsNumber = parseFloat(this.state.value);
            if (!isNaN(valueAsNumber)) {
                if (this.props.onValueAsNumberChanged) {
                    this.props.onValueAsNumberChanged(valueAsNumber, false);
                }
                this.setState({ value: valueAsNumber.toString(), isFocused: false });
            }
            else {
                this.setState({ value: this._lastKnownGoodValue, isFocused: false });
            }
            return;
        }
        this.setState({ isFocused: false });
    }
    _onFocus() {
        this.props.context.focusedInput = true;
        this.setState({ isFocused: true });
    }
    shouldComponentUpdate(newProps, newState) {
        if (newProps !== this.props) {
            newState.value = newProps.value;
        }
        return true;
    }
    _onKeyPress(evt) {
        if (evt.key === "Enter") {
            const valueAsNumber = parseFloat(this.state.value);
            if (!isNaN(valueAsNumber)) {
                if (this.props.onValueAsNumberChanged) {
                    this.props.onValueAsNumberChanged(valueAsNumber, false);
                }
            }
        }
    }
    render() {
        return (_jsx("input", { type: "text", title: this.props.tooltip, onFocus: () => this._onFocus(), onBlur: () => this._onBlur(), className: "text-input" + (this.props.className ? " " + this.props.className : ""), onChange: (evt) => this._onChange(this.props.complement ? evt.target.value.replace(this.props.complement, "") : evt.target.value), onKeyPress: (evt) => this._onKeyPress(evt), value: (this.state.value || "") + (!this.state.isFocused && this.props.complement ? this.props.complement : ""), id: this.props.id, disabled: this.props.disabled }));
    }
}
//# sourceMappingURL=textInputComponent.js.map