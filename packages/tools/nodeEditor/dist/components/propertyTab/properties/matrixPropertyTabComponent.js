import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { MatrixLineComponent } from "shared-ui-components/lines/matrixLineComponent";
export class MatrixPropertyTabComponent extends React.Component {
    render() {
        return (_jsx(MatrixLineComponent, { lockObject: this.props.lockObject, label: "Value", target: this.props.inputBlock, propertyName: "value", onChange: () => {
                this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
            }, mode: this.props.inputBlock.matrixMode, onModeChange: (mode) => {
                this.props.inputBlock.matrixMode = mode;
            } }));
    }
}
//# sourceMappingURL=matrixPropertyTabComponent.js.map