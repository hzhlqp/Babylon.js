import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonLightPropertyGridComponent } from "./commonLightPropertyGridComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
export class HemisphericLightPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const light = this.props.light;
        return (_jsxs(_Fragment, { children: [_jsx(CommonLightPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, light: light, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "SETUP", selection: this.props.globalState, children: [_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Diffuse", target: light, propertyName: "diffuse", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Ground", target: light, propertyName: "groundColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction", target: light, propertyName: "direction", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=hemisphericLightPropertyGridComponent.js.map