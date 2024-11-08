import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { NodeMaterialBlockTargets } from "core/Materials/Node/Enums/nodeMaterialBlockTargets";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { ForceRebuild } from "shared-ui-components/nodeGraphSystem/automaticProperties";
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
        const targetOptions = [
            { label: "Neutral", value: NodeMaterialBlockTargets.Neutral },
            { label: "Vertex", value: NodeMaterialBlockTargets.Vertex },
            { label: "Fragment", value: NodeMaterialBlockTargets.Fragment },
        ];
        const block = this.props.nodeData.data;
        return (_jsx(_Fragment, { children: _jsxs(LineContainerComponent, { title: "GENERAL", children: [(!block.isInput || !block.isAttribute) && (_jsx(TextInputLineComponent, { label: "Name", propertyName: "name", target: block, lockObject: this.props.stateManager.lockObject, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true, validator: (newName) => {
                            if (!block.validateBlockName(newName)) {
                                this.props.stateManager.onErrorMessageDialogRequiredObservable.notifyObservers(`"${newName}" is a reserved name, please choose another`);
                                return false;
                            }
                            return true;
                        } })), block._originalTargetIsNeutral && (_jsx(OptionsLine, { label: "Target", options: targetOptions, target: block, propertyName: "target", onSelect: () => {
                            this.forceUpdate();
                            this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                        } })), !block._originalTargetIsNeutral && _jsx(TextLineComponent, { label: "Target", value: NodeMaterialBlockTargets[block.target] }), _jsx(TextLineComponent, { label: "Type", value: block.getClassName() }), _jsx(TextInputLineComponent, { label: "Comments", propertyName: "comments", lockObject: this.props.stateManager.lockObject, target: block, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true })] }) }));
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
            if (options.embedded) {
                continue;
            }
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
                    components.push(_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `int-${propertyName}`));
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
            }
        }
        return (_jsx(_Fragment, { children: groups.map((group) => (_jsx(LineContainerComponent, { title: group, children: componentList[group] }, `group-${group}`))) }));
    }
}
//# sourceMappingURL=genericNodePropertyComponent.js.map