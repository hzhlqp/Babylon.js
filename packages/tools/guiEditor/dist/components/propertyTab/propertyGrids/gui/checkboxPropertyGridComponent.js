import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import checkBoxIconDark from "shared-ui-components/imgs/checkboxIconDark.svg";
import sizeIcon from "shared-ui-components/imgs/sizeIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class CheckboxPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const checkboxes = this.props.checkboxes;
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: checkboxes, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "CHECKBOX", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: sizeIcon, label: "Check Size Ratio" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: " ", target: makeTargetsProxy(checkboxes, this.props.onPropertyChangedObservable), propertyName: "checkSizeRatio", min: 0, max: 1, arrows: true, step: "0.01", digits: 2 })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: checkBoxIconDark, label: "Is Checkbox Checked" }), _jsx(CheckBoxLineComponent, { label: "CHECKED", target: makeTargetsProxy(checkboxes, this.props.onPropertyChangedObservable), propertyName: "isChecked", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Thickness" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, target: makeTargetsProxy(checkboxes, this.props.onPropertyChangedObservable), propertyName: "thickness", label: "", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] })] }));
    }
}
//# sourceMappingURL=checkboxPropertyGridComponent.js.map