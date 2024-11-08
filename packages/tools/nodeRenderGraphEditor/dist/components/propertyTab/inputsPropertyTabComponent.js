import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import "./propertyTab.scss";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
export class InputsPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    processInputBlockUpdate() {
        this.props.globalState.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    renderInputBlock(block) {
        switch (block.type) {
            case NodeRenderGraphBlockConnectionPointTypes.Texture: {
                return _jsx("div", {}, block.uniqueId);
            }
        }
        return null;
    }
    render() {
        return (_jsx(LineContainerComponent, { title: "INPUTS", children: this.props.inputs.map((ib) => {
                if (!ib.name) {
                    return null;
                }
                return this.renderInputBlock(ib);
            }) }));
    }
}
//# sourceMappingURL=inputsPropertyTabComponent.js.map