import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class SoundPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const sound = this.props.sound;
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Class", value: sound.getClassName() }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: sound, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Status", value: sound.isPaused ? "Paused" : sound.isPlaying ? "Playing" : "Stopped" })] }), _jsxs(LineContainerComponent, { title: "COMMANDS", selection: this.props.globalState, children: [sound.isPlaying && (_jsx(ButtonLineComponent, { label: "Pause", onClick: () => {
                                sound.pause();
                                this.forceUpdate();
                            } })), !sound.isPlaying && (_jsx(ButtonLineComponent, { label: "Play", onClick: () => {
                                sound.play();
                                this.forceUpdate();
                            } })), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Volume", target: sound, directValue: sound.getVolume(), onChange: (value) => {
                                sound.setVolume(value);
                                this.forceUpdate();
                            }, minimum: 0, maximum: 5, step: 0.1, decimalCount: 1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Loop", target: sound, propertyName: "loop", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=soundPropertyGridComponent.js.map