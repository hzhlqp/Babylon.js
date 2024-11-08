import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonLightPropertyGridComponent } from "./commonLightPropertyGridComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { CommonShadowLightPropertyGridComponent } from "./commonShadowLightPropertyGridComponent";
export class PointLightPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const light = this.props.light;
        return (_jsxs(_Fragment, { children: [_jsx(CommonLightPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, light: light, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "SETUP", selection: this.props.globalState, children: [_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Diffuse", target: light, propertyName: "diffuse", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Specular", target: light, propertyName: "specular", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Position", target: light, propertyName: "position", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsx(CommonShadowLightPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, light: light, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=pointLightPropertyGridComponent.js.map