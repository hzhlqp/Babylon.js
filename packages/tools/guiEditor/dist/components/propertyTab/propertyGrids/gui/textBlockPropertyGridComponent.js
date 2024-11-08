import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import fillColorIcon from "shared-ui-components/imgs/fillColorIcon.svg";
import fontFamilyIcon from "shared-ui-components/imgs/fontFamilyIcon.svg";
import strokeWeightIcon from "shared-ui-components/imgs/strokeWeightIcon.svg";
import resizeToFitIcon from "shared-ui-components/imgs/resizeToFitIcon.svg";
import wordWrapIcon from "shared-ui-components/imgs/wordWrapIcon.svg";
import lineSpacingIcon from "shared-ui-components/imgs/LineSpacingIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class TextBlockPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onPropertyChangedObservable } = this.props;
        const textBlocks = this.props.textBlocks;
        const proxy = makeTargetsProxy(textBlocks, onPropertyChangedObservable);
        const wrappingOptions = [
            { label: "Clip", value: 0 /* TextWrapping.Clip */ },
            { label: "Ellipsis", value: 2 /* TextWrapping.Ellipsis */ },
            { label: "Word wrap", value: 1 /* TextWrapping.WordWrap */ },
        ];
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: textBlocks, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "TEXTBLOCK", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fontFamilyIcon, label: "Text" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "text" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: resizeToFitIcon, label: "Automatically resize the text block to fit the size of the text" }), _jsx(CheckBoxLineComponent, { label: "RESIZE TO FIT", target: proxy, propertyName: "resizeToFit" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: wordWrapIcon, label: "Text Wrapping" }), _jsx(OptionsLine, { label: " ", options: wrappingOptions, target: proxy, propertyName: "textWrapping" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: lineSpacingIcon, label: "Line Spacing" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "lineSpacing" })] }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "OUTLINE", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: strokeWeightIcon, label: "Outline Width" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "outlineWidth", arrows: true, min: 0, unit: _jsx(UnitButton, { unit: "PX", locked: true }), step: "0.01" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fillColorIcon, label: "Outline Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "outlineColor" })] })] }));
    }
}
//# sourceMappingURL=textBlockPropertyGridComponent.js.map