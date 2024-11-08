import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonLightPropertyGridComponent } from "./commonLightPropertyGridComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { CommonShadowLightPropertyGridComponent } from "./commonShadowLightPropertyGridComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { CascadedShadowGenerator } from "core/Lights/Shadows/cascadedShadowGenerator";
import { DirectionalLightFrustumViewer } from "core/Debug/directionalLightFrustumViewer";
export class DirectionalLightPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    displayFrustum() {
        const light = this.props.light;
        const camera = light.getScene().activeCamera;
        const displayFrustum = (light._displayFrustum = !light._displayFrustum);
        if (light._displayFrustumObservable) {
            light.getScene().onAfterRenderObservable.remove(light._displayFrustumObservable);
            light._displayFrustumDLH.dispose();
        }
        if (displayFrustum && camera) {
            const dlh = (light._displayFrustumDLH = new DirectionalLightFrustumViewer(light, camera));
            light._displayFrustumObservable = light.getScene().onAfterRenderObservable.add(() => {
                dlh.update();
            });
        }
    }
    render() {
        const light = this.props.light;
        const generator = light.getShadowGenerator() || null;
        const hideAutoCalcShadowZBounds = generator instanceof CascadedShadowGenerator;
        const displayFrustum = light._displayFrustum ?? false;
        return (_jsxs(_Fragment, { children: [_jsx(CommonLightPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, light: light, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "SETUP", selection: this.props.globalState, children: [_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Diffuse", target: light, propertyName: "diffuse", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Specular", target: light, propertyName: "specular", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Position", target: light, propertyName: "position", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction", target: light, propertyName: "direction", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), !hideAutoCalcShadowZBounds && (_jsx(CheckBoxLineComponent, { label: "Auto Calc Shadow ZBounds", target: light, propertyName: "autoCalcShadowZBounds", onPropertyChangedObservable: this.props.onPropertyChangedObservable }))] }), _jsx(CommonShadowLightPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, light: light, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(LineContainerComponent, { title: "DEBUG", closed: true, selection: this.props.globalState, children: _jsx(CheckBoxLineComponent, { label: "Display frustum", isSelected: () => displayFrustum, onSelect: () => this.displayFrustum() }) })] }));
    }
}
//# sourceMappingURL=directionalLightPropertyGridComponent.js.map