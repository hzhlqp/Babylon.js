import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
export class TexturePropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    async loadTextureData(file) {
        const block = this.props.nodeData.data;
        await block.loadTextureFromFileAsync(file);
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
        this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
    }
    removeData() {
        const block = this.props.nodeData.data;
        block.cleanData();
        this.forceUpdate();
        this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    render() {
        const block = this.props.nodeData.data;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "PROPERTIES", children: [_jsx(FileButtonLine, { label: "Load", onClick: (file) => this.loadTextureData(file), accept: ".jpg, .png, .tga, .exr" }), block.textureData && _jsx(ButtonLineComponent, { label: "Remove", onClick: () => this.removeData() })] }), _jsx(LineContainerComponent, { title: "ADVANCED", children: _jsx(CheckBoxLineComponent, { label: "Serialized cached data", target: block, propertyName: "serializedCachedData", onValueChanged: () => {
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                        } }) })] }));
    }
}
//# sourceMappingURL=textureNodePropertyComponent.js.map