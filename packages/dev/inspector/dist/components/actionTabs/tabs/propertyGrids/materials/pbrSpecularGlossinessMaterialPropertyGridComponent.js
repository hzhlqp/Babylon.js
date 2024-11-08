import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Observable } from "core/Misc/observable";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class PBRSpecularGlossinessMaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onDebugSelectionChangeObservable = new Observable();
    }
    renderTextures() {
        const material = this.props.material;
        const onDebugSelectionChangeObservable = this._onDebugSelectionChangeObservable;
        return (_jsxs(LineContainerComponent, { title: "TEXTURES", selection: this.props.globalState, children: [_jsx(TextureLinkLineComponent, { label: "Diffuse", texture: material.diffuseTexture, propertyName: "diffuseTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }), _jsx(TextureLinkLineComponent, { label: "Specular glossiness", texture: material.specularGlossinessTexture, propertyName: "specularGlossinessTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }), _jsx(TextureLinkLineComponent, { label: "Normal", texture: material.normalTexture, propertyName: "normalTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }), _jsx(TextureLinkLineComponent, { label: "Environment", texture: material.environmentTexture, propertyName: "environmentTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }), _jsx(TextureLinkLineComponent, { label: "Emissive", texture: material.emissiveTexture, propertyName: "emissiveTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable }), _jsx(TextureLinkLineComponent, { label: "Lightmap", texture: material.lightmapTexture, propertyName: "lightmapTexture", material: material, onSelectionChangedObservable: this.props.onSelectionChangedObservable, onDebugSelectionChangeObservable: onDebugSelectionChangeObservable })] }));
    }
    render() {
        const material = this.props.material;
        return (_jsxs(_Fragment, { children: [_jsx(CommonMaterialPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, material: material, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), this.renderTextures(), _jsxs(LineContainerComponent, { title: "LIGHTING & COLORS", selection: this.props.globalState, children: [_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Diffuse", target: material, propertyName: "diffuseColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable, isLinear: true }), _jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Specular", target: material, propertyName: "specularColor", onPropertyChangedObservable: this.props.onPropertyChangedObservable, isLinear: true })] }), _jsx(LineContainerComponent, { title: "LEVELS", closed: true, selection: this.props.globalState, children: _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Glossiness", target: material, propertyName: "glossiness", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }) }), _jsxs(LineContainerComponent, { title: "NORMAL MAP", closed: true, selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Invert X axis", target: material, propertyName: "invertNormalMapX", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Invert Y axis", target: material, propertyName: "invertNormalMapY", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=pbrSpecularGlossinessMaterialPropertyGridComponent.js.map