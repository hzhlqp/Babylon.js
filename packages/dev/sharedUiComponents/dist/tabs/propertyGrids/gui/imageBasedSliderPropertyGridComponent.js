import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
export class ImageBasedSliderPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const imageBasedSlider = this.props.imageBasedSlider;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: imageBasedSlider, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "IMAGE BASED SLIDER", children: [_jsx(CheckBoxLineComponent, { label: "Display thumb", target: imageBasedSlider, propertyName: "displayThumb", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Vertical", target: imageBasedSlider, propertyName: "isVertical", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Thumb clamped", target: imageBasedSlider, propertyName: "isThumbClamped", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Bar offset", target: imageBasedSlider, propertyName: "barOffset", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Thumb width", target: imageBasedSlider, propertyName: "thumbWidth", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Minimum", target: imageBasedSlider, propertyName: "minimum", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Maximum", target: imageBasedSlider, propertyName: "maximum", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Value", target: imageBasedSlider, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=imageBasedSliderPropertyGridComponent.js.map