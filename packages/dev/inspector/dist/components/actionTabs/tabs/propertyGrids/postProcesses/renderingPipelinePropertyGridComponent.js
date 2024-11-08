import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CommonRenderingPipelinePropertyGridComponent } from "./commonRenderingPipelinePropertyGridComponent";
export class RenderingPipelinePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const renderPipeline = this.props.renderPipeline;
        return (_jsx(CommonRenderingPipelinePropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, renderPipeline: renderPipeline, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
    }
}
//# sourceMappingURL=renderingPipelinePropertyGridComponent.js.map