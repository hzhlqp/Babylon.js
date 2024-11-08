import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { ColorLine } from "./colorLineComponent";
export class Color3LineComponent extends React.Component {
    render() {
        const props = this.props;
        return _jsx(ColorLine, { disableAlpha: true, ...props });
    }
}
//# sourceMappingURL=color3LineComponent.js.map