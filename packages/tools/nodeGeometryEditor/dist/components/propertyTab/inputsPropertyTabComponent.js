import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import "./propertyTab.scss";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { Vector4LineComponent } from "shared-ui-components/lines/vector4LineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
export class InputsPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    processInputBlockUpdate() {
        this.props.globalState.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    renderInputBlock(block) {
        switch (block.type) {
            case NodeGeometryBlockConnectionPointTypes.Int:
            case NodeGeometryBlockConnectionPointTypes.Float: {
                const cantDisplaySlider = isNaN(block.min) || isNaN(block.max) || block.min === block.max;
                const isInteger = block.type === NodeGeometryBlockConnectionPointTypes.Int;
                return (_jsxs("div", { children: [cantDisplaySlider && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, isInteger: isInteger, propertyName: "value", onChange: () => this.processInputBlockUpdate() }, block.uniqueId)), !cantDisplaySlider && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", step: isInteger ? 1 : Math.abs(block.max - block.min) / 100.0, decimalCount: isInteger ? 0 : 2, minimum: block.min, maximum: block.max, onChange: () => this.processInputBlockUpdate() }, block.uniqueId))] }, block.uniqueId));
            }
            case NodeGeometryBlockConnectionPointTypes.Vector2:
                return (_jsx(Vector2LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate() }, block.uniqueId));
            case NodeGeometryBlockConnectionPointTypes.Vector3:
                return (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate() }, block.uniqueId));
            case NodeGeometryBlockConnectionPointTypes.Vector4:
                return (_jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate() }, block.uniqueId));
        }
        return null;
    }
    render() {
        return (_jsx(LineContainerComponent, { title: "INPUTS", children: this.props.inputs.map((ib) => {
                if (ib.isContextual || !ib.name) {
                    return null;
                }
                return this.renderInputBlock(ib);
            }) }));
    }
}
//# sourceMappingURL=inputsPropertyTabComponent.js.map