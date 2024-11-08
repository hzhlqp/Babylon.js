import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
/**
 * Property grid component for the SkyMaterial
 */
export class SkyMaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    renderSky() {
        const material = this.props.material;
        const sliderProps = [
            {
                label: "Azimuth",
                property: "azimuth",
                minimum: 0,
                maximum: Math.PI * 2,
                step: 0.001,
            },
            {
                label: "Inclination",
                property: "inclination",
                minimum: 0,
                maximum: Math.PI / 2,
                step: 0.001,
            },
            {
                label: "Turbidity",
                property: "turbidity",
                minimum: 0,
                maximum: 100,
                step: 0.1,
            },
            {
                label: "Luminance",
                property: "luminance",
                minimum: 0,
                maximum: 1,
                step: 0.001,
            },
            {
                label: "Rayleigh",
                property: "rayleigh",
                minimum: 0,
                maximum: 4,
                step: 0.001,
            },
            {
                label: "mieDirectionalG",
                property: "mieDirectionalG",
                minimum: 0,
                maximum: 1,
                step: 0.001,
            },
            {
                label: "mieCoefficient",
                property: "mieCoefficient",
                minimum: 0,
                maximum: 1,
                step: 0.001,
            },
            {
                label: "Distance",
                property: "distance",
                minimum: 0,
                maximum: 1000,
                step: 0.1,
            },
        ];
        const vector3Props = [
            {
                label: "Sun pos",
                property: "sunPosition",
            },
            {
                label: "Camera offset",
                property: "cameraOffset",
            },
        ];
        return (_jsxs(LineContainerComponent, { title: "SKY", selection: this.props.globalState, children: [sliderProps.map((prop) => (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: prop.label, target: material, propertyName: prop.property, minimum: prop.minimum, maximum: prop.maximum, step: prop.step, onPropertyChangedObservable: this.props.onPropertyChangedObservable }))), _jsx(CheckBoxLineComponent, { label: "Use sun pos", target: material, propertyName: "useSunPosition", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), vector3Props.map((prop) => (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: prop.label, target: material, propertyName: prop.property, onPropertyChangedObservable: this.props.onPropertyChangedObservable })))] }));
    }
    render() {
        const material = this.props.material;
        return (_jsxs(_Fragment, { children: [_jsx(CommonMaterialPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, material: material, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), this.renderSky()] }));
    }
}
//# sourceMappingURL=skyMaterialPropertyGridComponent.js.map