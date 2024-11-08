import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Vector3 } from "core/Maths/math.vector";
import { NumericInput } from "../lines/numericInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { copyCommandToClipboard, getClassNameWithNamespace } from "../copyCommandToClipboard";
import { SliderLineComponent } from "../lines/sliderLineComponent";
import { Tools } from "core/Misc/tools";
import copyIcon from "../imgs/copy.svg";
export class Vector3LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        const value = this.getCurrentValue();
        this.state = { isExpanded: false, value: value && value.clone ? value.clone() : Vector3.Zero() };
    }
    getCurrentValue() {
        return this.props.target[this.props.propertyName];
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
    updateVector3() {
        const store = this.props.target[this.props.propertyName].clone();
        this.props.target[this.props.propertyName] = this.state.value;
        this.setState({ value: store });
        this.raiseOnPropertyChanged(store);
    }
    updateStateX(value) {
        this._localChange = true;
        this.state.value.x = value;
        this.updateVector3();
    }
    updateStateY(value) {
        this._localChange = true;
        this.state.value.y = value;
        this.updateVector3();
    }
    updateStateZ(value) {
        this._localChange = true;
        this.state.value.z = value;
        this.updateVector3();
    }
    // Copy to clipboard the code this Vector3 actually does
    // Example : Mesh.position = new BABYLON.Vector3(0, 1, 0);
    onCopyClick() {
        if (this.props && this.props.target) {
            const { className, babylonNamespace } = getClassNameWithNamespace(this.props.target);
            const targetName = "globalThis.debugNode";
            const targetProperty = this.props.propertyName;
            const value = this.props.target[this.props.propertyName];
            const strVector = "new " + babylonNamespace + "Vector3(" + value.x + ", " + value.y + ", " + value.z + ")";
            const strCommand = targetName + "." + targetProperty + " = " + strVector + ";// (debugNode as " + babylonNamespace + className + ")";
            copyCommandToClipboard(strCommand);
        }
        else {
            copyCommandToClipboard("undefined");
        }
    }
    render() {
        const chevron = this.state.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        return (_jsxs("div", { className: "vector3Line", children: [_jsxs("div", { className: "firstLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsxs("div", { className: "vector", children: [!this.props.useEuler && `X: ${this.state.value.x.toFixed(2)}, Y: ${this.state.value.y.toFixed(2)}, Z: ${this.state.value.z.toFixed(2)}`, this.props.useEuler &&
                                    `X: ${Tools.ToDegrees(this.state.value.x).toFixed(2)}, Y: ${Tools.ToDegrees(this.state.value.y).toFixed(2)}, Z: ${Tools.ToDegrees(this.state.value.z).toFixed(2)}`] }), _jsx("div", { className: "expand hoverIcon", onClick: () => this.switchExpandState(), title: "Expand", children: chevron }), _jsx("div", { className: "copy hoverIcon", onClick: () => this.onCopyClick(), title: "Copy to clipboard", children: _jsx("img", { src: copyIcon, alt: "Copy" }) })] }), this.state.isExpanded && !this.props.useEuler && (_jsxs("div", { className: "secondLine", children: [_jsx(NumericInput, { label: "x", lockObject: this.props.lockObject, step: this.props.step, value: this.state.value.x, onChange: (value) => this.updateStateX(value) }), _jsx(NumericInput, { label: "y", lockObject: this.props.lockObject, step: this.props.step, value: this.state.value.y, onChange: (value) => this.updateStateY(value) }), _jsx(NumericInput, { label: "z", lockObject: this.props.lockObject, step: this.props.step, value: this.state.value.z, onChange: (value) => this.updateStateZ(value) })] })), this.state.isExpanded && this.props.useEuler && !this.props.noSlider && (_jsxs("div", { className: "secondLine", children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, margin: true, label: "x", minimum: 0, maximum: 360, step: 0.1, directValue: Tools.ToDegrees(this.state.value.x), onChange: (value) => this.updateStateX(Tools.ToRadians(value)) }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, margin: true, label: "y", minimum: 0, maximum: 360, step: 0.1, directValue: Tools.ToDegrees(this.state.value.y), onChange: (value) => this.updateStateY(Tools.ToRadians(value)) }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, margin: true, label: "z", minimum: 0, maximum: 360, step: 0.1, directValue: Tools.ToDegrees(this.state.value.z), onChange: (value) => this.updateStateZ(Tools.ToRadians(value)) })] })), this.state.isExpanded && this.props.useEuler && this.props.noSlider && (_jsxs("div", { className: "secondLine", children: [_jsx(NumericInput, { lockObject: this.props.lockObject, label: "x", step: this.props.step, value: Tools.ToDegrees(this.state.value.x), onChange: (value) => this.updateStateX(Tools.ToRadians(value)) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "y", step: this.props.step, value: Tools.ToDegrees(this.state.value.y), onChange: (value) => this.updateStateY(Tools.ToRadians(value)) }), _jsx(NumericInput, { lockObject: this.props.lockObject, label: "z", step: this.props.step, value: Tools.ToDegrees(this.state.value.z), onChange: (value) => this.updateStateZ(Tools.ToRadians(value)) })] }))] }));
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
Vector3LineComponent.defaultProps = {
    step: 0.001, // cm
};
//# sourceMappingURL=vector3LineComponent.js.map