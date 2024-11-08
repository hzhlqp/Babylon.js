import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class RadioButtonLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSelected: this.props.isSelected() };
    }
    componentDidMount() {
        this._onSelectionChangedObserver = this.props.onSelectionChangedObservable.add((value) => {
            this.setState({ isSelected: value === this });
        });
    }
    componentWillUnmount() {
        if (this._onSelectionChangedObserver) {
            this.props.onSelectionChangedObservable.remove(this._onSelectionChangedObserver);
            this._onSelectionChangedObserver = null;
        }
    }
    onChange() {
        this.props.onSelect();
        this.props.onSelectionChangedObservable.notifyObservers(this);
    }
    render() {
        return (_jsxs("div", { className: "radioLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("div", { className: "label", title: this.props.label, children: this.props.label }), _jsxs("div", { className: "radioContainer", children: [_jsx("input", { id: this.props.label, className: "radio", type: "radio", checked: this.state.isSelected, onChange: () => this.onChange() }), _jsx("label", { htmlFor: this.props.label, className: "labelForRadio" })] })] }));
    }
}
//# sourceMappingURL=radioLineComponent.js.map