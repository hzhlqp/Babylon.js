import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
export class FloatPropertyTabComponent extends React.Component {
    render() {
        return (_jsx(FloatLineComponent, { lockObject: this.props.globalState.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                if (this.props.inputBlock.isConstant) {
                    this.props.globalState.stateManager.onRebuildRequiredObservable.notifyObservers();
                }
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=floatPropertyTabComponent.js.map