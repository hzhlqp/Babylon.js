import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
export class SphereEmitterGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const emitter = this.props.emitter;
        return (_jsxs(_Fragment, { children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Radius", target: emitter, propertyName: "radius", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Radius range", target: emitter, propertyName: "radiusRange", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Direction randomizer", target: emitter, propertyName: "directionRandomizer", minimum: 0, maximum: 1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=sphereEmitterGridComponent.js.map