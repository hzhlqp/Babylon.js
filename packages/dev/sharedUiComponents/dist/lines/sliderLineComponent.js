import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { copyCommandToClipboard, getClassNameWithNamespace } from "../copyCommandToClipboard";
import { Tools } from "core/Misc/tools";
import { FloatLineComponent } from "./floatLineComponent";
import copyIcon from "../imgs/copy.svg";
export class SliderLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        if (this.props.directValue !== undefined) {
            this.state = {
                value: this.props.directValue,
            };
        }
        else {
            let value = this.props.target[this.props.propertyName];
            if (value === undefined) {
                value = this.props.maximum;
            }
            this.state = { value: value };
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.directValue !== undefined) {
            nextState.value = nextProps.directValue;
            return true;
        }
        if (nextProps.label !== this.props.label) {
            return true;
        }
        let currentState = nextProps.target[nextProps.propertyName];
        if (currentState === undefined) {
            currentState = nextProps.maximum;
        }
        if (currentState !== nextState.value || this._localChange || nextProps.maximum !== this.props.maximum || nextProps.minimum !== this.props.minimum) {
            nextState.value = currentState;
            this._localChange = false;
            return true;
        }
        if (nextProps.unit !== this.props.unit) {
            return true;
        }
        return false;
    }
    onChange(newValueString) {
        if (newValueString === "—")
            return;
        this._localChange = true;
        let newValue = parseFloat(newValueString);
        if (this.props.useEuler) {
            newValue = Tools.ToRadians(newValue);
        }
        if (this.props.target) {
            if (this.props.onPropertyChangedObservable) {
                this.props.onPropertyChangedObservable.notifyObservers({
                    object: this.props.target,
                    property: this.props.propertyName,
                    value: newValue,
                    initialValue: this.state.value,
                });
            }
            this.props.target[this.props.propertyName] = newValue;
        }
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
        this.setState({ value: newValue });
    }
    onInput(newValueString) {
        const newValue = parseFloat(newValueString);
        if (this.props.onInput) {
            this.props.onInput(newValue);
        }
    }
    prepareDataToRead(value) {
        if (value === null) {
            value = 0;
        }
        if (this.props.useEuler) {
            return Tools.ToDegrees(value);
        }
        return value;
    }
    // Copy to clipboard the code this slider actually does
    // Example : ImageProcessingConfiguration.contrast = 1;
    onCopyClick() {
        if (this.props && this.props.target) {
            const { className, babylonNamespace } = getClassNameWithNamespace(this.props.target);
            const targetName = "globalThis.debugNode";
            const targetProperty = this.props.propertyName;
            const value = this.props.target[this.props.propertyName];
            const strCommand = targetName + "." + targetProperty + " = " + value + ";// (debugNode as " + babylonNamespace + className + ")";
            copyCommandToClipboard(strCommand);
        }
        else {
            copyCommandToClipboard("undefined");
        }
    }
    render() {
        return (_jsxs("div", { className: "sliderLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), (!this.props.icon || this.props.label != "") && (_jsx("div", { className: this.props.margin ? "label withMargins" : "label", title: this.props.label, children: this.props.label })), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, isInteger: this.props.decimalCount === 0, smallUI: true, label: "", target: this.state, digits: this.props.decimalCount === undefined ? 4 : this.props.decimalCount, propertyName: "value", min: this.props.allowOverflow ? undefined : this.props.minimum, max: this.props.allowOverflow ? undefined : this.props.maximum, onEnter: () => {
                        const changed = this.prepareDataToRead(this.state.value);
                        this.onChange(changed);
                    }, onChange: () => {
                        const changed = this.prepareDataToRead(this.state.value);
                        this.onChange(changed);
                    }, onPropertyChangedObservable: this.props.onPropertyChangedObservable, unit: this.props.unit }), _jsx("div", { className: "slider", children: _jsx("input", { className: "range" + (this.props.allowOverflow && (this.state.value > this.props.maximum || this.state.value < this.props.minimum) ? " overflow" : ""), type: "range", step: this.props.step, min: this.prepareDataToRead(this.props.minimum), max: this.prepareDataToRead(this.props.maximum), value: this.prepareDataToRead(this.state.value), onInput: (evt) => this.onInput(evt.target.value), onChange: (evt) => this.onChange(evt.target.value) }) }), _jsx("div", { className: "copy hoverIcon", onClick: () => this.onCopyClick(), title: "Copy to clipboard", children: _jsx("img", { src: copyIcon, alt: "Copy" }) })] }));
    }
}
//# sourceMappingURL=sliderLineComponent.js.map