import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import checkboxIcon from "shared-ui-components/imgs/checkboxIconDark.svg";
import scaleIcon from "shared-ui-components/imgs/scaleIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class RadioButtonPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const radioButtons = this.props.radioButtons;
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: radioButtons, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "RADIO BUTTON", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Stroke Weight" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "thickness", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: scaleIcon, label: "Check Size Ratio" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "checkSizeRatio", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Name of Group" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "group" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: checkboxIcon, label: "Is Checked" }), _jsx(CheckBoxLineComponent, { label: "CHECKED", target: makeTargetsProxy(radioButtons, this.props.onPropertyChangedObservable), propertyName: "isChecked" })] })] }));
    }
}
//# sourceMappingURL=radioButtonPropertyGridComponent.js.map