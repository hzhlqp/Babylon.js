import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonPostProcessPropertyGridComponent } from "./commonPostProcessPropertyGridComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
export class PostProcessPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    edit() {
        const postProcess = this.props.postProcess;
        postProcess.nodeMaterialSource.edit();
    }
    render() {
        const postProcess = this.props.postProcess;
        return (_jsxs(_Fragment, { children: [_jsx(CommonPostProcessPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, postProcess: postProcess, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), postProcess.nodeMaterialSource && (_jsx(LineContainerComponent, { title: "CONFIGURATION", selection: this.props.globalState, children: _jsx(ButtonLineComponent, { label: "Node Material Editor", onClick: () => this.edit() }) }))] }));
    }
}
//# sourceMappingURL=postProcessPropertyGridComponent.js.map