import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ParticleSystem } from "core/Particles/particleSystem";
export class FactorGradientStepGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gradient: props.gradient.gradient, factor1: this.props.gradient.factor1.toString(), factor2: this.props.gradient.factor2?.toString() };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.gradient !== this.props.gradient) {
            nextState.gradient = nextProps.gradient.gradient;
            nextState.factor1 = nextProps.gradient.factor1.toString();
            nextState.factor2 = nextProps.gradient.factor2?.toString();
        }
        return true;
    }
    updateFactor1(valueString) {
        if (/[^0-9.-]/g.test(valueString)) {
            return;
        }
        const valueAsNumber = parseFloat(valueString);
        this.setState({ factor1: valueString });
        if (isNaN(valueAsNumber)) {
            return;
        }
        this.props.gradient.factor1 = valueAsNumber;
        this.props.onUpdateGradient();
        this.forceUpdate();
    }
    updateFactor2(valueString) {
        if (/[^0-9.-]/g.test(valueString)) {
            return;
        }
        const valueAsNumber = parseFloat(valueString);
        this.setState({ factor2: valueString });
        if (isNaN(valueAsNumber)) {
            return;
        }
        this.props.gradient.factor2 = valueAsNumber;
        this.props.onUpdateGradient();
        this.forceUpdate();
    }
    updateGradient(gradient) {
        this.props.gradient.gradient = gradient;
        this.setState({ gradient: gradient });
        this.props.onUpdateGradient();
    }
    onPointerUp() {
        this.props.onCheckForReOrder();
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
        const gradient = this.props.gradient;
        return (_jsxs("div", { className: "gradient-step", children: [_jsx("div", { className: "step", children: `#${this.props.lineIndex}` }), _jsx("div", { className: "factor1", children: _jsx("input", { type: "number", step: "0.01", className: "numeric-input", value: this.state.factor1, onBlur: () => this.unlock(), onFocus: () => this.lock(), onChange: (evt) => this.updateFactor1(evt.target.value) }) }), this.props.host instanceof ParticleSystem && (_jsx("div", { className: "factor2", children: _jsx("input", { type: "number", step: "0.01", className: "numeric-input" + (this.state.factor1 === this.state.factor2 || gradient.factor2 === undefined ? " grayed" : ""), value: this.state.factor2, onBlur: () => this.unlock(), onFocus: () => this.lock(), onChange: (evt) => this.updateFactor2(evt.target.value) }) })), _jsx("div", { className: "step-value", children: gradient.gradient.toFixed(2) }), _jsx("div", { className: "step-slider", children: _jsx("input", { className: "range", type: "range", step: 0.01, min: 0, max: 1.0, value: gradient.gradient, onPointerUp: () => this.onPointerUp(), onChange: (evt) => this.updateGradient(parseFloat(evt.target.value)) }) }), _jsx("div", { className: "gradient-delete hoverIcon", onClick: () => this.props.onDelete(), children: _jsx(FontAwesomeIcon, { icon: faTrash }) })] }));
    }
}
//# sourceMappingURL=factorGradientStepGridComponent.js.map