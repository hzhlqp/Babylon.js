import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { CustomPropertyGridComponent } from "../customPropertyGridComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { AnimationGridComponent } from "../animations/animationPropertyGridComponent";
import { ParentPropertyGridComponent } from "../parentPropertyGridComponent";
export class CommonLightPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const light = this.props.light;
        return (_jsxs("div", { children: [_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, target: light, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "ID", value: light.id }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: light, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Unique ID", value: light.uniqueId.toString() }), _jsx(TextLineComponent, { label: "Class", value: light.getClassName() }), _jsx(ParentPropertyGridComponent, { globalState: this.props.globalState, node: light, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Intensity", target: light, propertyName: "intensity", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => {
                                light.dispose();
                                this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
                            } })] }), _jsx(AnimationGridComponent, { globalState: this.props.globalState, animatable: light, scene: light.getScene(), lockObject: this.props.lockObject })] }));
    }
}
//# sourceMappingURL=commonLightPropertyGridComponent.js.map