import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
export class CommonRenderingPipelinePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const renderPipeline = this.props.renderPipeline;
        const renderPipelineAsAny = renderPipeline;
        return (_jsxs("div", { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: renderPipeline, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Name", value: renderPipeline.name }), _jsx(TextLineComponent, { label: "Class", value: renderPipeline.getClassName() }), renderPipelineAsAny.samples !== undefined && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Samples", minimum: 1, maximum: 64, step: 1, decimalCount: 0, target: renderPipeline, propertyName: "samples", onPropertyChangedObservable: this.props.onPropertyChangedObservable }))] })] }));
    }
}
//# sourceMappingURL=commonRenderingPipelinePropertyGridComponent.js.map