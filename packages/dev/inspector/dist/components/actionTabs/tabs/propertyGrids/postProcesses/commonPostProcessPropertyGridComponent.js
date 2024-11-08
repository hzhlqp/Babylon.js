import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
export class CommonPostProcessPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const postProcess = this.props.postProcess;
        return (_jsxs("div", { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: postProcess, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Class", value: postProcess.getClassName() }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: postProcess, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), postProcess.width && _jsx(TextLineComponent, { label: "Width", value: postProcess.width.toString() }), postProcess.height && _jsx(TextLineComponent, { label: "Height", value: postProcess.height.toString() }), _jsx(CheckBoxLineComponent, { label: "Auto clear", target: postProcess, propertyName: "autoClear", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), postProcess.clearColor && (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Clear color", target: postProcess, propertyName: "clearColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable })), _jsx(CheckBoxLineComponent, { label: "Pixel perfect", target: postProcess, propertyName: "enablePixelPerfectMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Fullscreen viewport", target: postProcess, propertyName: "forceFullscreenViewport", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Samples", target: postProcess, propertyName: "samples", minimum: 1, maximum: 8, step: 1, decimalCount: 0, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => {
                                postProcess.dispose();
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                            } })] })] }));
    }
}
//# sourceMappingURL=commonPostProcessPropertyGridComponent.js.map