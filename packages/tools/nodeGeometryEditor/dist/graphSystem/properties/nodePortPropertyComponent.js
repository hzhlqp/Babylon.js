import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
export class NodePortPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    toggleExposeOnFrame(value) {
        this.props.nodePort.exposedOnFrame = value;
        this.props.stateManager.onExposePortOnFrameObservable.notifyObservers(this.props.nodePort.node);
    }
    render() {
        const info = this.props.nodePort.hasLabel() ? (_jsxs(_Fragment, { children: [this.props.nodePort.hasLabel() && (_jsx(TextInputLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Port Label", propertyName: "portName", target: this.props.nodePort })), this.props.nodePort.node.enclosingFrameId !== -1 && (_jsx(CheckBoxLineComponent, { label: "Expose Port on Frame", target: this.props.nodePort, isSelected: () => this.props.nodePort.exposedOnFrame, onSelect: (value) => this.toggleExposeOnFrame(value), propertyName: "exposedOnFrame", disabled: this.props.nodePort.disabled }))] })) : (_jsx(TextLineComponent, { label: "This node cannot be exposed to the frame.", value: " " }));
        return (_jsxs("div", { id: "propertyTab", children: [_jsxs("div", { id: "header", children: [_jsx("img", { id: "logo", src: "https://www.babylonjs.com/Assets/logo-babylonjs-social-twitter.png" }), _jsx("div", { id: "title", children: "NODE GEOMETRY EDITOR" })] }), _jsx("div", { children: _jsx(LineContainerComponent, { title: "GENERAL", children: info }) })] }));
    }
}
//# sourceMappingURL=nodePortPropertyComponent.js.map