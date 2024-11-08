import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import colorIcon from "shared-ui-components/imgs/colorIcon.svg";
import fillColorIcon from "shared-ui-components/imgs/fillColorIcon.svg";
import widthIcon from "shared-ui-components/imgs/widthIcon.svg"; // TODO: replace
import cornerRadiusIcon from "shared-ui-components/imgs/conerRadiusIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import scrollViewerPrecisionIcon from "shared-ui-components/imgs/scrollViewerPrecisionIcon.svg"; // TODO: replace
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class ScrollViewerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { scrollViewers, onPropertyChangedObservable, lockObject } = this.props;
        const proxy = makeTargetsProxy(scrollViewers, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: lockObject, controls: scrollViewers, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "SCROLLVIEWER", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: scrollViewerPrecisionIcon, label: "Wheel Precision" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "wheelPrecision", arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: widthIcon, label: "Bar Size" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "barSize", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "e-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Bar Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "barColor" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fillColorIcon, label: "Bar Background Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "barBackground" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Stroke Weight" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "thickness", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cornerRadiusIcon, label: "Corner Radius" }), _jsx(FloatLineComponent, { lockObject: lockObject, label: "", target: makeTargetsProxy(scrollViewers, onPropertyChangedObservable), propertyName: "cornerRadius", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] })] }));
    }
}
//# sourceMappingURL=scrollViewerPropertyGridComponent.js.map