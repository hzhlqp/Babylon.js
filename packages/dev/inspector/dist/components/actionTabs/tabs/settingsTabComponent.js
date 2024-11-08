import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PaneComponent } from "../paneComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
export class SettingsTabComponent extends PaneComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const state = this.props.globalState;
        return (_jsx("div", { className: "pane", children: _jsxs(LineContainerComponent, { title: "UI", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Only display Euler values", target: state, propertyName: "onlyUseEulers" }), _jsx(CheckBoxLineComponent, { label: "Ignore backfaces when picking", target: state, propertyName: "ignoreBackfacesForPicking" })] }) }));
    }
}
//# sourceMappingURL=settingsTabComponent.js.map