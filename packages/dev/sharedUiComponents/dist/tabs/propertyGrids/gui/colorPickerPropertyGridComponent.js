import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { Color3LineComponent } from "../../../lines/color3LineComponent";
export class ColorPickerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const colorPicker = this.props.colorPicker;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: colorPicker, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(LineContainerComponent, { title: "COLORPICKER", children: _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Color", target: colorPicker, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }) })] }));
    }
}
//# sourceMappingURL=colorPickerPropertyGridComponent.js.map