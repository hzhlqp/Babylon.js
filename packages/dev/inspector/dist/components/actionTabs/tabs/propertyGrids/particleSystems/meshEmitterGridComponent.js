import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { MeshPickerComponent } from "../../../lines/meshPickerComponent";
export class MeshEmitterGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const emitter = this.props.emitter;
        return (_jsxs(_Fragment, { children: [_jsx(MeshPickerComponent, { globalState: this.props.globalState, label: "Source", scene: this.props.scene, onPropertyChangedObservable: this.props.onPropertyChangedObservable, target: this.props.emitter, property: "mesh" }), !emitter.useMeshNormalsForDirection && (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction 1", target: emitter, propertyName: "direction1", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), !emitter.useMeshNormalsForDirection && (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction 2", target: emitter, propertyName: "direction2", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(CheckBoxLineComponent, { label: "Use normals for direction", target: emitter, propertyName: "useMeshNormalsForDirection", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=meshEmitterGridComponent.js.map