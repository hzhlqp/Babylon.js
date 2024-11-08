import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
/**
 * Component that displays the mass properties of a physics body.
 * @param props the component props
 * @returns the component
 */
export function PhysicsMassPropertiesGridComponent(props) {
    const massProperties = props.body.getMassProperties(props.instanceIndex);
    const changeMass = (value) => {
        massProperties.mass = value;
        props.body.setMassProperties(massProperties, props.instanceIndex);
    };
    return (_jsx(_Fragment, { children: _jsx(FloatLineComponent, { lockObject: props.lockObject, label: "Mass", target: massProperties, propertyName: "mass", onPropertyChangedObservable: props.onPropertyChangedObservable, onChange: changeMass }) }));
}
//# sourceMappingURL=physicsMassPropertiesGridComponent.js.map