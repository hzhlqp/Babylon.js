import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class IconComponent extends React.Component {
    render() {
        return _jsx("img", { src: this.props.icon, title: this.props.label, alt: this.props.label, color: "black", className: "icon", onDragStart: (evt) => evt.preventDefault() });
    }
}
//# sourceMappingURL=iconComponent.js.map