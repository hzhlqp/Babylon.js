import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class PushButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPushed: !!this.props.isPushed };
    }
    render() {
        return (_jsx("div", { title: this.props.tooltip, className: "push-button" + (this.state.isPushed ? " active" : "") + (this.props.className ? " " + this.props.className : ""), id: this.props.id, onClick: () => {
                this.props.onClick(!this.state.isPushed);
                this.setState({ isPushed: !this.state.isPushed });
            }, children: _jsx("img", { className: "push-button-image", src: this.props.icon }) }));
    }
}
//# sourceMappingURL=pushButtonComponent.js.map