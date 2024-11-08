import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { PhysicsMassPropertiesGridComponent } from "./physicsMassPropertiesGridComponent";
import { PhysicsMaterialGridComponent } from "./physicsMaterialGridComponent";
import { useState } from "react";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
/**
 * Component that allows displaying and tweaking a physics body's properties.
 * @param props the component props
 * @returns the component
 */
export function PhysicsBodyGridComponent(props) {
    const numInstances = props.body._pluginDataInstances?.length ?? 0;
    const [selectedInstance, setSelectedInstance] = useState({ selected: 0 });
    const onChangeSelectedInstance = (value) => {
        setSelectedInstance({ selected: value });
    };
    return (_jsxs(LineContainerComponent, { title: "PHYSICS", closed: true, selection: props.globalState, children: [numInstances > 0 && (_jsx(FloatLineComponent, { label: "Selected instance", lockObject: props.lockObject, target: selectedInstance, propertyName: "selected", onChange: onChangeSelectedInstance, min: 0, max: numInstances - 1, isInteger: true })), _jsx(PhysicsMassPropertiesGridComponent, { lockObject: props.lockObject, onPropertyChangedObservable: props.onPropertyChangedObservable, body: props.body, globalState: props.globalState, instanceIndex: selectedInstance.selected }), _jsx(PhysicsMaterialGridComponent, { lockObject: props.lockObject, onPropertyChangedObservable: props.onPropertyChangedObservable, body: props.body, globalState: props.globalState }), _jsx(TextLineComponent, { label: "Motion Type", value: _convertPhysicsMotionTypeToString(props.body.motionType) }), _jsx(TextLineComponent, { label: "Shape Type", value: _convertPhysicsShapeTypeToString(props.body.shape?.type) })] }));
}
function _convertPhysicsMotionTypeToString(type) {
    switch (type) {
        case 2 /* PhysicsMotionType.DYNAMIC */:
            return "Dynamic";
        case 0 /* PhysicsMotionType.STATIC */:
            return "Static";
        case 1 /* PhysicsMotionType.ANIMATED */:
            return "Animated";
        default:
            return "Unknown";
    }
}
function _convertPhysicsShapeTypeToString(type) {
    switch (type) {
        case 3 /* PhysicsShapeType.BOX */:
            return "Box";
        case 0 /* PhysicsShapeType.SPHERE */:
            return "Sphere";
        case 2 /* PhysicsShapeType.CYLINDER */:
            return "Cylinder";
        case 1 /* PhysicsShapeType.CAPSULE */:
            return "Capsule";
        case 5 /* PhysicsShapeType.CONTAINER */:
            return "Container";
        case 4 /* PhysicsShapeType.CONVEX_HULL */:
            return "Convex Hull";
        case 6 /* PhysicsShapeType.MESH */:
            return "Mesh";
        case 7 /* PhysicsShapeType.HEIGHTFIELD */:
            return "Heightfield";
        default:
            return "Unknown";
    }
}
//# sourceMappingURL=physicsBodyGridComponent.js.map