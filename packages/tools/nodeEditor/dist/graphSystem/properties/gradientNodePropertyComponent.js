import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import { GradientStepComponent } from "./gradientStepComponent";
import { Color3 } from "core/Maths/math.color";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class GradientPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const gradientBlock = this.props.nodeData.data;
        this._onValueChangedObserver = gradientBlock.onValueChangedObservable.add(() => {
            this.forceUpdate();
            this.props.stateManager.onUpdateRequiredObservable.notifyObservers(gradientBlock);
        });
    }
    componentWillUnmount() {
        const gradientBlock = this.props.nodeData.data;
        if (this._onValueChangedObserver) {
            gradientBlock.onValueChangedObservable.remove(this._onValueChangedObserver);
            this._onValueChangedObserver = null;
        }
    }
    forceRebuild() {
        this.props.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.nodeData.data);
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    deleteStep(step) {
        const gradientBlock = this.props.nodeData.data;
        const index = gradientBlock.colorSteps.indexOf(step);
        if (index > -1) {
            gradientBlock.colorSteps.splice(index, 1);
            gradientBlock.colorStepsUpdated();
            this.forceRebuild();
            this.forceUpdate();
        }
    }
    copyStep(step) {
        const gradientBlock = this.props.nodeData.data;
        const newStep = new GradientBlockColorStep(1.0, step.color);
        gradientBlock.colorSteps.push(newStep);
        gradientBlock.colorStepsUpdated();
        this.forceRebuild();
        this.forceUpdate();
    }
    addNewStep() {
        const gradientBlock = this.props.nodeData.data;
        const newStep = new GradientBlockColorStep(1.0, Color3.White());
        gradientBlock.colorSteps.push(newStep);
        gradientBlock.colorStepsUpdated();
        this.forceRebuild();
        this.forceUpdate();
    }
    checkForReOrder() {
        const gradientBlock = this.props.nodeData.data;
        gradientBlock.colorSteps.sort((a, b) => {
            if (a.step === b.step) {
                return 0;
            }
            if (a.step > b.step) {
                return 1;
            }
            return -1;
        });
        gradientBlock.colorStepsUpdated();
        this.props.stateManager.onUpdateRequiredObservable.notifyObservers(gradientBlock);
        this.forceUpdate();
    }
    render() {
        const gradientBlock = this.props.nodeData.data;
        const typeOptions = [
            { label: "None", value: 0 },
            { label: "Visible in the inspector", value: 1 },
        ];
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsx(LineContainerComponent, { title: "PROPERTIES", children: _jsx(OptionsLine, { label: "Type", options: typeOptions, target: gradientBlock, noDirectUpdate: true, extractValue: (block) => {
                            if (block.visibleInInspector) {
                                return 1;
                            }
                            if (block.isConstant) {
                                return 2;
                            }
                            return 0;
                        }, onSelect: (value) => {
                            switch (value) {
                                case 0:
                                    gradientBlock.visibleInInspector = false;
                                    break;
                                case 1:
                                    gradientBlock.visibleInInspector = true;
                                    break;
                            }
                            this.forceUpdate();
                            this.props.stateManager.onUpdateRequiredObservable.notifyObservers(gradientBlock);
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                        }, propertyName: "" }) }), _jsxs(LineContainerComponent, { title: "STEPS", children: [_jsx(ButtonLineComponent, { label: "Add new step", onClick: () => this.addNewStep() }), gradientBlock.colorSteps.map((c, i) => {
                            return (_jsx(GradientStepComponent, { stateManager: this.props.stateManager, onCheckForReOrder: () => this.checkForReOrder(), onUpdateStep: () => this.forceRebuild(), lineIndex: i, step: c, onCopy: () => this.copyStep(c), onDelete: () => this.deleteStep(c) }, "step-" + i));
                        })] })] }));
    }
}
//# sourceMappingURL=gradientNodePropertyComponent.js.map