import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class VectorMergerPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const vectorMergerBlock = this.props.nodeData.data;
        const targetOptions = [
            { label: "X", value: "x" },
            { label: "Y", value: "y" },
            { label: "Z", value: "z" },
            { label: "W", value: "w" },
        ];
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "SWIZZLES", children: [_jsx(OptionsLine, { label: "X", options: targetOptions, target: vectorMergerBlock, propertyName: "xSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(vectorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "Y", options: targetOptions, target: vectorMergerBlock, propertyName: "ySwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(vectorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "Z", options: targetOptions, target: vectorMergerBlock, propertyName: "zSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(vectorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "W", options: targetOptions, target: vectorMergerBlock, propertyName: "wSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(vectorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } })] })] }));
    }
}
//# sourceMappingURL=vectorMergerPropertyComponent.js.map