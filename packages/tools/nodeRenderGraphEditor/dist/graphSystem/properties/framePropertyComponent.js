import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { InputsPropertyTabComponent } from "../../components/propertyTab/inputsPropertyTabComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
export class FramePropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this._onFrameExpandStateChangedObserver = this.props.frame.onExpandStateChanged.add(() => this.forceUpdate());
    }
    componentWillUnmount() {
        if (this._onFrameExpandStateChangedObserver) {
            this.props.frame.onExpandStateChanged.remove(this._onFrameExpandStateChangedObserver);
            this._onFrameExpandStateChangedObserver = null;
        }
    }
    render() {
        let configurableInputBlocks = [];
        this.props.frame.nodes.forEach((node) => {
            const block = node.content.data;
            if (block.isInput && block.visibleOnFrame) {
                configurableInputBlocks.push(block);
            }
        });
        configurableInputBlocks = configurableInputBlocks.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        return (_jsxs("div", { id: "propertyTab", children: [_jsxs("div", { id: "header", children: [_jsx("img", { id: "logo", src: "https://www.babylonjs.com/Assets/logo-babylonjs-social-twitter.png" }), _jsx("div", { id: "title", children: "NODE MATERIAL EDITOR" })] }), _jsxs("div", { children: [_jsxs(LineContainerComponent, { title: "GENERAL", children: [_jsx(TextInputLineComponent, { label: "Name", propertyName: "name", lockObject: this.props.globalState.lockObject, target: this.props.frame }), _jsx(Color3LineComponent, { lockObject: this.props.globalState.lockObject, label: "Color", target: this.props.frame, propertyName: "color" }), _jsx(TextInputLineComponent, { lockObject: this.props.globalState.lockObject, label: "Comments", propertyName: "comments", target: this.props.frame }), !this.props.frame.isCollapsed && (_jsx(ButtonLineComponent, { label: "Collapse", onClick: () => {
                                        this.props.frame.isCollapsed = true;
                                    } })), this.props.frame.isCollapsed && (_jsx(ButtonLineComponent, { label: "Expand", onClick: () => {
                                        this.props.frame.isCollapsed = false;
                                    } })), _jsx(ButtonLineComponent, { label: "Export", onClick: () => {
                                        this.props.frame.export();
                                    } })] }), _jsx(InputsPropertyTabComponent, { lockObject: this.props.globalState.lockObject, globalState: this.props.globalState, inputs: configurableInputBlocks })] })] }));
    }
}
//# sourceMappingURL=framePropertyComponent.js.map