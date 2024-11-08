import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Vector4 } from "core/Maths/math.vector";
import { NumericInput } from "./numericInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
export class Vector4LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        const value = this.getCurrentValue();
        this.state = { isExpanded: false, value: value && value.clone ? value.clone() : Vector4.Zero() };
    }
    getCurrentValue() {
        return this.props.value || this.props.target[this.props.propertyName];
    }
    shouldComponentUpdate(nextProps, nextState) {
        const nextPropsValue = nextProps.value || nextProps.target[nextProps.propertyName];
        if (!nextPropsValue.equals(nextState.value) || this._localChange) {
            nextState.value = nextPropsValue.clone();
            this._localChange = false;
            return true;
        }
        return false;
    }
    switchExpandState() {
        this._localChange = true;
        this.setState({ isExpanded: !this.state.isExpanded });
    }
    raiseOnPropertyChanged(previousValue) {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
        if (!this.props.onPropertyChangedObservable) {
            return;
        }
        this.props.onPropertyChangedObservable.notifyObservers({
            object: this.props.target,
            property: this.props.propertyName || "",
            value: this.state.value,
            initialValue: previousValue,
        });
    }
    updateVector4() {
        const store = this.getCurrentValue().clone();
        if (this.props.value) {
            this.props.value.copyFrom(this.state.value);
        }
        else {
            this.props.target[this.props.propertyName] = this.state.value;
        }
        this.setState({ value: store });
        this.raiseOnPropertyChanged(store);
    }
    updateStateX(value) {
        this._localChange = true;
        this.state.value.x = value;
        this.updateVector4();
    }
    updateStateY(value) {
        this._localChange = true;
        this.state.value.y = value;
        this.updateVector4();
    }
    updateStateZ(value) {
        this._localChange = true;
        this.state.value.z = value;
        this.updateVector4();
    }
    updateStateW(value) {
        this._localChange = true;
        this.state.value.w = value;
        this.updateVector4();
    }
    render() {
        const chevron = this.state.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        return (_jsxs("div", { className: "vector3Line", children: [_jsxs("div", { className: "firstLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsx("div", { className: "vector", children: `X: ${this.state.value.x.toFixed(2)}, Y: ${this.state.value.y.toFixed(2)}, Z: ${this.state.value.z.toFixed(2)}, W: ${this.state.value.w.toFixed(2)}` }), _jsx("div", { className: "expand hoverIcon", onClick: () => this.switchExpandState(), title: "Expand", children: chevron })] }), _jsxs("div", { className: "secondLine", children: [_jsx(NumericInput, { lockObject: this.props.lockObject, label: "x", step: this.props.step, value: this.state.value.x, onChange: (value) => this.updateStateX(value) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "y", step: this.props.step, value: this.state.value.y, onChange: (value) => this.updateStateY(value) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "z", step: this.props.step, value: this.state.value.z, onChange: (value) => this.updateStateZ(value) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "w", step: this.props.step, value: this.state.value.w, onChange: (value) => this.updateStateW(value) })] })] }));
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
Vector4LineComponent.defaultProps = {
    step: 0.001, // cm
};
//# sourceMappingURL=vector4LineComponent.js.map