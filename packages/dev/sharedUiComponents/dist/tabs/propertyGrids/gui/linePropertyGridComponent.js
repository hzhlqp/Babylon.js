import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
export class LinePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onDashChange(value) {
        const line = this.props.line;
        const split = value.split(",");
        line.dash = [];
        split.forEach((v) => {
            const int = parseInt(v);
            if (isNaN(int)) {
                return;
            }
            line.dash.push(int);
        });
    }
    render() {
        const line = this.props.line;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: line, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "LINE", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Line width", target: line, propertyName: "lineWidth", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "X1", target: line, propertyName: "x1", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Y1", target: line, propertyName: "y1", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "X2", target: line, propertyName: "x2", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Y2", target: line, propertyName: "y2", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Dash pattern", target: line, value: line.dash.join(","), onChange: (newValue) => this.onDashChange(newValue) })] })] }));
    }
}
//# sourceMappingURL=linePropertyGridComponent.js.map