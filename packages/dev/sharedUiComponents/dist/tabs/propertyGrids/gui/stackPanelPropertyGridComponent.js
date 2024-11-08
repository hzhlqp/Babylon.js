import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
export class StackPanelPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const stackPanel = this.props.stackPanel;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: stackPanel, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "STACKPANEL", children: [_jsx(CheckBoxLineComponent, { label: "Clip children", target: stackPanel, propertyName: "clipChildren", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Vertical", target: stackPanel, propertyName: "isVertical", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=stackPanelPropertyGridComponent.js.map