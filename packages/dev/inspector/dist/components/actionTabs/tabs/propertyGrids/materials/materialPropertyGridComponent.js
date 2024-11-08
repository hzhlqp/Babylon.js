import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
export class MaterialPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const material = this.props.material;
        return (_jsx(CommonMaterialPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, material: material, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
    }
}
//# sourceMappingURL=materialPropertyGridComponent.js.map