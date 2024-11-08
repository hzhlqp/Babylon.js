import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Vector4LineComponent } from "shared-ui-components/lines/vector4LineComponent";
export class Vector4PropertyTabComponent extends React.Component {
    render() {
        return (_jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=vector4PropertyTabComponent.js.map