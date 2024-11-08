import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class BottomBar extends React.PureComponent {
    render() {
        const factor = Math.pow(2, this.props.mipLevel);
        const width = Math.ceil(this.props.texture.getSize().width / factor);
        const height = Math.ceil(this.props.texture.getSize().height / factor);
        return (_jsxs("div", { id: "bottom-bar", children: [_jsx("span", { id: "file-url", children: this.props.texture.name }), !this.props.texture.noMipmap && (_jsxs("span", { id: "mip-level", children: ["MIP Preview: ", this.props.mipLevel, " ", width, "x", height] }))] }));
    }
}
//# sourceMappingURL=bottomBar.js.map