import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { Control } from "gui/2D/controls/control";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
import { OptionsLine } from "../../../lines/optionsLineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
export class TextBlockPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const textBlock = this.props.textBlock;
        const horizontalOptions = [
            { label: "Left", value: Control.HORIZONTAL_ALIGNMENT_LEFT },
            { label: "Right", value: Control.HORIZONTAL_ALIGNMENT_RIGHT },
            { label: "Center", value: Control.HORIZONTAL_ALIGNMENT_CENTER },
        ];
        const verticalOptions = [
            { label: "Top", value: Control.VERTICAL_ALIGNMENT_TOP },
            { label: "Bottom", value: Control.VERTICAL_ALIGNMENT_BOTTOM },
            { label: "Center", value: Control.VERTICAL_ALIGNMENT_CENTER },
        ];
        const wrappingOptions = [
            { label: "Clip", value: 0 /* TextWrapping.Clip */ },
            { label: "Ellipsis", value: 2 /* TextWrapping.Ellipsis */ },
            { label: "Word wrap", value: 1 /* TextWrapping.WordWrap */ },
            { label: "Word wrap ellipsis", value: 3 /* TextWrapping.WordWrapEllipsis */ },
        ];
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: textBlock, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "TEXTBLOCK", children: [_jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Text", target: textBlock, propertyName: "text", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Horizontal text alignment", options: horizontalOptions, target: textBlock, propertyName: "textHorizontalAlignment", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Vertical text alignment", options: verticalOptions, target: textBlock, propertyName: "textVerticalAlignment", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Resize to fit", target: textBlock, propertyName: "resizeToFit", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Wrapping", options: wrappingOptions, target: textBlock, propertyName: "textWrapping", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Line spacing", target: textBlock, propertyName: "lineSpacing", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs(LineContainerComponent, { title: "OUTLINE", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Outline width", target: textBlock, propertyName: "outlineWidth", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Outline color", target: textBlock, propertyName: "outlineColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=textBlockPropertyGridComponent.js.map