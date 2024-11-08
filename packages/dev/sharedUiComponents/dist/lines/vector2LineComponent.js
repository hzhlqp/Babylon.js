import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Vector2 } from "core/Maths/math.vector";
import { NumericInput } from "./numericInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
export class Vector2LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        const value = this.props.target[this.props.propertyName];
        this.state = { isExpanded: false, value: value && value.clone ? value.clone() : Vector2.Zero() };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const nextPropsValue = nextProps.target[nextProps.propertyName];
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
            property: this.props.propertyName,
            value: this.state.value,
            initialValue: previousValue,
        });
    }
    updateStateX(value) {
        this._localChange = true;
        const store = this.state.value.clone();
        this.props.target[this.props.propertyName].x = value;
        this.state.value.x = value;
        this.setState({ value: this.state.value });
        this.raiseOnPropertyChanged(store);
    }
    updateStateY(value) {
        this._localChange = true;
        const store = this.state.value.clone();
        this.props.target[this.props.propertyName].y = value;
        this.state.value.y = value;
        this.setState({ value: this.state.value });
        this.raiseOnPropertyChanged(store);
    }
    render() {
        const chevron = this.state.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        return (_jsxs("div", { className: "vector3Line", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsxs("div", { className: "firstLine", title: this.props.label, children: [_jsx("div", { className: "label", children: this.props.label }), _jsx("div", { className: "vector", children: `X: ${this.state.value.x.toFixed(2)}, Y: ${this.state.value.y.toFixed(2)}` }), _jsx("div", { className: "expand hoverIcon", onClick: () => this.switchExpandState(), title: "Expand", children: chevron })] }), this.state.isExpanded && (_jsxs("div", { className: "secondLine", children: [_jsx(NumericInput, { lockObject: this.props.lockObject, label: "x", step: this.props.step, value: this.state.value.x, onChange: (value) => this.updateStateX(value) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "y", step: this.props.step, value: this.state.value.y, onChange: (value) => this.updateStateY(value) })] }))] }));
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
Vector2LineComponent.defaultProps = {
    step: 0.001, // cm
};
//# sourceMappingURL=vector2LineComponent.js.map