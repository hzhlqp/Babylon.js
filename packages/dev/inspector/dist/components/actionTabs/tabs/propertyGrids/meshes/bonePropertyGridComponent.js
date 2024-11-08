import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { QuaternionLineComponent } from "../../../lines/quaternionLineComponent";
export class BonePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onTransformNodeLink() {
        if (!this.props.globalState.onSelectionChangedObservable) {
            return;
        }
        const node = this.props.bone.getTransformNode();
        this.props.globalState.onSelectionChangedObservable.notifyObservers(node);
    }
    render() {
        const bone = this.props.bone;
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Name", value: bone.name }), _jsx(TextLineComponent, { label: "Index", value: bone.getIndex().toString() }), _jsx(TextLineComponent, { label: "Unique ID", value: bone.uniqueId.toString() }), bone.getParent() && (_jsx(TextLineComponent, { label: "Parent", value: bone.getParent().name, onLink: () => this.props.globalState.onSelectionChangedObservable.notifyObservers(bone.getParent()) })), bone.getTransformNode() && _jsx(TextLineComponent, { label: "Linked node", value: bone.getTransformNode().name, onLink: () => this.onTransformNodeLink() })] }), _jsxs(LineContainerComponent, { title: "TRANSFORMATIONS", selection: this.props.globalState, children: [_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Position", target: bone, propertyName: "position", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), !bone.rotationQuaternion && (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Rotation", useEuler: this.props.globalState.onlyUseEulers, target: bone, propertyName: "rotation", step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable })), bone.rotationQuaternion && (_jsx(QuaternionLineComponent, { lockObject: this.props.lockObject, label: "Rotation", useEuler: this.props.globalState.onlyUseEulers, target: bone, propertyName: "rotationQuaternion", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Scaling", target: bone, propertyName: "scaling", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=bonePropertyGridComponent.js.map