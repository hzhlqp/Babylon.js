import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { FloatLineComponent } from "../../../lines/floatLineComponent";
import { TextInputLineComponent } from "../../../lines/textInputLineComponent";
export class ScrollViewerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const scrollViewer = this.props.scrollViewer;
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: scrollViewer, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "RECTANGLE", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Thickness", target: scrollViewer, propertyName: "thickness", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Corner radius", target: scrollViewer, propertyName: "cornerRadius", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs(LineContainerComponent, { title: "SCROLLVIEWER", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Bar size", target: scrollViewer, propertyName: "barSize", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Bar color", target: scrollViewer, propertyName: "barColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Bar background", target: scrollViewer, propertyName: "barBackground", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Wheel precision", target: scrollViewer, propertyName: "wheelPrecision", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=scrollViewerPropertyGridComponent.js.map