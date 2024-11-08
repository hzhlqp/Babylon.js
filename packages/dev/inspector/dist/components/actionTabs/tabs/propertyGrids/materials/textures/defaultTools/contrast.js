import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
class ContrastTool {
    constructor(getParameters) {
        this.contrast = 1.0;
        this.exposure = 1.0;
        this.getParameters = getParameters;
    }
    setExposure(exposure) {
        this.exposure = exposure;
        const { scene3D, updateTexture } = this.getParameters();
        scene3D.imageProcessingConfiguration.isEnabled = true;
        scene3D.imageProcessingConfiguration.exposure = this.computeExposure(this.exposure);
        updateTexture();
    }
    setContrast(contrast) {
        this.contrast = contrast;
        const { scene3D, updateTexture } = this.getParameters();
        scene3D.imageProcessingConfiguration.isEnabled = true;
        scene3D.imageProcessingConfiguration.contrast = this.computeContrast(contrast);
        updateTexture();
    }
    /**
     * Maps slider values to post processing values using an exponential regression
     * @param sliderValue
     * @returns exposure value
     */
    computeExposure(sliderValue) {
        if (sliderValue <= 0) {
            return 1 - -sliderValue / 100;
        }
        else {
            return Math.pow(1.05698, sliderValue) + 0.0000392163 * sliderValue;
        }
    }
    /**
     * Maps slider values to post processing values using an exponential regression
     * @param sliderValue
     * @returns contrast value
     */
    computeContrast(sliderValue) {
        if (sliderValue <= 0) {
            return 1 - -sliderValue / 100;
        }
        else {
            return Math.pow(1.05698, sliderValue) + 0.0000392163 * sliderValue;
        }
    }
    setup() {
        this.contrast = 0;
        this.exposure = 0;
        this.setExposure(this.exposure);
        this.setContrast(this.contrast);
    }
    cleanup() { }
    onReset() {
        this.setExposure(0);
        this.setContrast(0);
    }
}
class Settings extends React.Component {
    render() {
        const instance = this.props.instance;
        return (_jsxs("div", { children: [_jsx("div", { children: _jsxs("label", { className: "tool-slider-input", children: [_jsxs("span", { children: ["Contrast: ", instance.contrast] }), _jsx("input", { id: "contrast-slider", type: "range", min: -100, max: 100, value: instance.contrast, onChange: (evt) => {
                                    instance.setContrast(evt.target.valueAsNumber);
                                    this.forceUpdate();
                                } })] }) }), _jsx("div", { children: _jsxs("label", { className: "tool-slider-input", children: [_jsxs("span", { children: ["Exposure: ", instance.exposure] }), _jsx("input", { type: "range", min: -100, max: 100, value: instance.exposure, onChange: (evt) => {
                                    instance.setExposure(evt.target.valueAsNumber);
                                    this.forceUpdate();
                                } })] }) })] }));
    }
}
export const Contrast = {
    name: "Contrast/Exposure",
    type: ContrastTool,
    is3D: true,
    settingsComponent: Settings,
    icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0i
    NDAiIGhlaWdodD0iNDAiIHN0eWxlPSJmaWxsOm5vbmUiLz48cGF0aCBkPSJNMTcuNTUsMjYuNTVsOC41OS0zLjIxQTYuODYsNi44NiwwLDAsMSwyNCwyNS43NWwtMy4x
    OSwxLjE5QTcsNywwLDAsMSwxNy41NSwyNi41NVpNMjAsMTEuNUE4LjUsOC41LDAsMSwwLDI4LjUsMjAsOC41MSw4LjUxLDAsMCwwLDIwLDExLjVNMjAsMTBBMTAsMTAs
    MCwxLDEsMTAsMjAsMTAsMTAsMCwwLDEsMjAsMTBabS0yLjQ1LDUuMzQsNS0xLjg2QTcsNywwLDAsMCwxOS40NCwxM2wtMS44OS43MVptMCwzLjIsNy44OC0yLjk0YTYu
    ODgsNi44OCwwLDAsMC0xLjE5LTEuMTZsLTYuNjksMi41Wm0wLDMuMiw5LjIzLTMuNDRhNy42OCw3LjY4LDAsMCwwLS41Mi0xLjQxbC04LjcxLDMuMjVabTAsMS42djEu
    Nmw5LjI4LTMuNDZBNi42Nyw2LjY3LDAsMCwwLDI3LDE5LjgyWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==`,
};
//# sourceMappingURL=contrast.js.map