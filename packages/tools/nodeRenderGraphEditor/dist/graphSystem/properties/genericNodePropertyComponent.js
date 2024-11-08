import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { Color4LineComponent } from "shared-ui-components/lines/color4LineComponent";
import { Constants } from "core/Engines/constants";
import { ForceRebuild } from "shared-ui-components/nodeGraphSystem/automaticProperties";
export const samplingModeList = [
    { label: "Nearest/Nearest", value: Constants.TEXTURE_NEAREST_SAMPLINGMODE },
    { label: "Linear/Nearest", value: Constants.TEXTURE_LINEAR_NEAREST },
    { label: "Nearest/Linear", value: Constants.TEXTURE_NEAREST_LINEAR },
    { label: "Linear/Linear", value: Constants.TEXTURE_BILINEAR_SAMPLINGMODE },
    { label: "Nearest/Nearest & nearest mip", value: Constants.TEXTURE_NEAREST_NEAREST_MIPNEAREST },
    { label: "Linear/Nearest & nearest mip", value: Constants.TEXTURE_LINEAR_NEAREST_MIPNEAREST },
    { label: "Nearest/Linear & nearest mip", value: Constants.TEXTURE_NEAREST_LINEAR_MIPNEAREST },
    { label: "Linear/Linear & nearest mip", value: Constants.TEXTURE_LINEAR_LINEAR_MIPNEAREST },
    { label: "Nearest/Nearest & linear mip", value: Constants.TEXTURE_NEAREST_NEAREST_MIPLINEAR },
    { label: "Linear/Nearest & linear mip", value: Constants.TEXTURE_LINEAR_NEAREST_MIPLINEAR },
    { label: "Nearest/Linear & linear mip", value: Constants.TEXTURE_NEAREST_LINEAR_MIPLINEAR },
    { label: "Linear/Linear & linear mip", value: Constants.TEXTURE_TRILINEAR_SAMPLINGMODE }, // 3
];
export const textureFormatList = [
    { label: "rgba", value: Constants.TEXTUREFORMAT_RGBA },
    { label: "r", value: Constants.TEXTUREFORMAT_RED },
    { label: "rg", value: Constants.TEXTUREFORMAT_RG },
    { label: "bgra", value: Constants.TEXTUREFORMAT_BGRA },
    { label: "rgba integer", value: Constants.TEXTUREFORMAT_RGBA_INTEGER },
    { label: "r integer", value: Constants.TEXTUREFORMAT_RED_INTEGER },
    { label: "rg Integer", value: Constants.TEXTUREFORMAT_RG_INTEGER },
];
export const textureTypeList = [
    { label: "Unsigned Byte", value: Constants.TEXTURETYPE_UNSIGNED_BYTE },
    { label: "Signed Byte", value: Constants.TEXTURETYPE_BYTE },
    { label: "Unsigned Short", value: Constants.TEXTURETYPE_UNSIGNED_SHORT },
    { label: "Short", value: Constants.TEXTURETYPE_SHORT },
    { label: "Unsigned Integer", value: Constants.TEXTURETYPE_UNSIGNED_INTEGER },
    { label: "Integer", value: Constants.TEXTURETYPE_INT },
    { label: "Float", value: Constants.TEXTURETYPE_FLOAT },
    { label: "Half Float", value: Constants.TEXTURETYPE_HALF_FLOAT },
];
export const textureDepthStencilFormatList = [
    { label: "Depth 24/Stencil 8", value: Constants.TEXTUREFORMAT_DEPTH24_STENCIL8 },
    { label: "Depth 24 Unorm/Stencil 8", value: Constants.TEXTUREFORMAT_DEPTH24UNORM_STENCIL8 },
    { label: "Depth 32 float/Stencil 8", value: Constants.TEXTUREFORMAT_DEPTH32FLOAT_STENCIL8 },
    { label: "Depth 16", value: Constants.TEXTUREFORMAT_DEPTH16 },
    { label: "Depth 24", value: Constants.TEXTUREFORMAT_DEPTH24 },
    { label: "Depth 32 float", value: Constants.TEXTUREFORMAT_DEPTH32_FLOAT },
];
export class GenericPropertyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs(_Fragment, { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsx(GenericPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData })] }));
    }
}
export class GeneralPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const block = this.props.nodeData.data;
        return (_jsx(_Fragment, { children: _jsxs(LineContainerComponent, { title: "GENERAL", children: [_jsx(TextInputLineComponent, { label: "Name", propertyName: "name", target: block, lockObject: this.props.stateManager.lockObject, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true, validator: () => {
                            return true;
                        } }), _jsx(TextLineComponent, { label: "Type", value: block.getClassName() }), _jsx(TextInputLineComponent, { label: "Comments", propertyName: "comments", lockObject: this.props.stateManager.lockObject, target: block, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true }), _jsx(CheckBoxLineComponent, { label: "Disabled", target: block, propertyName: "disabled", onValueChanged: () => this.props.stateManager.onRebuildRequiredObservable.notifyObservers() }, `checkBox-disabled`)] }) }));
    }
}
export class GenericPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const block = this.props.nodeData.data, propStore = block._propStore;
        if (!propStore) {
            return _jsx(_Fragment, {});
        }
        const componentList = {}, groups = [];
        for (const { propertyName, displayName, type, groupName, options } of propStore) {
            let components = componentList[groupName];
            if (!components) {
                components = [];
                componentList[groupName] = components;
                groups.push(groupName);
            }
            switch (type) {
                case 0 /* PropertyTypeForEdition.Boolean */: {
                    components.push(_jsx(CheckBoxLineComponent, { label: displayName, target: block, propertyName: propertyName, onValueChanged: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `checkBox-${propertyName}`));
                    break;
                }
                case 1 /* PropertyTypeForEdition.Float */: {
                    const cantDisplaySlider = isNaN(options.min) || isNaN(options.max) || options.min === options.max;
                    if (cantDisplaySlider) {
                        components.push(_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `float-${propertyName}`));
                    }
                    else {
                        components.push(_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, target: block, propertyName: propertyName, step: Math.abs(options.max - options.min) / 100.0, minimum: Math.min(options.min, options.max), maximum: options.max, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `slider-${propertyName}`));
                    }
                    break;
                }
                case 2 /* PropertyTypeForEdition.Int */: {
                    const cantDisplaySlider = isNaN(options.min) || isNaN(options.max) || options.min === options.max;
                    if (cantDisplaySlider) {
                        components.push(_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `int-${propertyName}`));
                    }
                    else {
                        components.push(_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, target: block, propertyName: propertyName, step: 1, minimum: Math.min(options.min, options.max), maximum: options.max, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `slider-${propertyName}`));
                    }
                    break;
                }
                case 3 /* PropertyTypeForEdition.Vector2 */: {
                    components.push(_jsx(Vector2LineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `vector2-${propertyName}`));
                    break;
                }
                case 4 /* PropertyTypeForEdition.List */: {
                    components.push(_jsx(OptionsLine, { label: displayName, options: options.options, target: block, propertyName: propertyName, onSelect: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `options-${propertyName}`));
                    break;
                }
                case 5 /* PropertyTypeForEdition.Color4 */: {
                    components.push(_jsx(Color4LineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `color4-${propertyName}`));
                    break;
                }
                case 6 /* PropertyTypeForEdition.SamplingMode */: {
                    components.push(_jsx(OptionsLine, { className: "samplingMode", label: displayName, options: samplingModeList, target: block, propertyName: propertyName, onSelect: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `samplingmode-${propertyName}`));
                    break;
                }
                case 7 /* PropertyTypeForEdition.TextureFormat */: {
                    components.push(_jsx(OptionsLine, { label: displayName, options: textureFormatList, target: block, propertyName: propertyName, onSelect: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `textureformat-${propertyName}`));
                    break;
                }
                case 8 /* PropertyTypeForEdition.TextureType */: {
                    components.push(_jsx(OptionsLine, { label: displayName, options: textureTypeList, target: block, propertyName: propertyName, onSelect: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `texturetype-${propertyName}`));
                    break;
                }
            }
        }
        return (_jsx(_Fragment, { children: groups.map((group) => (_jsx(LineContainerComponent, { title: group, children: componentList[group] }, `group-${group}`))) }));
    }
}
//# sourceMappingURL=genericNodePropertyComponent.js.map