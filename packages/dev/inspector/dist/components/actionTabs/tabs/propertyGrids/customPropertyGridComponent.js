import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Color3LineComponent } from "shared-ui-components/lines/color3LineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { Vector2LineComponent } from "shared-ui-components/lines/vector2LineComponent";
import { Vector3LineComponent } from "shared-ui-components/lines/vector3LineComponent";
import { QuaternionLineComponent } from "../../lines/quaternionLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { Logger } from "core/Misc/logger";
export class CustomPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mode: 0 };
    }
    renderInspectable(inspectable) {
        switch (inspectable.type) {
            case 0 /* InspectableType.Checkbox */:
                return (_jsx(CheckBoxLineComponent, { label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 1 /* InspectableType.Slider */:
                return (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, step: inspectable.step !== undefined ? inspectable.step : 0.1, minimum: inspectable.min !== undefined ? inspectable.min : 0, maximum: inspectable.max !== undefined ? inspectable.max : 1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 10 /* InspectableType.Vector2 */:
                return (_jsx(Vector2LineComponent, { lockObject: this.props.lockObject, label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 2 /* InspectableType.Vector3 */:
                return (_jsx(Vector3LineComponent, { lockObject: this.props.lockObject, label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 3 /* InspectableType.Quaternion */:
                return (_jsx(QuaternionLineComponent, { lockObject: this.props.lockObject, useEuler: this.props.globalState.onlyUseEulers, label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 4 /* InspectableType.Color3 */:
                return (_jsx(Color3LineComponent, { lockObject: this.props.lockObject, label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 5 /* InspectableType.String */:
                return (_jsx(TextInputLineComponent, { label: inspectable.label, lockObject: this.props.lockObject, target: this.props.target, propertyName: inspectable.propertyName, onPropertyChangedObservable: this.props.onPropertyChangedObservable }, inspectable.label));
            case 6 /* InspectableType.Button */:
                return (_jsx(ButtonLineComponent, { label: inspectable.label, onClick: inspectable.callback ||
                        function () {
                            Logger.Warn("no call back function added");
                        } }, inspectable.label));
            case 7 /* InspectableType.Options */:
                return (_jsx(OptionsLine, { label: inspectable.label, target: this.props.target, propertyName: inspectable.propertyName, options: inspectable.options || [], onSelect: inspectable.callback ||
                        function (value) {
                            Logger.Warn(`Option ${value} is selected`);
                        } }, inspectable.label));
            case 8 /* InspectableType.Tab */:
                return _jsx(TextLineComponent, { label: inspectable.label, value: " " }, inspectable.label);
            case 9 /* InspectableType.FileButton */:
                return (_jsx(FileButtonLine, { label: inspectable.label, onClick: inspectable.fileCallback ||
                        function () {
                            Logger.Warn("no file call back function added");
                        }, accept: inspectable.accept || "*" }, inspectable.label));
        }
        return null;
    }
    render() {
        const inspectables = this.props.target.inspectableCustomProperties;
        if (!inspectables || inspectables.length === 0) {
            return null;
        }
        return (_jsx(LineContainerComponent, { title: "CUSTOM", selection: this.props.globalState, children: inspectables.map((inspectable) => {
                return this.renderInspectable(inspectable);
            }) }));
    }
}
//# sourceMappingURL=customPropertyGridComponent.js.map