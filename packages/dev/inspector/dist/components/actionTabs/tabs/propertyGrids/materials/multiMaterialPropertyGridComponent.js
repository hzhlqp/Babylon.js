import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
export class MultiMaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onMaterialLink(mat) {
        if (!this.props.onSelectionChangedObservable) {
            return;
        }
        this.props.onSelectionChangedObservable.notifyObservers(mat);
    }
    renderChildMaterial() {
        const material = this.props.material;
        return (_jsx(LineContainerComponent, { title: "CHILDREN", selection: this.props.globalState, children: material.subMaterials.map((mat, i) => {
                if (mat) {
                    return _jsx(TextLineComponent, { label: "Material #" + i, value: mat.name, onLink: () => this.onMaterialLink(mat) }, "Material #" + i);
                }
                return null;
            }) }));
    }
    render() {
        const material = this.props.material;
        return (_jsxs(_Fragment, { children: [_jsx(CommonMaterialPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, material: material, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), this.renderChildMaterial()] }));
    }
}
//# sourceMappingURL=multiMaterialPropertyGridComponent.js.map