import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "./commonControlPropertyGridComponent";
import { SliderPropertyGridComponent } from "./sliderPropertyGridComponent";
export class SliderGenericPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const sliders = this.props.sliders;
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: sliders, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx(SliderPropertyGridComponent, { sliders: sliders, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=sliderGenericPropertyGridComponent.js.map