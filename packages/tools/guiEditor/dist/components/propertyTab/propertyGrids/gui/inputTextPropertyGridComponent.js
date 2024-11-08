import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import fillColorIcon from "shared-ui-components/imgs/fillColorIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import widthIcon from "shared-ui-components/imgs/widthIcon.svg";
import alphaIcon from "shared-ui-components/imgs/alphaIcon.svg";
import colorIcon from "shared-ui-components/imgs/colorIcon.svg";
import textIcon from "shared-ui-components/imgs/textIcon.svg";
import textInputIcon from "shared-ui-components/imgs/textInputIcon.svg";
import autoStretchWidthIcon from "shared-ui-components/imgs/autoStretchWidthIcon.svg";
import marginsIcon from "shared-ui-components/imgs/marginsIcon.svg";
import selectAllIcon from "shared-ui-components/imgs/selectAllIcon.svg";
import highlightIcon from "shared-ui-components/imgs/highlightIcon.svg";
import textPlaceholderIcon from "shared-ui-components/imgs/textPlaceholderIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class InputTextPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { inputTexts, onPropertyChangedObservable, lockObject } = this.props;
        const proxy = makeTargetsProxy(inputTexts, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: lockObject, controls: inputTexts, onPropertyChangedObservable: onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "INPUT TEXT", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: textIcon, label: "Text" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "text" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: textInputIcon, label: "Prompt Text" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "promptMessage" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: widthIcon, label: "Max Width" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "maxWidth" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: marginsIcon, label: "Margins" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "margin" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Border Thickness" }), _jsx(FloatLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "thickness", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: autoStretchWidthIcon, label: "Automatically Stretch Width" }), _jsx(CheckBoxLineComponent, { label: "AUTO STRETCH", target: proxy, propertyName: "autoStretchWidth" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: selectAllIcon, label: "When Input is Focus, Select All" }), _jsx(CheckBoxLineComponent, { label: "ON FOCUS, SELECT ALL", target: proxy, propertyName: "onFocusSelectAll" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: highlightIcon, label: "Highlight Color" }), _jsx(ColorLine, { lockObject: lockObject, label: "", target: proxy, propertyName: "textHighlightColor" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: alphaIcon, label: "Highlight Opacity" }), _jsx(SliderLineComponent, { lockObject: lockObject, label: "", minimum: 0, maximum: 1, step: 0.01, target: proxy, propertyName: "highligherOpacity" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fillColorIcon, label: "Background Color when Focused" }), _jsx(ColorLine, { lockObject: lockObject, label: "", target: proxy, propertyName: "focusedBackground" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: textPlaceholderIcon, label: "Placeholder Text" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "placeholderText" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Placeholder Color" }), _jsx(ColorLine, { lockObject: lockObject, label: "", target: proxy, propertyName: "placeholderColor" })] })] }));
    }
}
//# sourceMappingURL=inputTextPropertyGridComponent.js.map