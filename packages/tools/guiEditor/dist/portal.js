import * as React from "react";
import * as ReactDOM from "react-dom";
export class Portal extends React.Component {
    render() {
        return ReactDOM.createPortal(this.props.children, this.props.globalState.hostElement);
    }
}
//# sourceMappingURL=portal.js.map