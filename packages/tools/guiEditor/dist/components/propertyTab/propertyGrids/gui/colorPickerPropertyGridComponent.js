import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import fillColorIcon from "shared-ui-components/imgs/fillColorIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
export class ColorPickerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const colorPickers = this.props.colorPickers;
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: colorPickers, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "COLOR PICKER", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fillColorIcon, label: "Color Picker Value" }), _jsx(ColorLine, { label: "", target: makeTargetsProxy(colorPickers, this.props.onPropertyChangedObservable), propertyName: "value", disableAlpha: true, lockObject: this.props.lockObject })] })] }));
    }
}
//# sourceMappingURL=colorPickerPropertyGridComponent.js.map