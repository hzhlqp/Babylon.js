import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DataStorage } from "core/Misc/dataStorage";
import downArrow from "../imgs/downArrow.svg";
export class LineContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        const initialState = DataStorage.ReadBoolean(this.props.title, !this.props.closed);
        this.state = { isExpanded: initialState };
    }
    switchExpandedState() {
        const newState = !this.state.isExpanded;
        DataStorage.WriteBoolean(this.props.title, newState);
        this.setState({ isExpanded: newState });
    }
    renderHeader() {
        const className = this.state.isExpanded ? "collapse" : "collapse closed";
        return (_jsxs("div", { className: "header", onClick: () => this.switchExpandedState(), children: [_jsx("div", { className: "title", children: this.props.title }), _jsx("div", { className: className, children: _jsx("img", { className: "img", title: this.props.title, src: downArrow }) })] }));
    }
    render() {
        if (!this.state.isExpanded) {
            return (_jsx("div", { className: "paneContainer", children: _jsx("div", { className: "paneContainer-content", children: this.renderHeader() }) }));
        }
        return (_jsx("div", { className: "paneContainer", children: _jsxs("div", { className: "paneContainer-content", children: [this.renderHeader(), _jsx("div", { className: "paneList", children: this.props.children })] }) }));
    }
}
//# sourceMappingURL=lineContainerComponent.js.map