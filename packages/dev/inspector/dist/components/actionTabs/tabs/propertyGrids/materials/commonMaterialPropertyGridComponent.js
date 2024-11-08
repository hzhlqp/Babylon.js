import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Material } from "core/Materials/material";
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { Constants } from "core/Engines/constants";
import { Engine } from "core/Engines/engine";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { OptionsLine, Null_Value } from "shared-ui-components/lines/optionsLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { AnimationGridComponent } from "../animations/animationPropertyGridComponent";
import { HexLineComponent } from "shared-ui-components/lines/hexLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
export class CommonMaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const material = this.props.material;
        material.depthFunction = material.depthFunction ?? 0;
        const orientationOptions = [
            { label: "<None>", value: Number.MAX_SAFE_INTEGER },
            { label: "Clockwise", value: Material.ClockWiseSideOrientation },
            { label: "Counterclockwise", value: Material.CounterClockWiseSideOrientation },
        ];
        const transparencyModeOptions = [
            { label: "<Not Defined>", value: Null_Value },
            { label: "Opaque", value: PBRMaterial.PBRMATERIAL_OPAQUE },
            { label: "Alpha test", value: PBRMaterial.PBRMATERIAL_ALPHATEST },
            { label: "Alpha blend", value: PBRMaterial.PBRMATERIAL_ALPHABLEND },
            { label: "Alpha blend and test", value: PBRMaterial.PBRMATERIAL_ALPHATESTANDBLEND },
        ];
        const alphaModeOptions = [
            { label: "Combine", value: Constants.ALPHA_COMBINE },
            { label: "One one", value: Constants.ALPHA_ONEONE },
            { label: "Add", value: Constants.ALPHA_ADD },
            { label: "Subtract", value: Constants.ALPHA_SUBTRACT },
            { label: "Multiply", value: Constants.ALPHA_MULTIPLY },
            { label: "Maximized", value: Constants.ALPHA_MAXIMIZED },
            { label: "Pre-multiplied", value: Constants.ALPHA_PREMULTIPLIED },
        ];
        const depthfunctionOptions = [
            { label: "<Engine Default>", value: 0 },
            { label: "Never", value: Engine.NEVER },
            { label: "Always", value: Engine.ALWAYS },
            { label: "Equal", value: Engine.EQUAL },
            { label: "Less", value: Engine.LESS },
            { label: "Less or equal", value: Engine.LEQUAL },
            { label: "Greater", value: Engine.GREATER },
            { label: "Greater or equal", value: Engine.GEQUAL },
            { label: "Not equal", value: Engine.NOTEQUAL },
        ];
        const stencilFunctionOptions = [
            { label: "Never", value: Constants.NEVER },
            { label: "Always", value: Constants.ALWAYS },
            { label: "Equal", value: Constants.EQUAL },
            { label: "Less", value: Constants.LESS },
            { label: "Less or equal", value: Constants.LEQUAL },
            { label: "Greater", value: Constants.GREATER },
            { label: "Greater or equal", value: Constants.GEQUAL },
            { label: "Not equal", value: Constants.NOTEQUAL },
        ];
        const stencilOperationOptions = [
            { label: "Keep", value: Constants.KEEP },
            { label: "Zero", value: Constants.ZERO },
            { label: "Replace", value: Constants.REPLACE },
            { label: "Incr", value: Constants.INCR },
            { label: "Decr", value: Constants.DECR },
            { label: "Invert", value: Constants.INVERT },
            { label: "Incr wrap", value: Constants.INCR_WRAP },
            { label: "Decr wrap", value: Constants.DECR_WRAP },
        ];
        return (_jsxs("div", { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: material, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "ID", value: material.id }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: material, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Unique ID", value: material.uniqueId.toString() }), _jsx(TextLineComponent, { label: "Class", value: material.getClassName() }), _jsx(CheckBoxLineComponent, { label: "Backface culling", target: material, propertyName: "backFaceCulling", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Orientation", options: orientationOptions, target: material, propertyName: "sideOrientation", onPropertyChangedObservable: this.props.onPropertyChangedObservable, allowNullValue: true, onSelect: (value) => this.setState({ mode: value }) }), _jsx(CheckBoxLineComponent, { label: "Disable lighting", target: material, propertyName: "disableLighting", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Disable color write", target: material, propertyName: "disableColorWrite", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Disable depth write", target: material, propertyName: "disableDepthWrite", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Depth function", options: depthfunctionOptions, target: material, propertyName: "depthFunction", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ depthFunction: value }) }), _jsx(CheckBoxLineComponent, { label: "Need depth pre-pass", target: material, propertyName: "needDepthPrePass", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Wireframe", target: material, propertyName: "wireframe", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Point cloud", target: material, propertyName: "pointsCloud", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Point size", target: material, propertyName: "pointSize", minimum: 0, maximum: 100, step: 0.1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Z-offset Factor", target: material, propertyName: "zOffset", minimum: -10, maximum: 10, step: 0.1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Z-offset Units", target: material, propertyName: "zOffsetUnits", minimum: -10, maximum: 10, step: 0.1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => {
                                material.dispose();
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                            } })] }), _jsxs(LineContainerComponent, { title: "TRANSPARENCY", selection: this.props.globalState, children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Alpha", target: material, propertyName: "alpha", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), material.transparencyMode !== undefined && (_jsx(OptionsLine, { allowNullValue: true, label: "Transparency mode", options: transparencyModeOptions, target: material, propertyName: "transparencyMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ transparencyMode: value }) })), _jsx(OptionsLine, { label: "Alpha mode", options: alphaModeOptions, target: material, propertyName: "alphaMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ alphaMode: value }) }), material.diffuseTexture && (_jsx(CheckBoxLineComponent, { label: "Diffuse texture has alpha", target: material.diffuseTexture, propertyName: "hasAlpha", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), material.useAlphaFromDiffuseTexture !== undefined && (_jsx(CheckBoxLineComponent, { label: "Use alpha from diffuse texture", target: material, propertyName: "useAlphaFromDiffuseTexture", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), material.albedoTexture && (_jsx(CheckBoxLineComponent, { label: "Albedo texture has alpha", target: material.albedoTexture, propertyName: "hasAlpha", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), material.useAlphaFromAlbedoTexture !== undefined && (_jsx(CheckBoxLineComponent, { label: "Use alpha from albedo texture", target: material, propertyName: "useAlphaFromAlbedoTexture", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(CheckBoxLineComponent, { label: "Separate culling pass", target: material, propertyName: "separateCullingPass", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), material.stencil && (_jsx(_Fragment, { children: _jsxs(LineContainerComponent, { title: "STENCIL", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Enabled", target: material.stencil, propertyName: "enabled", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(HexLineComponent, { isInteger: true, lockObject: this.props.lockObject, label: "Mask", target: material.stencil, propertyName: "mask", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Function", options: stencilFunctionOptions, target: material.stencil, propertyName: "func", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ stencilFunction: value }) }), _jsx(FloatLineComponent, { isInteger: true, lockObject: this.props.lockObject, label: "Function reference", target: material.stencil, propertyName: "funcRef", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(HexLineComponent, { isInteger: true, lockObject: this.props.lockObject, label: "Function mask", target: material.stencil, propertyName: "funcMask", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Op stencil fail", options: stencilOperationOptions, target: material.stencil, propertyName: "opStencilFail", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ opStencilFail: value }) }), _jsx(OptionsLine, { label: "Op depth fail", options: stencilOperationOptions, target: material.stencil, propertyName: "opDepthFail", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ opDepthFail: value }) }), _jsx(OptionsLine, { label: "Op stencil+depth pass", options: stencilOperationOptions, target: material.stencil, propertyName: "opStencilDepthPass", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ opStencilDepthPass: value }) })] }) })), _jsx(AnimationGridComponent, { globalState: this.props.globalState, animatable: material, scene: material.getScene(), lockObject: this.props.lockObject })] }));
    }
}
//# sourceMappingURL=commonMaterialPropertyGridComponent.js.map