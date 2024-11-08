import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
export class Vector2PropertyTabComponent extends React.Component {
    render() {
        return (_jsx(Vector2LineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            } }));
    }
}
//# sourceMappingURL=vector2PropertyTabComponent.js.map