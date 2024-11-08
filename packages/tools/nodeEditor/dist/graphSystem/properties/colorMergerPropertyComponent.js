import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class ColorMergerPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const colorMergerBlock = this.props.nodeData.data;
        const targetOptions = [
            { label: "R", value: "r" },
            { label: "G", value: "g" },
            { label: "B", value: "b" },
            { label: "A", value: "a" },
        ];
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "SWIZZLES", children: [_jsx(OptionsLine, { label: "R", options: targetOptions, target: colorMergerBlock, propertyName: "rSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(colorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "G", options: targetOptions, target: colorMergerBlock, propertyName: "gSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(colorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "B", options: targetOptions, target: colorMergerBlock, propertyName: "bSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(colorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } }), _jsx(OptionsLine, { label: "A", options: targetOptions, target: colorMergerBlock, propertyName: "aSwizzle", valuesAreStrings: true, onSelect: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(colorMergerBlock);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            } })] })] }));
    }
}
//# sourceMappingURL=colorMergerPropertyComponent.js.map