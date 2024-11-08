import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Color3, Color4 } from "core/Maths/math.color";
import { NumericInputComponent } from "./NumericInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColorPickerLineComponent } from "./ColorPickerLineComponent";
import style from "./ColorLineComponent.modules.scss";
import copyIcon from "../../imgs/copy.svg";
import { JoinClassNames } from "../classNames";
const emptyColor = new Color4(0, 0, 0, 0);
export class ColorLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false, color: this.getValue() };
        const target = this.props.target;
        target._isLinearColor = props.isLinear; // so that replayRecorder can append toLinearSpace() as appropriate
    }
    shouldComponentUpdate(nextProps, nextState) {
        const stateColor = nextState.color;
        const propsColor = this.getValue(nextProps);
        if (stateColor !== this.state.color) {
            nextState.color = stateColor;
            return true;
        }
        if (propsColor !== this.state.color) {
            nextState.color = propsColor;
            return true;
        }
        if (nextState.isExpanded !== this.state.isExpanded) {
            return true;
        }
        return false;
    }
    getValue(props = this.props) {
        const target = props.target;
        const property = target[props.propertyName];
        if (!property)
            return emptyColor;
        if (typeof property === "string") {
            // if (property === conflictingValuesPlaceholder) {
            //     return emptyColor;
            // }
            return this._convertToColor(property);
        }
        else {
            if (props.isLinear) {
                return property.toGammaSpace();
            }
            return property.clone();
        }
    }
    setColorFromString(colorString) {
        const color = this._convertToColor(colorString);
        this.setColor(color);
    }
    setColor(newColor) {
        this.setState({ color: newColor.clone() });
        if (this.props.isLinear) {
            newColor.toLinearSpaceToRef(newColor);
        }
        // whether to set properties to color3 or color4
        const setColor = this.props.disableAlpha ? this._toColor3(newColor) : newColor;
        const target = this.props.target;
        const initialValue = target[this.props.propertyName];
        const value = typeof target[this.props.propertyName] === "string" ? setColor.toHexString() : setColor;
        // make the change
        target[this.props.propertyName] = value;
        // notify observers
        if (this.props.onPropertyChangedObservable) {
            this.props.onPropertyChangedObservable.notifyObservers({
                object: target,
                property: this.props.propertyName,
                value,
                initialValue,
            });
        }
        if (this.props.onChange) {
            this.props.onChange();
        }
    }
    switchExpandState() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }
    updateStateR(value) {
        this.setColor(new Color4(value, this.state.color.g, this.state.color.b, this.state.color.a));
    }
    updateStateG(value) {
        this.setColor(new Color4(this.state.color.r, value, this.state.color.b, this.state.color.a));
    }
    updateStateB(value) {
        this.setColor(new Color4(this.state.color.r, this.state.color.g, value, this.state.color.a));
    }
    updateStateA(value) {
        if (this.props.disableAlpha) {
            return;
        }
        this.setColor(new Color4(this.state.color.r, this.state.color.g, this.state.color.b, value));
    }
    copyToClipboard() {
        const element = document.createElement("div");
        element.textContent = this.state.color.toHexString();
        document.body.appendChild(element);
        if (window.getSelection) {
            const range = document.createRange();
            range.selectNode(element);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
        document.execCommand("copy");
        element.remove();
    }
    _convertToColor(color) {
        if (color === "" || color === "transparent") {
            return emptyColor;
        }
        if (color.substring(0, 1) !== "#" || (color.length !== 7 && color.length !== 9)) {
            const d = document.createElement("div");
            d.style.color = color;
            document.body.append(d);
            const rgb = window.getComputedStyle(d).color;
            document.body.removeChild(d);
            const rgbArray = rgb
                .substring(4, rgb.length - 1)
                .replace(/ /g, "")
                .split(",");
            const alpha = rgbArray.length > 3 ? parseInt(rgbArray[3]) / 255 : 1.0;
            return new Color4(parseInt(rgbArray[0]) / 255, parseInt(rgbArray[1]) / 255, parseInt(rgbArray[2]) / 255, alpha);
        }
        if (this.props.disableAlpha) {
            const color3 = Color3.FromHexString(color);
            return new Color4(color3.r, color3.g, color3.b, 1.0);
        }
        return Color4.FromHexString(color);
    }
    _toColor3(color) {
        return new Color3(color.r, color.g, color.b);
    }
    render() {
        const chevron = this.state.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        return (_jsxs("div", { className: style.color3Line, children: [_jsxs("div", { className: style.firstLine, children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: style.label, title: this.props.label, children: this.props.label }), _jsx("div", { className: style.color3, children: _jsx(ColorPickerLineComponent, { lockObject: this.props.lockObject, linearHint: this.props.isLinear, value: this.props.disableAlpha ? this._toColor3(this.state.color) : this.state.color, onColorChanged: (colorString) => {
                                    this.setColorFromString(colorString);
                                } }) }), _jsx("div", { className: JoinClassNames(style, "copy", "hoverIcon"), onClick: () => this.copyToClipboard(), title: "Copy to clipboard", children: _jsx("img", { src: copyIcon, alt: "Copy" }) }), _jsx("div", { className: JoinClassNames("expand", "hoverIcon"), onClick: () => this.switchExpandState(), title: "Expand", children: chevron })] }), this.state.isExpanded && (_jsxs("div", { className: style.secondLine, children: [_jsx(NumericInputComponent, { lockObject: this.props.lockObject, label: "r", labelTooltip: "Red", value: this.state.color.r, onChange: (value) => this.updateStateR(value) }), _jsx(NumericInputComponent, { lockObject: this.props.lockObject, label: "g", labelTooltip: "Green", value: this.state.color.g, onChange: (value) => this.updateStateG(value) }), _jsx(NumericInputComponent, { lockObject: this.props.lockObject, label: "b", labelTooltip: "Blue", value: this.state.color.b, onChange: (value) => this.updateStateB(value) }), this.props.disableAlpha || (_jsx(NumericInputComponent, { lockObject: this.props.lockObject, label: "a", labelTooltip: "Alpha", value: this.state.color.a, onChange: (value) => this.updateStateA(value) }))] }))] }));
    }
}
//# sourceMappingURL=ColorLineComponent.js.map