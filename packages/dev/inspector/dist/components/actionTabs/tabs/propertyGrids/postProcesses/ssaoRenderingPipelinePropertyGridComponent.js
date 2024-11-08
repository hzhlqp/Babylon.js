import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonRenderingPipelinePropertyGridComponent } from "./commonRenderingPipelinePropertyGridComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
export class SSAORenderingPipelinePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const renderPipeline = this.props.renderPipeline;
        return (_jsxs(_Fragment, { children: [_jsx(CommonRenderingPipelinePropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, renderPipeline: renderPipeline, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "SSAO", selection: this.props.globalState, children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Strength", minimum: 0, maximum: 2, step: 0.05, target: renderPipeline, propertyName: "totalStrength", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Base", minimum: 0, maximum: 1, step: 0.05, target: renderPipeline, propertyName: "base", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Radius", minimum: 0.0001, maximum: 0.001, step: 0.0001, target: renderPipeline, propertyName: "radius", onPropertyChangedObservable: this.props.onPropertyChangedObservable, decimalCount: 4 }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Area", minimum: 0.0001, maximum: 0.01, step: 0.0001, target: renderPipeline, propertyName: "area", onPropertyChangedObservable: this.props.onPropertyChangedObservable, decimalCount: 4 }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Falloff", minimum: 0, maximum: 0.00001, step: 0.000001, target: renderPipeline, propertyName: "fallOff", onPropertyChangedObservable: this.props.onPropertyChangedObservable, decimalCount: 6 })] })] }));
    }
}
//# sourceMappingURL=ssaoRenderingPipelinePropertyGridComponent.js.map