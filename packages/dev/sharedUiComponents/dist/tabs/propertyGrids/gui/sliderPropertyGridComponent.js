import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "./commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
export class SliderPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const slider = this.props.slider;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: slider, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "SLIDER", children: [_jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Border color", target: slider, propertyName: "borderColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Display thumb", target: slider, propertyName: "displayThumb", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Thumb circle", target: slider, propertyName: "isThumbCircle", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Vertical", target: slider, propertyName: "isVertical", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Thumb clamped", target: slider, propertyName: "isThumbClamped", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Bar offset", target: slider, propertyName: "barOffset", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Thumb width", target: slider, propertyName: "thumbWidth", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Minimum", target: slider, propertyName: "minimum", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Maximum", target: slider, propertyName: "maximum", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Value", target: slider, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=sliderPropertyGridComponent.js.map