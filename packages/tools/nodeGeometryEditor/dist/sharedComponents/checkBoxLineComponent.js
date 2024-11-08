import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class CheckBoxLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        this._uniqueId = CheckBoxLineComponent._UniqueIdSeed++;
        if (this.props.isSelected) {
            this.state = { isSelected: this.props.isSelected() };
        }
        else {
            this.state = { isSelected: this.props.target[this.props.propertyName] == true };
        }
        if (this.props.disabled) {
            this.state = { ...this.state, isDisabled: this.props.disabled };
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        let currentState;
        if (nextProps.isSelected) {
            currentState = nextProps.isSelected();
        }
        else {
            currentState = nextProps.target[nextProps.propertyName] == true;
        }
        if (currentState !== nextState.isSelected || this._localChange) {
            nextState.isSelected = currentState;
            this._localChange = false;
            return true;
        }
        if (nextProps.disabled !== !!nextState.isDisabled) {
            return true;
        }
        return nextProps.label !== this.props.label || nextProps.target !== this.props.target;
    }
    onChange() {
        this._localChange = true;
        if (this.props.onSelect) {
            this.props.onSelect(!this.state.isSelected);
        }
        else {
            if (this.props.onPropertyChangedObservable) {
                this.props.onPropertyChangedObservable.notifyObservers({
                    object: this.props.target,
                    property: this.props.propertyName,
                    value: !this.state.isSelected,
                    initialValue: this.state.isSelected,
                });
            }
            this.props.target[this.props.propertyName] = !this.state.isSelected;
        }
        if (this.props.onValueChanged) {
            this.props.onValueChanged();
        }
        this.setState({ isSelected: !this.state.isSelected });
    }
    render() {
        return (_jsxs("div", { className: "checkBoxLine", children: [_jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsxs("div", { className: "checkBox", children: [_jsx("input", { type: "checkbox", id: "checkbox" + this._uniqueId, className: "cbx hidden", checked: this.state.isSelected, onChange: () => this.onChange(), disabled: !!this.props.disabled }), _jsx("label", { htmlFor: "checkbox" + this._uniqueId, className: `lbl${this.props.disabled ? " disabled" : ""}` })] })] }));
    }
}
CheckBoxLineComponent._UniqueIdSeed = 0;
//# sourceMappingURL=checkBoxLineComponent.js.map