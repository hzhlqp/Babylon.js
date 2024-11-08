import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class IconButtonLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsx("div", { style: { backgroundColor: this.props.active ? "#111111" : "" }, title: this.props.tooltip, className: `icon ${this.props.icon}`, onClick: () => this.props.onClick() }));
    }
}
//# sourceMappingURL=iconButtonLineComponent.js.map