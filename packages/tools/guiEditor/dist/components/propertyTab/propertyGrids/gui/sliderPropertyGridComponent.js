import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import colorIcon from "shared-ui-components/imgs/colorIcon.svg";
import verticalSliderIcon from "shared-ui-components/imgs/verticalSliderIcon.svg";
import sliderValueIcon from "shared-ui-components/imgs/sliderValueIcon.svg";
import sliderValueMaximumIcon from "shared-ui-components/imgs/sliderValueMaximumIcon.svg";
import sliderValueMinimumIcon from "shared-ui-components/imgs/sliderValueMinimumIcon.svg";
import widthIcon from "shared-ui-components/imgs/widthIcon.svg";
import clampSliderValueIcon from "shared-ui-components/imgs/clampSliderValueIcon.svg";
import showThumbIcon from "shared-ui-components/imgs/showThumbIcon.svg";
import barOffsetIcon from "shared-ui-components/imgs/barOffsetIcon.svg";
import thumbCircleIcon from "shared-ui-components/imgs/thumbCircleIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
export class SliderPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { sliders, onPropertyChangedObservable } = this.props;
        const proxy = makeTargetsProxy(sliders, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx("hr", {}), _jsx(TextLineComponent, { label: "SLIDER", value: " ", color: "grey" }), sliders.every((slider) => slider.typeName === "Slider") && (_jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Border Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "borderColor" })] })), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: verticalSliderIcon, label: "Vertical" }), _jsx(CheckBoxLineComponent, { label: "VERTICAL", target: proxy, propertyName: "isVertical" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: barOffsetIcon, label: "Bar Offset" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "barOffset" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: sliderValueMinimumIcon, label: "Minimum Value" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "minimum", arrows: true })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: sliderValueMaximumIcon, label: "Maximum Value" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "maximum", arrows: true })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: sliderValueIcon, label: "Initial Value" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "value", arrows: true })] }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "THUMB", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: showThumbIcon, label: "Display Thumb" }), _jsx(CheckBoxLineComponent, { label: "DISPLAY THUMB", target: proxy, propertyName: "displayThumb", onValueChanged: () => this.forceUpdate() })] }), proxy.displayThumb && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: thumbCircleIcon, label: "Thumb Circular" }), _jsx(CheckBoxLineComponent, { label: "CIRCULAR", target: proxy, propertyName: "isThumbCircle" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: clampSliderValueIcon, label: "Thumb Clamped to Edges" }), _jsx(CheckBoxLineComponent, { label: "CLAMPED", target: proxy, propertyName: "isThumbClamped" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: widthIcon, label: "Width" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "thumbWidth" })] })] }))] }));
    }
}
//# sourceMappingURL=sliderPropertyGridComponent.js.map