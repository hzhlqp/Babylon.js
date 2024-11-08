import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Color3, Color4 } from "core/Maths/math.color";
import { ColorComponentComponentEntry } from "./ColorComponentEntry";
import { HexColorComponent } from "./HexColor";
import style from "./ColorPicker.modules.scss";
import { ClassNames } from "../classNames";
import { Logger } from "core/Misc/logger";
/**
 * Class used to create a color picker
 */
export class ColorPickerComponent extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.color instanceof Color4) {
            this.state = { color: new Color3(this.props.color.r, this.props.color.g, this.props.color.b), alpha: this.props.color.a };
        }
        else {
            this.state = { color: this.props.color.clone(), alpha: 1 };
        }
        this._saturationRef = React.createRef();
        this._hueRef = React.createRef();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.color.toHexString() !== this.props.color.toHexString() || nextState.color.toHexString() !== this.props.color.toHexString();
    }
    onSaturationPointerDown(evt) {
        this._evaluateSaturation(evt);
        this._isSaturationPointerDown = true;
        evt.currentTarget.setPointerCapture(evt.pointerId);
    }
    onSaturationPointerUp(evt) {
        this._isSaturationPointerDown = false;
        evt.currentTarget.releasePointerCapture(evt.pointerId);
    }
    onSaturationPointerMove(evt) {
        if (!this._isSaturationPointerDown) {
            return;
        }
        this._evaluateSaturation(evt);
    }
    onHuePointerDown(evt) {
        this._evaluateHue(evt);
        this._isHuePointerDown = true;
        evt.currentTarget.setPointerCapture(evt.pointerId);
    }
    onHuePointerUp(evt) {
        this._isHuePointerDown = false;
        evt.currentTarget.releasePointerCapture(evt.pointerId);
    }
    onHuePointerMove(evt) {
        if (!this._isHuePointerDown) {
            return;
        }
        this._evaluateHue(evt);
    }
    _evaluateSaturation(evt) {
        const left = evt.nativeEvent.offsetX;
        const top = evt.nativeEvent.offsetY;
        const saturation = Math.min(1, Math.max(0.0001, left / this._saturationRef.current.clientWidth));
        const value = Math.min(1, Math.max(0.0001, 1 - top / this._saturationRef.current.clientHeight));
        if (this.props.debugMode) {
            Logger.Log("Saturation: " + saturation);
            Logger.Log("Value: " + value);
        }
        const hsv = this.state.color.toHSV();
        Color3.HSVtoRGBToRef(hsv.r, saturation, value, this.state.color);
        if (this.state.alpha === 0) {
            this.setState({ alpha: 1 });
        }
        this.setState({ color: this.state.color });
    }
    _evaluateHue(evt) {
        const left = evt.nativeEvent.offsetX;
        const hue = 360 * Math.min(0.9999, Math.max(0.0001, left / this._hueRef.current.clientWidth));
        if (this.props.debugMode) {
            Logger.Log("Hue: " + hue);
        }
        const hsv = this.state.color.toHSV();
        Color3.HSVtoRGBToRef(hue, Math.max(hsv.g, 0.01), Math.max(hsv.b, 0.01), this.state.color);
        this.setState({ color: this.state.color });
    }
    componentDidUpdate() {
        this.raiseOnColorChanged();
    }
    raiseOnColorChanged() {
        if (!this.props.onColorChanged) {
            return;
        }
        if (this.props.color instanceof Color4) {
            const newColor4 = Color4.FromColor3(this.state.color, this.state.alpha);
            this.props.onColorChanged(newColor4);
            return;
        }
        this.props.onColorChanged(this.state.color.clone());
    }
    render() {
        const color4 = Color4.FromColor3(this.state.color);
        color4.a = this.state.alpha;
        const colorHex = color4.toHexString();
        const hsv = this.state.color.toHSV();
        const colorRef = new Color3();
        Color3.HSVtoRGBToRef(hsv.r, 1, 1, colorRef);
        const colorHexRef = colorRef.toHexString();
        const hasAlpha = this.props.color instanceof Color4;
        return (_jsxs("div", { className: ClassNames({ colorPickerContainer: true, withHints: this.props.linearhint }, style), style: { backgroundColor: this.props.backgroundColor || "inherit" }, children: [_jsxs("div", { className: style.colorPickerSaturation, onPointerMove: (e) => this.onSaturationPointerMove(e), onPointerDown: (e) => this.onSaturationPointerDown(e), onPointerUp: (e) => this.onSaturationPointerUp(e), ref: this._saturationRef, style: {
                        background: colorHexRef,
                    }, children: [_jsx("div", { className: style.colorPickerSaturationWhite }), _jsx("div", { className: style.colorPickerSaturationBlack }), _jsx("div", { className: style.colorPickerSaturationCursor, style: {
                                top: `${-(hsv.b * 100) + 100}%`,
                                left: `${hsv.g * 100}%`,
                            } })] }), _jsxs("div", { className: style.colorPickerHue, children: [_jsx("div", { className: style.colorPickerHueColor, style: {
                                background: colorHex,
                            } }), _jsx("div", { className: style.colorPickerHueSlider, ref: this._hueRef, onPointerMove: (e) => this.onHuePointerMove(e), onPointerDown: (e) => this.onHuePointerDown(e), onPointerUp: (e) => this.onHuePointerUp(e), children: _jsx("div", { className: style.colorPickerHueCursor, style: {
                                    left: `${(hsv.r / 360.0) * 100}%`,
                                    border: `1px solid ` + colorHexRef,
                                } }) })] }), _jsxs("div", { className: style.colorPickerRgb, children: [_jsx("div", { className: style.red, children: _jsx(ColorComponentComponentEntry, { lockObject: this.props.lockObject, label: "R", min: 0, max: 255, value: Math.round(this.state.color.r * 255), onChange: (value) => {
                                    this.state.color.r = value / 255.0;
                                    this.forceUpdate();
                                } }) }), _jsx("div", { className: style.green, children: _jsx(ColorComponentComponentEntry, { lockObject: this.props.lockObject, label: "G", min: 0, max: 255, value: Math.round(this.state.color.g * 255), onChange: (value) => {
                                    this.state.color.g = value / 255.0;
                                    this.forceUpdate();
                                } }) }), _jsx("div", { className: style.blue, children: _jsx(ColorComponentComponentEntry, { lockObject: this.props.lockObject, label: "B", min: 0, max: 255, value: Math.round(this.state.color.b * 255), onChange: (value) => {
                                    this.state.color.b = value / 255.0;
                                    this.forceUpdate();
                                } }) }), _jsx("div", { className: ClassNames({ alpha: true, grayed: hasAlpha }, style), children: _jsx(ColorComponentComponentEntry, { lockObject: this.props.lockObject, label: "A", min: 0, max: 255, value: Math.round(this.state.alpha * 255), onChange: (value) => {
                                    this.setState({ alpha: value / 255.0 });
                                    this.forceUpdate();
                                } }) })] }), _jsx(HexColorComponent, { lockObject: this.props.lockObject, expectedLength: hasAlpha ? 8 : 6, value: colorHex, onChange: (value) => {
                        if (hasAlpha) {
                            const color4 = Color4.FromHexString(value);
                            this.setState({ color: new Color3(color4.r, color4.g, color4.b), alpha: color4.a });
                        }
                        else {
                            this.setState({ color: Color3.FromHexString(value) });
                        }
                    } }), this.props.linearhint && (_jsx("div", { className: style.colorPickerWarning, children: "(Note: color is stored in linear mode and was converted to gamma to be displayed here (toGammaSpace() / toLinearSpace()))" }))] }));
    }
}
//# sourceMappingURL=ColorPicker.js.map