import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Matrix, Quaternion } from "core/Maths/math.vector";
import { Vector4LineComponent } from "./vector4LineComponent";
import { OptionsLine } from "./optionsLineComponent";
import { SliderLineComponent } from "./sliderLineComponent";
export class MatrixLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._localChange = false;
        const matrix = this.props.target[this.props.propertyName].clone();
        let angle = 0;
        if (this.props.mode) {
            const quat = new Quaternion();
            matrix.decompose(undefined, quat);
            const euler = quat.toEulerAngles();
            switch (this.props.mode) {
                case 1:
                    angle = euler.x;
                    break;
                case 2:
                    angle = euler.y;
                    break;
                case 3:
                    angle = euler.z;
                    break;
            }
        }
        this.state = { value: matrix, mode: this.props.mode || 0, angle: angle };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const nextPropsValue = nextProps.target[nextProps.propertyName];
        if (!nextPropsValue.equals(nextState.value) || this._localChange) {
            nextState.value = nextPropsValue.clone();
            this._localChange = false;
            return true;
        }
        return nextState.mode !== this.state.mode || nextState.angle !== this.state.angle;
    }
    raiseOnPropertyChanged(previousValue) {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
        if (!this.props.onPropertyChangedObservable) {
            return;
        }
        this.props.onPropertyChangedObservable.notifyObservers({
            object: this.props.target,
            property: this.props.propertyName,
            value: this.state.value,
            initialValue: previousValue,
        });
    }
    updateMatrix() {
        const store = this.props.target[this.props.propertyName].clone();
        this.props.target[this.props.propertyName] = this.state.value;
        this.setState({ value: store });
        this.raiseOnPropertyChanged(store);
    }
    updateRow(value, row) {
        this._localChange = true;
        this.state.value.setRow(row, value);
        this.updateMatrix();
    }
    updateBasedOnMode(value) {
        switch (this.state.mode) {
            case 1: {
                Matrix.RotationXToRef(this.state.angle, this.state.value);
                break;
            }
            case 2: {
                Matrix.RotationYToRef(this.state.angle, this.state.value);
                break;
            }
            case 3: {
                Matrix.RotationZToRef(this.state.angle, this.state.value);
                break;
            }
        }
        this.updateMatrix();
        this.setState({ angle: value });
    }
    render() {
        const modeOptions = [
            { label: "User-defined", value: 0 },
            { label: "Rotation over X axis", value: 1 },
            { label: "Rotation over Y axis", value: 2 },
            { label: "Rotation over Z axis", value: 3 },
        ];
        return (_jsxs("div", { className: "vector3Line", children: [_jsx("div", { className: "firstLine", children: _jsx("div", { className: "label", title: this.props.label, children: this.props.label }) }), _jsx("div", { className: "secondLine", children: _jsx(OptionsLine, { label: "Mode", className: "no-right-margin", options: modeOptions, target: this, noDirectUpdate: true, propertyName: "", extractValue: () => {
                            return this.state.mode;
                        }, onSelect: (value) => {
                            this.props.target[this.props.propertyName] = Matrix.Identity();
                            Matrix.IdentityToRef(this.state.value);
                            this.setState({ mode: value, angle: 0 });
                            this.updateMatrix();
                            if (this.props.onModeChange) {
                                this.props.onModeChange(value);
                            }
                        } }) }), this.state.mode === 0 && (_jsxs("div", { className: "secondLine", children: [_jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: "Row #0", value: this.state.value.getRow(0), onChange: (value) => this.updateRow(value, 0) }), _jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: "Row #1", value: this.state.value.getRow(1), onChange: (value) => this.updateRow(value, 1) }), _jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: "Row #2", value: this.state.value.getRow(2), onChange: (value) => this.updateRow(value, 2) }), _jsx(Vector4LineComponent, { lockObject: this.props.lockObject, label: "Row #3", value: this.state.value.getRow(3), onChange: (value) => this.updateRow(value, 3) })] })), this.state.mode !== 0 && (_jsx("div", { className: "secondLine", children: _jsx(SliderLineComponent, { label: "Angle", lockObject: this.props.lockObject, minimum: 0, maximum: 2 * Math.PI, useEuler: true, step: 0.1, directValue: this.state.angle, onChange: (value) => this.updateBasedOnMode(value) }) }))] }));
    }
}
//# sourceMappingURL=matrixLineComponent.js.map