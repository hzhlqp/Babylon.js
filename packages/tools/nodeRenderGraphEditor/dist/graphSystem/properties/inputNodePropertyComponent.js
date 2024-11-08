import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { GeneralPropertyTabComponent, textureDepthStencilFormatList, textureFormatList, textureTypeList } from "./genericNodePropertyComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
export class InputPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const inputBlock = this.props.nodeData.data;
        this._onValueChangedObserver = inputBlock.onValueChangedObservable.add(() => {
            this.forceUpdate();
            this.props.stateManager.onUpdateRequiredObservable.notifyObservers(inputBlock);
        });
    }
    componentWillUnmount() {
        const inputBlock = this.props.nodeData.data;
        if (this._onValueChangedObserver) {
            inputBlock.onValueChangedObservable.remove(this._onValueChangedObserver);
            this._onValueChangedObserver = null;
        }
    }
    renderValue(_globalState) {
        const inputBlock = this.props.nodeData.data;
        switch (inputBlock.type) {
            case NodeRenderGraphBlockConnectionPointTypes.Texture: {
                const isExternal = inputBlock.isExternal;
                const creationOptions = inputBlock.creationOptions;
                if (!isExternal && !inputBlock.creationOptions) {
                    inputBlock.setDefaultValue();
                }
                return (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Is external", target: inputBlock, propertyName: "isExternal", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), !isExternal && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Size is in percentage", target: creationOptions, propertyName: "sizeIsPercentage", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Width", propertyName: "width", target: creationOptions.size, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Height", propertyName: "height", target: creationOptions.size, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(OptionsLine, { label: "Format", options: textureFormatList, target: creationOptions, propertyName: "", onSelect: (value) => {
                                        creationOptions.options.formats[0] = value;
                                        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                    }, extractValue: () => creationOptions.options.formats[0], noDirectUpdate: true }), _jsx(OptionsLine, { label: "Type", options: textureTypeList, target: creationOptions, propertyName: "", onSelect: (value) => {
                                        creationOptions.options.types[0] = value;
                                        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                    }, extractValue: () => creationOptions.options.types[0], noDirectUpdate: true }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Samples", propertyName: "samples", target: creationOptions.options, min: 1, max: 8, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(CheckBoxLineComponent, { label: "Create mipmaps", target: creationOptions.options, propertyName: "createMipMaps", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(CheckBoxLineComponent, { label: "Use sRGB buffer", target: creationOptions, propertyName: "", onSelect: (value) => {
                                        creationOptions.options.useSRGBBuffers[0] = value;
                                        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                    }, extractValue: () => creationOptions.options.useSRGBBuffers[0] })] }))] }));
            }
            case NodeRenderGraphBlockConnectionPointTypes.TextureDepthStencilAttachment: {
                const creationOptions = inputBlock.creationOptions;
                const isExternal = inputBlock.isExternal;
                if (!isExternal && !inputBlock.creationOptions) {
                    inputBlock.setDefaultValue();
                }
                return (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Is external", target: inputBlock, propertyName: "isExternal", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), !isExternal && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Size is in percentage", target: creationOptions, propertyName: "sizeIsPercentage", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Width", propertyName: "width", target: creationOptions.size, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Height", propertyName: "height", target: creationOptions.size, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(OptionsLine, { label: "Format", options: textureDepthStencilFormatList, target: creationOptions.options, propertyName: "depthTextureFormat", onSelect: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: "Samples", propertyName: "samples", target: creationOptions.options, min: 1, max: 8, onChange: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() })] }))] }));
            }
        }
        return null;
    }
    setDefaultValue() {
        const inputBlock = this.props.nodeData.data;
        inputBlock.setDefaultValue();
    }
    render() {
        const inputBlock = this.props.nodeData.data;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "PROPERTIES", children: [this.renderValue(this.props.stateManager.data), _jsx(CheckBoxLineComponent, { label: "Visible on frame", target: inputBlock, propertyName: "visibleOnFrame" })] })] }));
    }
}
//# sourceMappingURL=inputNodePropertyComponent.js.map