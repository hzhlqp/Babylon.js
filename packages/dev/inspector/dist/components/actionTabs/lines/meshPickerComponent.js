import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class MeshPickerComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const meshEmitters = this.props.scene.meshes.filter((m) => !!m.name);
        meshEmitters.sort((a, b) => a.name.localeCompare(b.name));
        const emitterOptions = [{ label: "None", value: -1 }];
        meshEmitters.sort((a, b) => a.name.localeCompare(b.name));
        emitterOptions.push(...meshEmitters.map((v, i) => {
            return { label: v.name, value: i };
        }));
        return (_jsx(_Fragment, { children: _jsx(OptionsLine, { label: this.props.label, options: emitterOptions, target: this.props.target, propertyName: this.props.property, noDirectUpdate: true, onSelect: (value) => {
                    const currentState = this.props.target[this.props.property];
                    switch (value) {
                        case -1:
                            this.props.target[this.props.property] = null;
                            break;
                        default:
                            this.props.target[this.props.property] = meshEmitters[value];
                    }
                    if (this.props.onPropertyChangedObservable) {
                        this.props.onPropertyChangedObservable.notifyObservers({
                            object: this.props.target,
                            property: this.props.property,
                            value: this.props.target[this.props.property],
                            initialValue: currentState,
                        });
                    }
                    this.forceUpdate();
                }, extractValue: () => {
                    if (!this.props.target[this.props.property]) {
                        return -1;
                    }
                    const meshIndex = meshEmitters.indexOf(this.props.target[this.props.property]);
                    if (meshIndex > -1) {
                        return meshIndex;
                    }
                    return -1;
                } }) }));
    }
}
//# sourceMappingURL=meshPickerComponent.js.map