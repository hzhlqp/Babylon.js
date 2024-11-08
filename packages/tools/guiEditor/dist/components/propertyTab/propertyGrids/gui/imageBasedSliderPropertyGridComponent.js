import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { SliderPropertyGridComponent } from "./sliderPropertyGridComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import thumbImageLinkIcon from "shared-ui-components/imgs/thumbImageLinkIcon.svg";
import valueBarImageLinkIcon from "shared-ui-components/imgs/valueBarImageLinkIcon.svg";
import sliderBackgroundImageIcon from "shared-ui-components/imgs/sliderBackgroundImageIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
export class ImageBasedSliderPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const imageBasedSliders = this.props.imageBasedSliders;
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: imageBasedSliders, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "IMAGE LINKS", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: thumbImageLinkIcon, label: "Thumb Image Link" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, target: makeTargetsProxy(imageBasedSliders.map((slider) => slider.thumbImage), this.props.onPropertyChangedObservable), label: "", propertyName: "source" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: valueBarImageLinkIcon, label: "Value Bar Image Link" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, target: makeTargetsProxy(imageBasedSliders.map((slider) => slider.valueBarImage), this.props.onPropertyChangedObservable), label: "", propertyName: "source", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: sliderBackgroundImageIcon, label: "Background Image Link" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, target: makeTargetsProxy(imageBasedSliders.map((slider) => slider.backgroundImage), this.props.onPropertyChangedObservable), label: "", propertyName: "source", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsx(SliderPropertyGridComponent, { sliders: imageBasedSliders, lockObject: this.props.lockObject, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=imageBasedSliderPropertyGridComponent.js.map