import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import style from "./HexColor.modules.scss";
export class HexColorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hex: this.props.value.replace("#", "") };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value !== this.props.value) {
            nextState.hex = nextProps.value.replace("#", "");
        }
        return true;
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
    updateHexValue(valueString) {
        if (valueString != "" && /^[0-9A-Fa-f]+$/g.test(valueString) == false) {
            return;
        }
        this.setState({ hex: valueString });
        if (valueString.length !== this.props.expectedLength) {
            if (this.props.expectedLength === 8 && valueString.length === 6) {
                valueString = valueString + "FF";
            }
            else {
                return;
            }
        }
        this.props.onChange("#" + valueString);
    }
    render() {
        return (_jsxs("div", { className: style.colorPickerHex, children: [_jsx("div", { className: style.colorPickerHexLabel, children: "Hex" }), _jsx("div", { className: style.colorPickerHexValue, children: _jsx("input", { type: "string", 
                        // className="hex-input"
                        className: style.colorPickerHex, value: this.state.hex, onBlur: () => this.unlock(), onFocus: () => this.lock(), onChange: (evt) => this.updateHexValue(evt.target.value) }) })] }));
    }
}
//# sourceMappingURL=HexColor.js.map