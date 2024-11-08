import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Observable } from "core/Misc/observable";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { Vector4LineComponent } from "shared-ui-components/lines/vector4LineComponent";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import { GradientPropertyTabComponent } from "../../gradientNodePropertyComponent";
import { Color4LineComponent } from "shared-ui-components/lines/color4LineComponent";
export class NodeMaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onDebugSelectionChangeObservable = new Observable();
    }
    edit() {
        this.props.material.edit({ nodeEditorConfig: { backgroundColor: this.props.material.getScene().clearColor } });
    }
    renderTextures() {
        const material = this.props.material;
        const onDebugSelectionChangeObservable = this._onDebugSelectionChangeObservable;
        const textureBlocks = material.getTextureBlocks();
        if (!textureBlocks || textureBlocks.length === 0) {
            return null;
        }
        return (_jsx(LineContainerComponent, { title: "TEXTURES", selection: this.props.globalState, children: textureBlocks.map((textureBlock, i) => {
                return (_jsx(TextureLinkLineComponent, { label: textureBlock.name, texture: textureBlock.texture, material: material, onTextureCreated: (texture) => (textureBlock.texture = texture), onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }, "nodematText" + i));
            }) }));
    }
    renderInputBlock(block) {
        switch (block.type) {
            case NodeMaterialBlockConnectionPointTypes.Float: {
                const cantDisplaySlider = isNaN(block.min) || isNaN(block.max) || block.min === block.max;
                return (_jsxs("div", { children: [block.isBoolean && (_jsx(CheckBoxLineComponent, { label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name)), !block.isBoolean && cantDisplaySlider && (_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name)), !block.isBoolean && !cantDisplaySlider && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", step: (block.max - block.min) / 100.0, minimum: block.min, maximum: block.max, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name))] }, block.name));
            }
            case NodeMaterialBlockConnectionPointTypes.Color3:
                return (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name));
            case NodeMaterialBlockConnectionPointTypes.Color4:
                return (_jsx(Color4LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name));
            case NodeMaterialBlockConnectionPointTypes.Vector2:
                return (_jsx(Vector2LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name));
            case NodeMaterialBlockConnectionPointTypes.Vector3:
                return (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name));
            case NodeMaterialBlockConnectionPointTypes.Vector4:
                return (_jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: block.name, target: block, propertyName: "value", onPropertyChangedObservable: this.props.onPropertyChangedObservable }, block.name));
        }
        return null;
    }
    renderInputValues() {
        const configurableInputBlocks = this.props.material
            .getInputBlocks()
            .filter((block) => {
            return block.visibleInInspector && block.isUniform && !block.isSystemValue;
        })
            .sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        const namedGroups = [];
        configurableInputBlocks.forEach((block) => {
            if (!block.groupInInspector) {
                return;
            }
            if (namedGroups.indexOf(block.groupInInspector) === -1) {
                namedGroups.push(block.groupInInspector);
            }
        });
        namedGroups.sort();
        const gradiantNodeMaterialBlocks = this.props.material.attachedBlocks
            .filter((block) => {
            return block.visibleInInspector && block.getClassName() === "GradientBlock";
        })
            .sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        const inputBlockContainer = configurableInputBlocks.length > 0 ? (_jsxs(LineContainerComponent, { title: "INPUTS", selection: this.props.globalState, children: [" ", configurableInputBlocks
                    .filter((block) => !block.groupInInspector)
                    .map((block) => {
                    return this.renderInputBlock(block);
                })] })) : null;
        return (_jsxs(_Fragment, { children: [inputBlockContainer, namedGroups.map((name, i) => {
                    return (_jsx(LineContainerComponent, { title: name.toUpperCase(), selection: this.props.globalState, children: configurableInputBlocks
                            .filter((block) => block.groupInInspector === name)
                            .map((block) => {
                            return this.renderInputBlock(block);
                        }) }, "inputValue" + i));
                }), gradiantNodeMaterialBlocks.map((block, i) => {
                    return (_jsx(LineContainerComponent, { title: block.name.toUpperCase(), selection: this.props.globalState, children: _jsx(GradientPropertyTabComponent, { globalState: this.props.globalState, block: block }) }, block.name + i));
                })] }));
    }
    render() {
        const material = this.props.material;
        return (_jsxs(_Fragment, { children: [_jsx(CommonMaterialPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, material: material, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "CONFIGURATION", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Ignore alpha", target: material, propertyName: "ignoreAlpha", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(ButtonLineComponent, { label: "Node Material Editor", onClick: () => this.edit() })] }), this.renderInputValues(), this.renderTextures()] }));
    }
}
//# sourceMappingURL=nodeMaterialPropertyGridComponent.js.map