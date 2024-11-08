import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { QuaternionLineComponent } from "../../../lines/quaternionLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { AnimationGridComponent } from "../animations/animationPropertyGridComponent";
import { CommonPropertyGridComponent } from "../commonPropertyGridComponent";
import { VariantsPropertyGridComponent } from "../variantsPropertyGridComponent";
import { ParentPropertyGridComponent } from "../parentPropertyGridComponent";
export class TransformNodePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const transformNode = this.props.transformNode;
        return (_jsxs(_Fragment, { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: transformNode, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "ID", value: transformNode.id }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: transformNode, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Unique ID", value: transformNode.uniqueId.toString() }), _jsx(TextLineComponent, { label: "Class", value: transformNode.getClassName() }), _jsx(CheckBoxLineComponent, { label: "IsEnabled", isSelected: () => transformNode.isEnabled(), onSelect: (value) => transformNode.setEnabled(value) }), _jsx(ParentPropertyGridComponent, { globalState: this.props.globalState, node: transformNode, lockObject: this.props.lockObject }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => {
                                transformNode.dispose();
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                            } })] }), _jsx(CommonPropertyGridComponent, { host: transformNode, lockObject: this.props.lockObject, globalState: this.props.globalState }), _jsx(VariantsPropertyGridComponent, { host: transformNode, lockObject: this.props.lockObject, globalState: this.props.globalState }), _jsxs(LineContainerComponent, { title: "TRANSFORMATIONS", selection: this.props.globalState, children: [_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Position", target: transformNode, propertyName: "position", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), !transformNode.rotationQuaternion && (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Rotation", useEuler: this.props.globalState.onlyUseEulers, target: transformNode, propertyName: "rotation", step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable })), transformNode.rotationQuaternion && (_jsx(QuaternionLineComponent, { lockObject: this.props.lockObject, label: "Rotation", useEuler: this.props.globalState.onlyUseEulers, target: transformNode, propertyName: "rotationQuaternion", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Scaling", target: transformNode, propertyName: "scaling", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsx(AnimationGridComponent, { globalState: this.props.globalState, animatable: transformNode, scene: transformNode.getScene(), lockObject: this.props.lockObject })] }));
    }
}
//# sourceMappingURL=transformNodePropertyGridComponent.js.map