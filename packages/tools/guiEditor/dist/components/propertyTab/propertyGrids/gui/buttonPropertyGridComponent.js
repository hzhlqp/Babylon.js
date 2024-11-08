import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
import { CommandButtonComponent } from "../../../commandButtonComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import { ContainerPropertyGridComponent } from "./containerPropertyGridComponent";
import cornerRadiusIcon from "shared-ui-components/imgs/conerRadiusIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import addImageButtonIcon from "shared-ui-components/imgs/addImageButtonIcon.svg";
import addTextButtonIcon from "shared-ui-components/imgs/addTextButtonIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
export class ButtonPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { rectangles, lockObject, onPropertyChangedObservable, onAddComponent } = this.props;
        const proxy = makeTargetsProxy(rectangles, onPropertyChangedObservable);
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: lockObject, controls: rectangles, onPropertyChangedObservable: onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "BUTTON", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(CommandButtonComponent, { tooltip: "Add TextBlock", icon: addTextButtonIcon, shortcut: "", isActive: false, onClick: () => {
                                onAddComponent("Text");
                            } }), _jsx(CommandButtonComponent, { tooltip: "Add Image", icon: addImageButtonIcon, shortcut: "", isActive: false, onClick: () => {
                                onAddComponent("ButtonImage");
                            } })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Stroke Weight" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "thickness", unit: _jsx(UnitButton, { unit: "PX", locked: true }), min: 0, digits: 2 })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cornerRadiusIcon, label: "Corner Radius" }), _jsx(FloatLineComponent, { lockObject: lockObject, label: "", target: proxy, propertyName: "cornerRadius", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, min: 0, digits: 2 })] }), _jsx(ContainerPropertyGridComponent, { containers: rectangles, onPropertyChangedObservable: onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=buttonPropertyGridComponent.js.map