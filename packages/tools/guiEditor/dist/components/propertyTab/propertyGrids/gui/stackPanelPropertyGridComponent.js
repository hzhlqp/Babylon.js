import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { StackPanel } from "gui/2D/controls/stackPanel";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import { ContainerPropertyGridComponent } from "./containerPropertyGridComponent";
import alignVerticalIcon from "shared-ui-components/imgs/alignVerticalIcon.svg";
import stackPanelSpacingIcon from "shared-ui-components/imgs/stackPanelSpacingIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { ValueAndUnit } from "gui/2D/valueAndUnit";
import { CoordinateHelper } from "../../../../diagram/coordinateHelper";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class StackPanelPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { stackPanels, lockObject, onPropertyChangedObservable } = this.props;
        const proxy = makeTargetsProxy(stackPanels, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: lockObject, controls: stackPanels, onPropertyChangedObservable: onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "STACKPANEL", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: alignVerticalIcon, label: "Determines if children are stacked horizontally or vertically" }), _jsx(CheckBoxLineComponent, { label: proxy.isVertical ? "ALIGNMENT: VERTICAL" : "ALIGNMENT: HORIZONTAL", target: proxy, propertyName: "isVertical", onValueChanged: () => {
                                for (const panel of stackPanels) {
                                    for (const child of panel.children) {
                                        if (proxy.isVertical) {
                                            child.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_CENTER;
                                            child._left.value = 0;
                                            if (child._height.unit === ValueAndUnit.UNITMODE_PERCENTAGE) {
                                                CoordinateHelper.ConvertToPixels(child, ["height"]);
                                            }
                                        }
                                        else {
                                            child.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_CENTER;
                                            child._top.value = 0;
                                            if (child._width.unit === ValueAndUnit.UNITMODE_PERCENTAGE) {
                                                CoordinateHelper.ConvertToPixels(child, ["width"]);
                                            }
                                        }
                                    }
                                }
                                this.forceUpdate();
                            } })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: stackPanelSpacingIcon, label: "Spacing between children" }), _jsx(FloatLineComponent, { lockObject: lockObject, label: " ", target: proxy, propertyName: "spacing", onChange: () => stackPanels.forEach((panel) => panel._markAsDirty()), unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0 })] }), _jsx(ContainerPropertyGridComponent, { containers: stackPanels, onPropertyChangedObservable: onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=stackPanelPropertyGridComponent.js.map