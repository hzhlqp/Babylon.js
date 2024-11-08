import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Color4LineComponent } from "shared-ui-components/lines/color4LineComponent";
export class Color4PropertyTabComponent extends React.Component {
    render() {
        return (_jsx(Color4LineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=color4PropertyTabComponent.js.map