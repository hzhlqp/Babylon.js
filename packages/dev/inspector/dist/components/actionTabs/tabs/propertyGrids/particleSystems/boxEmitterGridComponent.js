import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
export class BoxEmitterGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const emitter = this.props.emitter;
        return (_jsxs(_Fragment, { children: [_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction 1", target: emitter, propertyName: "direction1", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Direction 2", target: emitter, propertyName: "direction2", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Min emit box", target: emitter, propertyName: "minEmitBox", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: "Max emit box", target: emitter, propertyName: "maxEmitBox", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=boxEmitterGridComponent.js.map