import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class TeleportOutPropertyTabComponent extends React.Component {
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
        const block = this.props.nodeData.data;
        const options = [{ label: "None", value: -1 }];
        const teleporters = [];
        const nodeGeometry = this.props.stateManager.data.nodeGeometry;
        for (const block of nodeGeometry.attachedBlocks) {
            if (block.getClassName() === "TeleportInBlock") {
                teleporters.push(block);
            }
        }
        teleporters.sort((a, b) => a.name.localeCompare(b.name));
        for (const block of teleporters) {
            options.push({ label: block.name, value: block.uniqueId });
        }
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsx(LineContainerComponent, { title: "PROPERTIES", children: _jsx(OptionsLine, { label: "Entry point", options: options, target: block, propertyName: "entryPoint", noDirectUpdate: true, onSelect: (value) => {
                            switch (value) {
                                case -1:
                                    block.detach();
                                    break;
                                default: {
                                    const source = teleporters.find((t) => t.uniqueId === value);
                                    source?.attachToEndpoint(block);
                                }
                            }
                            this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            this.forceUpdate();
                        }, extractValue: () => {
                            if (!block.entryPoint) {
                                return -1;
                            }
                            return block.entryPoint?.uniqueId;
                        } }) })] }));
    }
}
//# sourceMappingURL=teleportOutNodePropertyComponent.js.map