import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
export class FloatPropertyTabComponent extends React.Component {
    render() {
        return (_jsx(FloatLineComponent, { lockObject: this.props.globalState.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", isInteger: this.props.inputBlock.type === NodeGeometryBlockConnectionPointTypes.Int, onChange: () => {
                this.props.globalState.stateManager.onRebuildRequiredObservable.notifyObservers();
            } }));
    }
}
//# sourceMappingURL=floatPropertyTabComponent.js.map