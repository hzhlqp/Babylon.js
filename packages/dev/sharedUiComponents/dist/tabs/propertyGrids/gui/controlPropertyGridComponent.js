import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
export class ControlPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const control = this.props.control;
        return _jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: control, onPropertyChangedObservable: this.props.onPropertyChangedObservable });
    }
}
//# sourceMappingURL=controlPropertyGridComponent.js.map