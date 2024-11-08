import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
export class Color3PropertyTabComponent extends React.Component {
    render() {
        return (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=color3PropertyTabComponent.js.map