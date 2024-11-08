import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
export class RectanglePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const rectangle = this.props.rectangle;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: rectangle, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "RECTANGLE", children: [_jsx(CheckBoxLineComponent, { label: "Clip children", target: rectangle, propertyName: "clipChildren", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Thickness", target: rectangle, propertyName: "thickness", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Corner radius", target: rectangle, propertyName: "cornerRadius", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=rectanglePropertyGridComponent.js.map