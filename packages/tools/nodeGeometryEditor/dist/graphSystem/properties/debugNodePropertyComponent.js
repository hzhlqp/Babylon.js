import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
export class DebugPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this._onUpdateRequiredObserver = this.props.stateManager.onUpdateRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.stateManager.onUpdateRequiredObservable.remove(this._onUpdateRequiredObserver);
    }
    render() {
        const debugBlock = this.props.nodeData.data;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsx(LineContainerComponent, { title: "DEBUG INFOS", children: debugBlock.log.map((str, i) => {
                        return _jsx(TextLineComponent, { label: i + " >", value: str[0], tooltip: str[1] }, i);
                    }) })] }));
    }
}
//# sourceMappingURL=debugNodePropertyComponent.js.map