import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
export class ControlPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const controls = this.props.controls;
        return (_jsx("div", { className: "pane", children: _jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: controls, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }) }));
    }
}
//# sourceMappingURL=controlPropertyGridComponent.js.map