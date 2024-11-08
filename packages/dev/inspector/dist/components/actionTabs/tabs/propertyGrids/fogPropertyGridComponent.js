import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Scene } from "core/scene";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class FogPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: this.props.scene.fogMode };
    }
    render() {
        const scene = this.props.scene;
        const fogModeOptions = [
            { label: "None", value: Scene.FOGMODE_NONE },
            { label: "Linear", value: Scene.FOGMODE_LINEAR },
            { label: "Exp", value: Scene.FOGMODE_EXP },
            { label: "Exp2", value: Scene.FOGMODE_EXP2 },
        ];
        return (_jsxs("div", { children: [_jsx(OptionsLine, { label: "Fog mode", options: fogModeOptions, target: scene, propertyName: "fogMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ mode: value }) }), this.state.mode !== Scene.FOGMODE_NONE && (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Fog color", target: scene, propertyName: "fogColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), (this.state.mode === Scene.FOGMODE_EXP || this.state.mode === Scene.FOGMODE_EXP2) && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Fog density", target: scene, propertyName: "fogDensity", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), this.state.mode === Scene.FOGMODE_LINEAR && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Fog start", target: scene, propertyName: "fogStart", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), this.state.mode === Scene.FOGMODE_LINEAR && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Fog end", target: scene, propertyName: "fogEnd", onPropertyChangedObservable: this.props.onPropertyChangedObservable }))] }));
    }
}
//# sourceMappingURL=fogPropertyGridComponent.js.map