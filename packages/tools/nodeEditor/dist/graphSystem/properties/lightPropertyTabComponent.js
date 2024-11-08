import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class LightPropertyTabComponent extends React.Component {
    render() {
        const scene = this.props.stateManager.data.nodeMaterial.getScene();
        const lightOptions = scene.lights.map((l) => {
            return { label: l.name, value: l.name };
        });
        lightOptions.splice(0, 0, { label: "All", value: "" });
        const lightBlock = this.props.nodeData.data;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsx(LineContainerComponent, { title: "PROPERTIES", children: _jsx(OptionsLine, { label: "Light", defaultIfNull: 0, noDirectUpdate: true, valuesAreStrings: true, options: lightOptions, target: lightBlock, propertyName: "name", onSelect: (name) => {
                            if (name === "") {
                                lightBlock.light = null;
                            }
                            else {
                                lightBlock.light = scene.getLightByName(name);
                            }
                            this.forceUpdate();
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                        } }) })] }));
    }
}
//# sourceMappingURL=lightPropertyTabComponent.js.map