import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { GizmoGeneric } from "./gizmoGeneric";
import { GizmoLine } from "./gizmoLine";
export class GizmoWrapper extends React.Component {
    componentWillMount() {
        this.observer = this.props.globalState.onSelectionChangedObservable.add(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.props.globalState.onSelectionChangedObservable.remove(this.observer);
    }
    render() {
        const controls = this.props.globalState.selectedControls;
        return (_jsx(_Fragment, { children: controls.map((control) => control.getClassName() === "Line" ? (_jsx(GizmoLine, { globalState: this.props.globalState, control: control }, control.uniqueId)) : (_jsx(GizmoGeneric, { globalState: this.props.globalState, control: control }, control.uniqueId))) }));
    }
}
//# sourceMappingURL=gizmoWrapper.js.map