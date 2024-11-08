import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Color4 } from "core/Maths/math.color";
import { ColorPicker } from "shared-ui-components/colorPicker/colorPicker";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
export class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this._lockObject = new LockObject();
        this.state = {
            toolURL: "",
            addOpen: false,
        };
    }
    computeRGBAColor() {
        const opacityInt = Math.floor(this.props.metadata.alpha * 255);
        const opacityHex = opacityInt.toString(16).padStart(2, "0");
        return Color4.FromHexString(`${this.props.metadata.color}${opacityHex}`);
    }
    shouldComponentUpdate(nextProps) {
        return (nextProps.tools != this.props.tools ||
            nextProps.activeToolIndex !== this.props.activeToolIndex ||
            nextProps.metadata != this.props.metadata ||
            nextProps.pickerOpen != this.props.pickerOpen);
    }
    render() {
        return (_jsxs("div", { id: "toolbar", children: [_jsx("div", { id: "tools", children: this.props.tools.map((item, index) => {
                        return (_jsx("img", { src: `data:image/svg+xml;base64,${item.icon}`, className: index === this.props.activeToolIndex ? "icon button active" : "icon button", alt: item.name, title: item.name, onClick: (evt) => {
                                if (evt.button === 0) {
                                    this.props.changeTool(index);
                                }
                            } }, index));
                    }) }), _jsx("div", { id: "color", onClick: () => {
                        if (!this.props.pickerOpen)
                            this.props.setPickerOpen(true);
                    }, title: "Color", className: `icon button${this.props.pickerOpen ? ` active` : ``}`, children: _jsx("div", { id: "active-color-bg", children: _jsx("div", { id: "active-color", style: { backgroundColor: this.props.metadata.color, opacity: this.props.metadata.alpha } }) }) }), this.props.pickerOpen && (_jsx("div", { id: "color-picker", ref: this.props.pickerRef, children: _jsx(ColorPicker, { lockObject: this._lockObject, color: this.computeRGBAColor(), onColorChanged: (color) => {
                            const metadata = { color: color.toHexString(true), alpha: color.a };
                            if (metadata.color !== this.props.metadata.color || metadata.alpha !== this.props.metadata.alpha) {
                                this.props.setMetadata(metadata);
                            }
                        } }) }))] }));
    }
}
//# sourceMappingURL=toolBar.js.map