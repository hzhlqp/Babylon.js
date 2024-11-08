import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import linePoint1Icon from "shared-ui-components/imgs/linePoint1Icon.svg";
import linePoint2Icon from "shared-ui-components/imgs/linePoint2Icon.svg";
import lineDashIcon from "shared-ui-components/imgs/lineDashIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class LinePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onDashChange(value) {
        const split = value.split(",");
        for (const line of this.props.lines) {
            line.dash = [];
            split.forEach((v) => {
                const int = parseInt(v);
                if (isNaN(int)) {
                    return;
                }
                line.dash.push(int);
            });
        }
        this.forceUpdate();
    }
    render() {
        const { lines, onPropertyChangedObservable, lockObject } = this.props;
        const proxy = makeTargetsProxy(lines, onPropertyChangedObservable);
        let dashes = lines[0].dash;
        for (const line of lines) {
            if (dashes.length === 0)
                break;
            if (line.dash.length !== dashes.length) {
                dashes = [];
            }
            dashes.forEach((dash, index) => {
                if (line.dash[index] !== dash) {
                    dashes = [];
                }
            });
        }
        const dashString = dashes.join(",");
        return (_jsxs("div", { className: "pane", children: [_jsx(TextLineComponent, { label: "LINE", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: linePoint1Icon, label: "Position 1" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "X", target: proxy, propertyName: "x1" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "Y", target: proxy, propertyName: "y1" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: linePoint2Icon, label: "Position 2" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "X", target: proxy, propertyName: "x2" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "Y", target: proxy, propertyName: "y2" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Line Width" }), _jsx(FloatLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "lineWidth", unit: _jsx(UnitButton, { unit: "PX", locked: true }), min: 0, arrows: true })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: lineDashIcon, label: "Dash Pattern" }), _jsx(TextInputLineComponent, { lockObject: lockObject, label: "", target: proxy, value: dashString, onChange: (newValue) => this.onDashChange(newValue) })] }), _jsx("hr", {}), _jsx(CommonControlPropertyGridComponent, { hideDimensions: true, lockObject: lockObject, controls: lines, onPropertyChangedObservable: onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState })] }));
    }
}
//# sourceMappingURL=linePropertyGridComponent.js.map