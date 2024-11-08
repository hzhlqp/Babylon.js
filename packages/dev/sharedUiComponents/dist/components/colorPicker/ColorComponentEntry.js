import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import style from "./ColorComponentEntry.modules.scss";
export class ColorComponentComponentEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    updateValue(valueString) {
        if (/[^0-9.-]/g.test(valueString)) {
            return;
        }
        let valueAsNumber = parseInt(valueString);
        if (isNaN(valueAsNumber)) {
            return;
        }
        if (this.props.max != undefined && valueAsNumber > this.props.max) {
            valueAsNumber = this.props.max;
        }
        if (this.props.min != undefined && valueAsNumber < this.props.min) {
            valueAsNumber = this.props.min;
        }
        this.props.onChange(valueAsNumber);
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
        return (_jsxs("div", { className: style.colorPickerComponent, children: [_jsx("div", { className: style.colorPickerComponentValue, children: _jsx("input", { type: "number", step: 1, className: "numeric-input", value: this.props.value, onBlur: () => this.unlock(), onFocus: () => this.lock(), onChange: (evt) => this.updateValue(evt.target.value), disabled: this.props.disabled }) }), _jsx("div", { className: style.colorPickerComponentLabel, children: this.props.label })] }));
    }
}
//# sourceMappingURL=ColorComponentEntry.js.map