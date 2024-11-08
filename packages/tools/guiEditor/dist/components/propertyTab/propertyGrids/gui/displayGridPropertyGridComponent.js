import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import sizeIcon from "shared-ui-components/imgs/sizeIcon.svg";
import colorIcon from "shared-ui-components/imgs/colorIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import displayGridLine1Icon from "shared-ui-components/imgs/displayGridLine1Icon.svg";
import frequencyIcon from "shared-ui-components/imgs/frequencyIcon.svg";
import displayGridLine2Icon from "shared-ui-components/imgs/displayGridLine2Icon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class DisplayGridPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { displayGrids, lockObject, onPropertyChangedObservable } = this.props;
        const proxy = makeTargetsProxy(displayGrids, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: lockObject, controls: displayGrids, onPropertyChangedObservable: onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "DISPLAY GRID", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: sizeIcon, label: "Cell Size" }), _jsx(FloatLineComponent, { min: 1, isInteger: true, lockObject: lockObject, label: "W", target: proxy, propertyName: "cellWidth", onPropertyChangedObservable: onPropertyChangedObservable, unit: _jsx(UnitButton, { locked: true, unit: "PX" }), arrows: true }), _jsx(FloatLineComponent, { min: 1, isInteger: true, lockObject: lockObject, label: "H", target: proxy, propertyName: "cellHeight", onPropertyChangedObservable: onPropertyChangedObservable, unit: _jsx(UnitButton, { locked: true, unit: "PX" }), arrows: true })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: displayGridLine1Icon, label: "Show Minor Lines" }), _jsx(CheckBoxLineComponent, { label: "SHOW MINOR LINES", onValueChanged: () => this.forceUpdate(), target: proxy, propertyName: "_displayMinorLines" })] }), proxy._displayMinorLines && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Minor Line Tickness" }), _jsx(FloatLineComponent, { min: 1, isInteger: true, lockObject: lockObject, label: "", target: proxy, propertyName: "minorLineTickness", onPropertyChangedObservable: onPropertyChangedObservable, unit: _jsx(UnitButton, { locked: true, unit: "PX" }), arrows: true })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Minor Line Color" }), _jsx(ColorLine, { lockObject: lockObject, label: "", target: proxy, propertyName: "minorLineColor", onPropertyChangedObservable: onPropertyChangedObservable })] })] })), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: displayGridLine2Icon, label: "Show Major Lines" }), _jsx(CheckBoxLineComponent, { label: "SHOW MAJOR LINES", onValueChanged: () => this.forceUpdate(), target: proxy, propertyName: "_displayMajorLines" })] }), proxy._displayMajorLines && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Major Line Tickness" }), _jsx(FloatLineComponent, { min: 1, isInteger: true, lockObject: lockObject, label: "", target: proxy, propertyName: "majorLineTickness", onPropertyChangedObservable: onPropertyChangedObservable, unit: _jsx(UnitButton, { locked: true, unit: "PX" }), arrows: true })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Major Line Color" }), _jsx(ColorLine, { lockObject: lockObject, label: "", target: proxy, propertyName: "majorLineColor", onPropertyChangedObservable: onPropertyChangedObservable })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: frequencyIcon, label: "Major Line Frequency" }), _jsx(FloatLineComponent, { min: 1, isInteger: true, lockObject: lockObject, label: "", target: proxy, propertyName: "majorLineFrequency", onPropertyChangedObservable: onPropertyChangedObservable, arrows: true })] })] }))] }));
    }
}
//# sourceMappingURL=displayGridPropertyGridComponent.js.map