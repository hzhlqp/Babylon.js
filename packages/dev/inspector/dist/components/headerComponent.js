import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowRestore, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this._backStack = new Array();
        this.state = { isBackVisible: false };
    }
    componentDidMount() {
        if (!this.props.onSelectionChangedObservable) {
            return;
        }
        this._onSelectionChangeObserver = this.props.onSelectionChangedObservable.add((entity) => {
            if (this._backStack.length === 0 || entity !== this._backStack[this._backStack.length - 1]) {
                this._backStack.push(entity);
                this.setState({ isBackVisible: this._backStack.length > 1 });
            }
        });
    }
    componentWillUnmount() {
        if (this._onSelectionChangeObserver) {
            this.props.onSelectionChangedObservable.remove(this._onSelectionChangeObserver);
        }
    }
    goBack() {
        this._backStack.pop(); // remove current
        const entity = this._backStack[this._backStack.length - 1];
        if (this.props.onSelectionChangedObservable) {
            this.props.onSelectionChangedObservable.notifyObservers(entity);
        }
        this.setState({ isBackVisible: this._backStack.length > 1 });
    }
    renderLogo() {
        if (this.props.noCommands) {
            return null;
        }
        if (this.props.handleBack) {
            if (!this.state.isBackVisible) {
                return null;
            }
            return (_jsx("div", { id: "back", onClick: () => this.goBack(), children: _jsx(FontAwesomeIcon, { icon: faArrowLeft }) }));
        }
        return _jsx("img", { id: "logo", style: { top: "0%" }, src: "https://www.babylonjs.com/Assets/logo-babylonjs-social-twitter.png" });
    }
    render() {
        return (_jsxs("div", { id: "header", children: [this.renderLogo(), _jsx("div", { id: "title", children: this.props.title }), _jsxs("div", { id: "commands", children: [!this.props.noCommands && !this.props.noExpand && (_jsx("div", { className: "expand", onClick: () => this.props.onPopup(), children: _jsx(FontAwesomeIcon, { icon: faWindowRestore }) })), !this.props.noCommands && !this.props.noClose && (_jsx("div", { className: "close", onClick: () => this.props.onClose(), children: _jsx(FontAwesomeIcon, { icon: faTimes }) }))] })] }));
    }
}
//# sourceMappingURL=headerComponent.js.map