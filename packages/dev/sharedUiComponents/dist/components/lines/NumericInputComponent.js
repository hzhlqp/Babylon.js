import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import style from "./NumericInputComponent.modules.scss";
export class NumericInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        this.state = { value: this.props.value.toFixed(this.props.precision !== undefined ? this.props.precision : 3) };
    }
    componentWillUnmount() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = false;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this._localChange) {
            return true;
        }
        if (nextProps.value.toString() !== nextState.value) {
            nextState.value = nextProps.value.toFixed(this.props.precision !== undefined ? this.props.precision : 3);
            return true;
        }
        return false;
    }
    updateValue(valueString) {
        if (/[^0-9.-]/g.test(valueString)) {
            return;
        }
        const valueAsNumber = parseFloat(valueString);
        this._localChange = true;
        this.setState({ value: valueString });
        if (isNaN(valueAsNumber)) {
            return;
        }
        this.props.onChange(valueAsNumber);
    }
    onBlur() {
        this._localChange = false;
        const valueAsNumber = parseFloat(this.state.value);
        if (this.props.lockObject) {
            this.props.lockObject.lock = false;
        }
        if (isNaN(valueAsNumber)) {
            this.props.onChange(this.props.value);
            return;
        }
        this.props.onChange(valueAsNumber);
    }
    incrementValue(amount) {
        let currentValue = parseFloat(this.state.value);
        if (isNaN(currentValue)) {
            currentValue = 0;
        }
        this.updateValue((currentValue + amount).toFixed(this.props.precision !== undefined ? this.props.precision : 3));
    }
    onKeyDown(evt) {
        const step = this.props.step || 1;
        const handleArrowKey = (sign) => {
            if (evt.shiftKey) {
                sign *= 10;
                if (evt.ctrlKey || evt.metaKey) {
                    sign *= 10;
                }
            }
            this.incrementValue(sign * step);
            evt.preventDefault();
        };
        if (evt.key === "ArrowUp") {
            handleArrowKey(1);
        }
        else if (evt.key === "ArrowDown") {
            handleArrowKey(-1);
        }
    }
    render() {
        return (_jsxs("div", { className: style.numeric, children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), this.props.label && (_jsx("div", { className: style.numericLabel, title: this.props.labelTooltip ?? this.props.label, children: `${this.props.label}: ` })), _jsx("input", { type: "number", step: this.props.step, className: style.numericInput, value: this.state.value, onChange: (evt) => this.updateValue(evt.target.value), onKeyDown: (evt) => this.onKeyDown(evt), onFocus: () => {
                        if (this.props.lockObject) {
                            this.props.lockObject.lock = true;
                        }
                    }, onBlur: () => this.onBlur() })] }));
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
NumericInputComponent.defaultProps = {
    step: 1,
};
//# sourceMappingURL=NumericInputComponent.js.map