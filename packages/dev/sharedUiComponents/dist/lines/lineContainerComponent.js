import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DataStorage } from "core/Misc/dataStorage";
import downArrow from "./downArrow.svg";
export class LineContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        const initialState = DataStorage.ReadBoolean(this.props.title, !this.props.closed);
        this.state = { isExpanded: initialState, isHighlighted: false };
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
    componentDidMount() {
        if (!this.props.selection) {
            return;
        }
        if (this.props.selection.selectedLineContainerTitles.length === 0 && this.props.selection.selectedLineContainerTitlesNoFocus.length === 0) {
            return;
        }
        if (this.props.selection.selectedLineContainerTitles.indexOf(this.props.title) > -1) {
            setTimeout(() => {
                this.props.selection.selectedLineContainerTitles = [];
            });
            this.setState({ isExpanded: true, isHighlighted: true });
            window.setTimeout(() => {
                this.setState({ isHighlighted: false });
            }, 5000);
        }
        else if (this.props.selection.selectedLineContainerTitlesNoFocus.indexOf(this.props.title) > -1) {
            setTimeout(() => {
                this.props.selection.selectedLineContainerTitlesNoFocus = [];
            });
            this.setState({ isExpanded: true, isHighlighted: false });
        }
        else {
            this.setState({ isExpanded: false });
        }
    }
    render() {
        if (!this.state.isExpanded) {
            return (_jsx("div", { className: "paneContainer", children: _jsx("div", { className: "paneContainer-content", children: this.renderHeader() }) }));
        }
        return (_jsxs("div", { className: "paneContainer", children: [_jsxs("div", { className: "paneContainer-content", children: [this.renderHeader(), _jsx("div", { className: "paneList", children: this.props.children })] }), _jsx("div", { className: "paneContainer-highlight-border" + (!this.state.isHighlighted ? " transparent" : "") })] }));
    }
}
//# sourceMappingURL=lineContainerComponent.js.map