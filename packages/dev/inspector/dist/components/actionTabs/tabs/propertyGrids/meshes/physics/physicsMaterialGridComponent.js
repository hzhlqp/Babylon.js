import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
/**
 * Component that displays the physic material properties of a physics body.
 * @param props the component props
 * @returns the component
 */
export function PhysicsMaterialGridComponent(props) {
    const material = props.body.shape?.material;
    return (_jsxs(_Fragment, { children: [_jsx(FloatLineComponent, { lockObject: props.lockObject, label: "Dynamic Friction", target: material, propertyName: "friction", onPropertyChangedObservable: props.onPropertyChangedObservable, disabled: true }), _jsx(FloatLineComponent, { lockObject: props.lockObject, label: "Restitution", target: material, propertyName: "restitution", onPropertyChangedObservable: props.onPropertyChangedObservable, disabled: true }), _jsx(FloatLineComponent, { lockObject: props.lockObject, label: "Static Friction", target: material, propertyName: "staticFriction", onPropertyChangedObservable: props.onPropertyChangedObservable, disabled: true })] }));
}
//# sourceMappingURL=physicsMaterialGridComponent.js.map