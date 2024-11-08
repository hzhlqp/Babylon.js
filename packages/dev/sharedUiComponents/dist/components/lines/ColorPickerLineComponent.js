import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ColorPickerComponent } from "../colorPicker/ColorPicker";
import style from "./ColorPickerLineComponent.modules.scss";
export class ColorPickerLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pickerEnabled: false, color: this.props.value, hex: this.getHexString(props) };
        this._floatRef = React.createRef();
        this._floatHostRef = React.createRef();
        this._coverRef = React.createRef();
    }
    syncPositions() {
        const div = this._floatRef.current;
        const host = this._floatHostRef.current;
        if (!div || !host) {
            return;
        }
        let top = host.getBoundingClientRect().top;
        const height = div.getBoundingClientRect().height;
        if (top + height + 10 > window.innerHeight) {
            top = window.innerHeight - height - 10;
        }
        div.style.top = top + "px";
        if (!this.props.shouldPopRight) {
            div.style.left = host.getBoundingClientRect().left - div.getBoundingClientRect().width + "px";
        }
        else {
            div.style.left = host.getBoundingClientRect().left + "px";
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const diffProps = this.getHexString(nextProps) !== this.getHexString();
        if (diffProps) {
            nextState.color = nextProps.value;
            nextState.hex = this.getHexString(nextProps);
        }
        return diffProps || nextState.hex !== this.state.hex || nextState.pickerEnabled !== this.state.pickerEnabled;
    }
    getHexString(props = this.props) {
        return props.value.toHexString();
    }
    componentDidUpdate() {
        this.syncPositions();
    }
    componentDidMount() {
        this.syncPositions();
    }
    render() {
        return (_jsxs("div", { className: style.colorPicker, children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: style.colorRectBackground, ref: this._floatHostRef, onClick: () => this.setState({ pickerEnabled: true }), children: _jsx("div", { className: style.colorRect, style: { background: this.state.hex } }) }), this.state.pickerEnabled && (_jsx(_Fragment, { children: _jsx("div", { ref: this._coverRef, className: style.colorPickerCover, onClick: (evt) => {
                            if (evt.target !== this._coverRef.current) {
                                return;
                            }
                            this.setState({ pickerEnabled: false });
                        }, children: _jsx("div", { className: style.colorPickerFloat, ref: this._floatRef, children: _jsx(ColorPickerComponent, { backgroundColor: this.props.backgroundColor, lockObject: this.props.lockObject || {}, color: this.state.color, linearhint: this.props.linearHint, onColorChanged: (color) => {
                                    const hex = color.toHexString();
                                    this.setState({ hex, color });
                                    this.props.onColorChanged(hex);
                                } }) }) }) }))] }));
    }
}
//# sourceMappingURL=ColorPickerLineComponent.js.map