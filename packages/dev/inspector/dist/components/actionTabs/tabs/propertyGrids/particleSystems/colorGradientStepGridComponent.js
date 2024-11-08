import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ColorGradient, Color3Gradient } from "core/Misc/gradients";
import { Color3, Color4 } from "core/Maths/math.color";
import { ParticleSystem } from "core/Particles/particleSystem";
import { ColorPickerLine } from "shared-ui-components/lines/colorPickerComponent";
export class ColorGradientStepGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gradient: props.gradient.gradient };
    }
    updateColor1(color) {
        if (this.props.gradient instanceof ColorGradient) {
            this.props.gradient.color1 = Color4.FromHexString(color);
        }
        else {
            this.props.gradient.color = Color3.FromHexString(color);
        }
        this.props.onUpdateGradient();
        this.forceUpdate();
    }
    updateColor2(color) {
        if (this.props.gradient instanceof ColorGradient) {
            this.props.gradient.color2 = Color4.FromHexString(color);
        }
        this.props.onUpdateGradient();
        this.forceUpdate();
    }
    updateGradient(gradient) {
        this.props.gradient.gradient = gradient;
        this.setState({ gradient: gradient });
        this.props.onUpdateGradient();
    }
    onPointerUp() {
        this.props.onCheckForReOrder();
    }
    lock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = true;
        }
    }
    unlock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = false;
        }
    }
    render() {
        const gradient = this.props.gradient;
        return (_jsxs("div", { className: "gradient-step", children: [_jsx("div", { className: "step", children: `#${this.props.lineIndex}` }), _jsx("div", { className: "color1", children: _jsx(ColorPickerLine, { lockObject: this.props.lockObject, value: gradient instanceof Color3Gradient ? gradient.color : gradient.color1, onColorChanged: (color) => {
                            this.updateColor1(color);
                        } }) }), this.props.host instanceof ParticleSystem && gradient instanceof ColorGradient && (_jsx("div", { className: "color2", children: _jsx(ColorPickerLine, { lockObject: this.props.lockObject, value: gradient.color2 ? gradient.color2 : new Color4(), onColorChanged: (color) => {
                            this.updateColor2(color);
                        } }) })), _jsx("div", { className: "step-value", children: gradient.gradient.toFixed(2) }), _jsx("div", { className: "step-slider", children: _jsx("input", { className: "range", type: "range", step: 0.01, min: 0, max: 1.0, value: gradient.gradient, onPointerUp: () => this.onPointerUp(), onChange: (evt) => this.updateGradient(parseFloat(evt.target.value)) }) }), _jsx("div", { className: "gradient-delete hoverIcon", onClick: () => this.props.onDelete(), children: _jsx(FontAwesomeIcon, { icon: faTrash }) })] }));
    }
}
//# sourceMappingURL=colorGradientStepGridComponent.js.map