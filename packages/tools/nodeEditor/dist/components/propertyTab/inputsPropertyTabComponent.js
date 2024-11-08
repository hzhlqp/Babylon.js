import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import "./propertyTab.scss";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { Vector4LineComponent } from "shared-ui-components/lines/vector4LineComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { Color4LineComponent } from "shared-ui-components/lines/color4LineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
export class InputsPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    processInputBlockUpdate(ib) {
        this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(ib);
        if (ib.isConstant) {
            this.props.globalState.stateManager.onRebuildRequiredObservable.notifyObservers();
        }
    }
    renderInputBlock(block) {
        switch (block.type) {
            case NodeMaterialBlockConnectionPointTypes.Float: {
                const cantDisplaySlider = isNaN(block.min) || isNaN(block.max) || block.min === block.max;
                return (_jsxs("div", { children: [block.isBoolean && (_jsx(CheckBoxLineComponent, { label: block.name, target: block, propertyName: "value", onValueChanged: () => {
                                this.processInputBlockUpdate(block);
                            } }, block.uniqueId)), !block.isBoolean && cantDisplaySlider && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId)), !block.isBoolean && !cantDisplaySlider && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", step: (block.max - block.min) / 100.0, minimum: block.min, maximum: block.max, onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId))] }, block.uniqueId));
            }
            case NodeMaterialBlockConnectionPointTypes.Color3:
                return (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId));
            case NodeMaterialBlockConnectionPointTypes.Color4:
                return (_jsx(Color4LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId));
            case NodeMaterialBlockConnectionPointTypes.Vector2:
                return (_jsx(Vector2LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId));
            case NodeMaterialBlockConnectionPointTypes.Vector3:
                return (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId));
            case NodeMaterialBlockConnectionPointTypes.Vector4:
                return (_jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onChange: () => this.processInputBlockUpdate(block) }, block.uniqueId));
        }
        return null;
    }
    render() {
        return (_jsx(LineContainerComponent, { title: "INPUTS", children: this.props.inputs.map((ib) => {
                if (!ib.isUniform || ib.isSystemValue || !ib.name) {
                    return null;
                }
                return this.renderInputBlock(ib);
            }) }));
    }
}
//# sourceMappingURL=inputsPropertyTabComponent.js.map