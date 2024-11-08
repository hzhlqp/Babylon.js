import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class ConeEmitterGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const emitter = this.props.emitter;
        return (_jsxs(_Fragment, { children: [_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Radius range", target: emitter, propertyName: "radiusRange", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Height range", target: emitter, propertyName: "heightRange", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Emit from spawn point only", target: emitter, propertyName: "emitFromSpawnPointOnly", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Direction randomizer", target: emitter, propertyName: "directionRandomizer", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=coneEmitterGridComponent.js.map