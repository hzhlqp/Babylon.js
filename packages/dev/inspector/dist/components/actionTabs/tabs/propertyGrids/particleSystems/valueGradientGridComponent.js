import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FactorGradient, ColorGradient, Color3Gradient } from "core/Misc/gradients";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { FactorGradientStepGridComponent } from "./factorGradientStepGridComponent";
import { ColorGradientStepGridComponent } from "./colorGradientStepGridComponent";
import { Color4, Color3 } from "core/Maths/math.color";
import { LinkButtonComponent } from "shared-ui-components/lines/linkButtonComponent";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export var GradientGridMode;
(function (GradientGridMode) {
    GradientGridMode[GradientGridMode["Factor"] = 0] = "Factor";
    GradientGridMode[GradientGridMode["Color3"] = 1] = "Color3";
    GradientGridMode[GradientGridMode["Color4"] = 2] = "Color4";
})(GradientGridMode || (GradientGridMode = {}));
export class ValueGradientGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    deleteStep(step) {
        const gradients = this.props.gradients;
        const index = gradients.indexOf(step);
        if (index > -1) {
            gradients.splice(index, 1);
            this.updateAndSync();
        }
    }
    addNewStep() {
        const gradients = this.props.gradients;
        switch (this.props.mode) {
            case GradientGridMode.Factor: {
                const newStep = new FactorGradient(1, 1, 1);
                gradients.push(newStep);
                break;
            }
            case GradientGridMode.Color4: {
                const newStepColor = new ColorGradient(1, new Color4(1, 1, 1, 1), new Color4(1, 1, 1, 1));
                gradients.push(newStepColor);
                break;
            }
            case GradientGridMode.Color3: {
                const newStepColor3 = new Color3Gradient(1, Color3.White());
                gradients.push(newStepColor3);
                break;
            }
        }
        this.props.host.forceRefreshGradients();
        this.forceUpdate();
    }
    checkForReOrder() {
        const gradients = this.props.gradients;
        gradients.sort((a, b) => {
            if (a.gradient === b.gradient) {
                return 0;
            }
            if (a.gradient > b.gradient) {
                return 1;
            }
            return -1;
        });
        this.forceUpdate();
    }
    updateAndSync() {
        this.props.host.forceRefreshGradients();
        this.forceUpdate();
    }
    render() {
        const gradients = this.props.gradients;
        return (_jsxs("div", { children: [gradients && gradients.length > 0 && (_jsxs("div", { className: "gradient-container", children: [_jsx(LinkButtonComponent, { label: this.props.label, url: this.props.docLink, icon: faTrash, onIconClick: () => {
                                gradients.length = 0;
                                this.updateAndSync();
                            }, buttonLabel: "Add new step", onClick: () => this.addNewStep() }), gradients.map((g, i) => {
                            const codeRecorderPropertyName = this.props.codeRecorderPropertyName + `[${i}]`;
                            switch (this.props.mode) {
                                case GradientGridMode.Factor:
                                    return (_jsx(FactorGradientStepGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, onCheckForReOrder: () => this.checkForReOrder(), onUpdateGradient: () => this.updateAndSync(), host: this.props.host, codeRecorderPropertyName: codeRecorderPropertyName, lineIndex: i, gradient: g, onDelete: () => this.deleteStep(g) }, "step-" + i));
                                case GradientGridMode.Color4:
                                    return (_jsx(ColorGradientStepGridComponent, { globalState: this.props.globalState, host: this.props.host, codeRecorderPropertyName: codeRecorderPropertyName, lockObject: this.props.lockObject, isColor3: false, onCheckForReOrder: () => this.checkForReOrder(), onUpdateGradient: () => this.updateAndSync(), lineIndex: i, gradient: g, onDelete: () => this.deleteStep(g) }, "step-" + i));
                                case GradientGridMode.Color3:
                                    return (_jsx(ColorGradientStepGridComponent, { globalState: this.props.globalState, host: this.props.host, codeRecorderPropertyName: codeRecorderPropertyName, lockObject: this.props.lockObject, isColor3: true, onCheckForReOrder: () => this.checkForReOrder(), onUpdateGradient: () => this.updateAndSync(), lineIndex: i, gradient: g, onDelete: () => this.deleteStep(g) }, "step-" + i));
                            }
                        })] })), (!gradients || gradients.length === 0) && (_jsx(ButtonLineComponent, { label: "Use " + this.props.label, onClick: () => {
                        this.props.onCreateRequired();
                        this.forceUpdate();
                    } }))] }));
    }
}
//# sourceMappingURL=valueGradientGridComponent.js.map