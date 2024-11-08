import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { Vector4LineComponent } from "shared-ui-components/lines/vector4LineComponent";
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
    processUpdate() {
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    renderConnectionPoint(point) {
        switch (point.type) {
            case NodeGeometryBlockConnectionPointTypes.Int: {
                if (point.valueMax !== undefined && point.valueMin !== undefined) {
                    return (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", decimalCount: 0, step: 1, minimum: point.valueMin, maximum: point.valueMax, onChange: () => this.processUpdate() }, point.name));
                }
                return (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, isInteger: true, step: "1", digits: 0, target: point, propertyName: "value", onChange: () => this.processUpdate() }, point.name));
            }
            case NodeGeometryBlockConnectionPointTypes.Float: {
                if (point.valueMax !== undefined && point.valueMin !== undefined) {
                    return (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", decimalCount: 2, step: (point.valueMax - point.valueMin) / 100.0, minimum: point.valueMin, maximum: point.valueMax, onChange: () => this.processUpdate() }, point.name));
                }
                return (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", onChange: () => this.processUpdate() }, point.name));
            }
            case NodeGeometryBlockConnectionPointTypes.Vector2:
                return (_jsx(Vector2LineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", onChange: () => this.processUpdate() }, point.name));
            case NodeGeometryBlockConnectionPointTypes.Vector3:
                return (_jsx(Vector3LineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", onChange: () => this.processUpdate() }, point.name));
            case NodeGeometryBlockConnectionPointTypes.Vector4:
                return (_jsx(Vector4LineComponent, { lockObject: this.props.stateManager.lockObject, label: point.name, target: point, propertyName: "value", onChange: () => this.processUpdate() }, point.name));
        }
        return null;
    }
    render() {
        const block = this.props.nodeData.data;
        const nonConnectedInputs = block.inputs.filter((input) => {
            return !input.isConnected && input.value !== null && input.value !== undefined;
        });
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "GENERAL", children: [_jsx(TextInputLineComponent, { label: "Name", propertyName: "name", target: block, lockObject: this.props.stateManager.lockObject, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true, validator: () => {
                                return true;
                            } }), _jsx(TextLineComponent, { label: "Type", value: block.getClassName() }), _jsx(TextInputLineComponent, { label: "Comments", propertyName: "comments", lockObject: this.props.stateManager.lockObject, target: block, onChange: () => this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block), throttlePropertyChangedNotification: true }), _jsx(TextLineComponent, { label: "Build execution time", value: `${block.buildExecutionTime.toFixed(2)} ms` })] }), nonConnectedInputs.length > 0 && (_jsx(LineContainerComponent, { title: "PROPERTIES", children: nonConnectedInputs.map((input) => {
                        return this.renderConnectionPoint(input);
                    }) })), _jsx(LineContainerComponent, { title: "DEBUG INFOS", children: block.outputs.map((output) => {
                        return (_jsxs(_Fragment, { children: [_jsx(TextLineComponent, { label: (output.displayName || output.name) + ":", ignoreValue: true, additionalClass: "bold" }), _jsx(TextLineComponent, { label: "> Call count", value: output.callCount.toString() }), _jsx(TextLineComponent, { label: "> Execution count", value: output.executionCount.toString() })] }));
                    }) })] }));
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
                    const cantDisplaySlider = isNaN(options.min) || isNaN(options.max) || options.min === options.max;
                    if (cantDisplaySlider) {
                        components.push(_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, digits: 0, step: "1", isInteger: true, label: displayName, propertyName: propertyName, target: block, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `int-${propertyName}`));
                    }
                    else {
                        components.push(_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: displayName, target: block, step: 1, decimalCount: 0, propertyName: propertyName, minimum: Math.min(options.min, options.max), maximum: options.max, onChange: () => ForceRebuild(block, this.props.stateManager, propertyName, options.notifiers) }, `slider-${propertyName}`));
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
            }
        }
        return (_jsx(_Fragment, { children: groups.map((group) => (_jsx(LineContainerComponent, { title: group, children: componentList[group] }, `group-${group}`))) }));
    }
}
//# sourceMappingURL=genericNodePropertyComponent.js.map