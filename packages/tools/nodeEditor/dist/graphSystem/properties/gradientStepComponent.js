import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Color3 } from "core/Maths/math.color";
import deleteButton from "../../imgs/delete.svg";
import copyIcon from "shared-ui-components/imgs/copyStep.svg";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { ColorPickerLine } from "shared-ui-components/lines/colorPickerComponent";
export class GradientStepComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gradient: props.step.step };
    }
    updateColor(color) {
        this.props.step.color = Color3.FromHexString(color);
        this.props.onUpdateStep();
        this.forceUpdate();
    }
    updateStep(gradient) {
        this.props.step.step = gradient;
        this.setState({ gradient: gradient });
        this.props.onUpdateStep();
    }
    onPointerUp() {
        this.props.onCheckForReOrder();
    }
    render() {
        const step = this.props.step;
        return (_jsxs("div", { className: "gradient-step", children: [_jsx("div", { className: "step", children: `#${this.props.lineIndex}` }), _jsx("div", { className: "color", children: _jsx(ColorPickerLine, { lockObject: this.props.stateManager.lockObject, value: step.color, onColorChanged: (color) => {
                            this.updateColor(color);
                        } }) }), _jsx("div", { className: "step-value", children: _jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, smallUI: true, label: "", target: step, propertyName: "step", min: 0, max: 1, onEnter: () => {
                            this.props.onUpdateStep();
                            this.props.onCheckForReOrder();
                            this.forceUpdate();
                        } }) }), _jsx("div", { className: "step-slider", children: _jsx("input", { className: "range", type: "range", step: 0.01, min: 0, max: 1.0, value: step.step, onPointerUp: () => this.onPointerUp(), onChange: (evt) => this.updateStep(parseFloat(evt.target.value)) }) }), _jsx("div", { className: "gradient-copy", onClick: () => {
                        if (this.props.onCopy)
                            this.props.onCopy();
                    }, title: "Copy Step", children: _jsx("img", { className: "img", src: copyIcon }) }), _jsx("div", { className: "gradient-delete", onClick: () => this.props.onDelete(), title: "Delete Step", children: _jsx("img", { className: "img", src: deleteButton }) })] }));
    }
}
//# sourceMappingURL=gradientStepComponent.js.map