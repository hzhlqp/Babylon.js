import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { makeTargetsProxy } from "../../../lines/targetsProxy";
export class RadioButtonPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const radioButtons = this.props.radioButtons;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: radioButtons, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "RADIO BUTTON", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Thickness", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "thickness", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Check size ratio", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "checkSizeRatio", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Group", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "group", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Checked", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "isChecked", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=radioButtonPropertyGridComponent.js.map