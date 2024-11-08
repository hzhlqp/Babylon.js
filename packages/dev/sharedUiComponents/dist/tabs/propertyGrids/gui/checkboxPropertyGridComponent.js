import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
export class CheckboxPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const checkbox = this.props.checkbox;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: checkbox, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "CHECKBOX", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Check size ratio", target: checkbox, propertyName: "checkSizeRatio", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Checked", target: checkbox, propertyName: "isChecked", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=checkboxPropertyGridComponent.js.map