import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
export class Vector3PropertyTabComponent extends React.Component {
    render() {
        return (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=vector3PropertyTabComponent.js.map