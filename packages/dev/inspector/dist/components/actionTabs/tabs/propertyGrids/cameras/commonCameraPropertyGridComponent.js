import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Camera } from "core/Cameras/camera";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { AnimationGridComponent } from "../animations/animationPropertyGridComponent";
import { HexLineComponent } from "shared-ui-components/lines/hexLineComponent";
import { ParentPropertyGridComponent } from "../parentPropertyGridComponent";
export class CommonCameraPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: this.props.camera.mode };
    }
    render() {
        const camera = this.props.camera;
        const modeOptions = [
            { label: "Perspective", value: Camera.PERSPECTIVE_CAMERA },
            { label: "Orthographic", value: Camera.ORTHOGRAPHIC_CAMERA },
        ];
        return (_jsxs("div", { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: camera, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "ID", value: camera.id }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: camera, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Unique ID", value: camera.uniqueId.toString() }), _jsx(TextLineComponent, { label: "Class", value: camera.getClassName() }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Near plane", target: camera, propertyName: "minZ", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(ParentPropertyGridComponent, { globalState: this.props.globalState, node: camera, lockObject: this.props.lockObject }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Far plane", target: camera, propertyName: "maxZ", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Inertia", target: camera, propertyName: "inertia", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(HexLineComponent, { isInteger: true, lockObject: this.props.lockObject, label: "Layer mask", target: camera, propertyName: "layerMask", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Mode", options: modeOptions, target: camera, propertyName: "mode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ mode: value }) }), camera.mode === Camera.PERSPECTIVE_CAMERA && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Field of view", target: camera, useEuler: this.props.globalState.onlyUseEulers, propertyName: "fov", minimum: 0.1, maximum: Math.PI, step: 0.1, onPropertyChangedObservable: this.props.onPropertyChangedObservable })), camera.mode === Camera.ORTHOGRAPHIC_CAMERA && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Left", target: camera, propertyName: "orthoLeft", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), camera.mode === Camera.ORTHOGRAPHIC_CAMERA && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Top", target: camera, propertyName: "orthoTop", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), camera.mode === Camera.ORTHOGRAPHIC_CAMERA && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Right", target: camera, propertyName: "orthoRight", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), camera.mode === Camera.ORTHOGRAPHIC_CAMERA && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Bottom", target: camera, propertyName: "orthoBottom", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => {
                                camera.dispose();
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                            } })] }), _jsx(AnimationGridComponent, { globalState: this.props.globalState, animatable: camera, scene: camera.getScene(), lockObject: this.props.lockObject })] }));
    }
}
//# sourceMappingURL=commonCameraPropertyGridComponent.js.map