import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FloatPropertyTabComponent } from "../../components/propertyTab/properties/floatPropertyTabComponent";
import { Vector2PropertyTabComponent } from "../../components/propertyTab/properties/vector2PropertyTabComponent";
import { Vector3PropertyTabComponent } from "../../components/propertyTab/properties/vector3PropertyTabComponent";
import { Vector4PropertyTabComponent } from "../../components/propertyTab/properties/vector4PropertyTabComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
import { NodeGeometryContextualSources } from "core/Meshes/Node/Enums/nodeGeometryContextualSources";
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
    renderValue(globalState) {
        const inputBlock = this.props.nodeData.data;
        switch (inputBlock.type) {
            case NodeGeometryBlockConnectionPointTypes.Int:
            case NodeGeometryBlockConnectionPointTypes.Float: {
                const cantDisplaySlider = isNaN(inputBlock.min) || isNaN(inputBlock.max) || inputBlock.min === inputBlock.max;
                const isIntger = inputBlock.type === NodeGeometryBlockConnectionPointTypes.Int;
                return (_jsxs(_Fragment, { children: [_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Min", target: inputBlock, isInteger: isIntger, propertyName: "min", onChange: () => {
                                if (inputBlock.value < inputBlock.min) {
                                    inputBlock.value = inputBlock.min;
                                }
                                this.forceUpdate();
                            } }), _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Max", target: inputBlock, isInteger: isIntger, propertyName: "max", onChange: () => {
                                if (inputBlock.value > inputBlock.max) {
                                    inputBlock.value = inputBlock.max;
                                }
                                this.forceUpdate();
                            } }), cantDisplaySlider && _jsx(FloatPropertyTabComponent, { globalState: globalState, inputBlock: inputBlock }), !cantDisplaySlider && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Value", target: inputBlock, propertyName: "value", step: isIntger ? 1 : Math.abs(inputBlock.max - inputBlock.min) / 100.0, decimalCount: isIntger ? 0 : 2, minimum: Math.min(inputBlock.min, inputBlock.max), maximum: inputBlock.max, onChange: () => {
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            } }))] }));
            }
            case NodeGeometryBlockConnectionPointTypes.Vector2:
                return _jsx(Vector2PropertyTabComponent, { lockObject: globalState.lockObject, globalState: globalState, inputBlock: inputBlock });
            case NodeGeometryBlockConnectionPointTypes.Vector3:
                return _jsx(Vector3PropertyTabComponent, { lockObject: globalState.lockObject, globalState: globalState, inputBlock: inputBlock });
            case NodeGeometryBlockConnectionPointTypes.Vector4:
                return _jsx(Vector4PropertyTabComponent, { lockObject: globalState.lockObject, globalState: globalState, inputBlock: inputBlock });
        }
        return null;
    }
    setDefaultValue() {
        const inputBlock = this.props.nodeData.data;
        inputBlock.setDefaultValue();
    }
    render() {
        const inputBlock = this.props.nodeData.data;
        let contextualSourcesOptions = [{ label: "None", value: NodeGeometryContextualSources.None }];
        switch (inputBlock.type) {
            case NodeGeometryBlockConnectionPointTypes.Float:
            case NodeGeometryBlockConnectionPointTypes.Int:
                contextualSourcesOptions = [
                    { label: "Vertex ID", value: NodeGeometryContextualSources.VertexID },
                    { label: "Face ID", value: NodeGeometryContextualSources.FaceID },
                    { label: "Loop ID", value: NodeGeometryContextualSources.LoopID },
                    { label: "Instance ID", value: NodeGeometryContextualSources.InstanceID },
                    { label: "Geometry ID", value: NodeGeometryContextualSources.GeometryID },
                    { label: "Collection ID", value: NodeGeometryContextualSources.CollectionID },
                ];
                break;
            case NodeGeometryBlockConnectionPointTypes.Vector2:
                contextualSourcesOptions = [
                    { label: "UV1s", value: NodeGeometryContextualSources.UV },
                    { label: "UV2s", value: NodeGeometryContextualSources.UV2 },
                    { label: "UV3s", value: NodeGeometryContextualSources.UV3 },
                    { label: "UV4s", value: NodeGeometryContextualSources.UV4 },
                    { label: "UV5s", value: NodeGeometryContextualSources.UV5 },
                    { label: "UV6s", value: NodeGeometryContextualSources.UV6 },
                ];
                break;
            case NodeGeometryBlockConnectionPointTypes.Vector3:
                contextualSourcesOptions = [
                    { label: "Positions", value: NodeGeometryContextualSources.Positions },
                    { label: "Normals", value: NodeGeometryContextualSources.Normals },
                    { label: "LatticeID", value: NodeGeometryContextualSources.LatticeID },
                    { label: "LatticeControl", value: NodeGeometryContextualSources.LatticeControl },
                ];
                break;
            case NodeGeometryBlockConnectionPointTypes.Vector4:
                contextualSourcesOptions = [
                    { label: "Tangents", value: NodeGeometryContextualSources.Tangents },
                    { label: "Colors", value: NodeGeometryContextualSources.Colors },
                ];
                break;
        }
        const modeOptions = [{ label: "User-defined", value: 0 }];
        if (contextualSourcesOptions.length > 0) {
            modeOptions.push({ label: "Contextual value (Integer)", value: NodeGeometryBlockConnectionPointTypes.Int });
            modeOptions.push({ label: "Contextual value (Vector2)", value: NodeGeometryBlockConnectionPointTypes.Vector2 });
            modeOptions.push({ label: "Contextual value (Vector3)", value: NodeGeometryBlockConnectionPointTypes.Vector3 });
            modeOptions.push({ label: "Contextual value (Vector4)", value: NodeGeometryBlockConnectionPointTypes.Vector4 });
        }
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "PROPERTIES", children: [_jsx(OptionsLine, { label: "Mode", options: modeOptions, target: inputBlock, noDirectUpdate: true, extractValue: () => {
                                if (inputBlock.isContextual) {
                                    return inputBlock.type;
                                }
                                return 0;
                            }, onSelect: (value) => {
                                switch (value) {
                                    case 0:
                                        this.setDefaultValue();
                                        break;
                                    default:
                                        switch (value) {
                                            case NodeGeometryBlockConnectionPointTypes.Int:
                                                inputBlock.contextualValue = NodeGeometryContextualSources.VertexID;
                                                break;
                                            case NodeGeometryBlockConnectionPointTypes.Vector2:
                                                inputBlock.contextualValue = NodeGeometryContextualSources.UV;
                                                break;
                                            case NodeGeometryBlockConnectionPointTypes.Vector3:
                                                inputBlock.contextualValue = NodeGeometryContextualSources.Positions;
                                                break;
                                            case NodeGeometryBlockConnectionPointTypes.Vector4:
                                                inputBlock.contextualValue = NodeGeometryContextualSources.Colors;
                                                break;
                                        }
                                        break;
                                }
                                this.forceUpdate();
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(inputBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            }, propertyName: "" }), !inputBlock.isContextual && this.renderValue(this.props.stateManager.data), inputBlock.isContextual && (_jsx(OptionsLine, { label: "Contextual value", options: contextualSourcesOptions, target: inputBlock, propertyName: "contextualValue", onSelect: (value) => {
                                inputBlock.contextualValue = value;
                                this.forceUpdate();
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(inputBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            } })), !inputBlock.isContextual && _jsx(CheckBoxLineComponent, { label: "Visible on frame", target: inputBlock, propertyName: "visibleOnFrame" })] })] }));
    }
}
//# sourceMappingURL=inputNodePropertyComponent.js.map