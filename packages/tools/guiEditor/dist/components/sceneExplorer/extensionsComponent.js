import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
export class ExtensionsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { popupVisible: false };
        this._extensionRef = React.createRef();
    }
    showPopup() {
        this.setState({ popupVisible: true });
    }
    componentDidMount() {
        if (!this._popup) {
            return;
        }
        this._popup.focus();
    }
    componentDidUpdate() {
        if (!this._popup) {
            return;
        }
        this._popup.focus();
    }
    render() {
        if (!this.props.extensibilityGroups) {
            return null;
        }
        const options = [];
        for (const group of this.props.extensibilityGroups) {
            if (group.predicate(this.props.target)) {
                options.push(...group.entries);
            }
        }
        if (options.length === 0) {
            return null;
        }
        return (_jsxs("div", { ref: this._extensionRef, className: "extensions", onClick: () => this.showPopup(), children: [_jsx("div", { title: "Additional options", className: "icon", children: _jsx(FontAwesomeIcon, { icon: faEllipsisH }) }), _jsx("div", { ref: (input) => {
                        this._popup = input;
                    }, tabIndex: -1, className: this.state.popupVisible ? "popup show" : "popup", onBlur: () => this.setState({ popupVisible: false }), children: options.map((extensibility) => {
                        return (_jsx("div", { className: "popupMenu", onClick: () => extensibility.action(this.props.target), children: extensibility.label }, extensibility.label));
                    }) })] }));
    }
}
//# sourceMappingURL=extensionsComponent.js.map