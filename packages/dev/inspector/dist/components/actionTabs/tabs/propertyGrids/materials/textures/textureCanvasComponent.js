import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class TextureCanvasComponent extends React.Component {
    render() {
        return (_jsxs("div", { children: [_jsx("canvas", { id: "canvas-ui", ref: this.props.canvasUI, tabIndex: 1 }), _jsx("canvas", { id: "canvas-2D", ref: this.props.canvas2D, hidden: true }), _jsx("canvas", { id: "canvas-3D", ref: this.props.canvas3D, hidden: true })] }));
    }
}
//# sourceMappingURL=textureCanvasComponent.js.map