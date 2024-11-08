import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { GlowLayer } from "core/Layers/glowLayer";
import { HighlightLayer } from "core/Layers/highlightLayer";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class LayerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const layer = this.props.layer;
        return (_jsx(_Fragment, { children: _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Class", value: layer.getClassName() }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: layer, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), layer.getClassName() === GlowLayer.EffectName && (_jsxs("div", { className: "fragment", children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Intensity", target: layer, propertyName: "intensity", minimum: 0, maximum: 2, step: 0.01, decimalCount: 2, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Blur Kernel Size", target: layer, propertyName: "blurKernelSize", minimum: 0, maximum: 64, step: 1, decimalCount: 0, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })), layer.getClassName() === HighlightLayer.EffectName && (_jsxs("div", { className: "fragment", children: [_jsx(CheckBoxLineComponent, { label: "Inner Glow", target: layer, propertyName: "innerGlow", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Outer Glow", target: layer, propertyName: "outerGlow", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }))] }) }));
    }
}
//# sourceMappingURL=layerPropertyGridComponent.js.map