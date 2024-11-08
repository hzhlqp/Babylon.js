import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import { GradientStepComponent } from "./gradientStepComponent";
import { Color3 } from "core/Maths/math.color";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
export class GradientPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this._gradientBlock = this.props.block;
    }
    forceRebuild() {
        this._gradientBlock.colorStepsUpdated();
        this.forceUpdate();
    }
    deleteStep(step) {
        const index = this._gradientBlock.colorSteps.indexOf(step);
        if (index > -1) {
            this._gradientBlock.colorSteps.splice(index, 1);
            this.forceRebuild();
        }
    }
    copyStep(step) {
        const gradientBlock = this.props.block;
        const newStep = new GradientBlockColorStep(1.0, step.color);
        gradientBlock.colorSteps.push(newStep);
        gradientBlock.colorStepsUpdated();
        this.forceRebuild();
        this.forceUpdate();
    }
    addNewStep() {
        const newStep = new GradientBlockColorStep(1.0, Color3.White());
        this._gradientBlock.colorSteps.push(newStep);
        this.forceRebuild();
    }
    checkForReOrder() {
        this._gradientBlock.colorSteps.sort((a, b) => {
            return a.step - b.step;
        });
        this.forceRebuild();
    }
    render() {
        return (_jsxs("div", { children: [_jsx(ButtonLineComponent, { label: "Add new step", onClick: () => this.addNewStep() }), this._gradientBlock.colorSteps.map((c, i) => {
                    return (_jsx(GradientStepComponent, { globalState: this.props.globalState, onCheckForReOrder: () => this.checkForReOrder(), onUpdateStep: () => this.forceRebuild(), lineIndex: i, step: c, onCopy: () => this.copyStep(c), onDelete: () => this.deleteStep(c) }, "step-" + i));
                })] }));
    }
}
//# sourceMappingURL=gradientNodePropertyComponent.js.map