import * as React from "react";
import * as ReactDOM from "react-dom";
import { Inspector } from "../inspector";
import { Logger } from "core/Misc/logger";
export class PopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onBeforeUnloadListener = () => {
            if (this._window) {
                this._window.close();
            }
        };
        this._container = document.createElement("div");
        this._container.id = this.props.id;
        this._window;
        this.state = {
            isComponentMounted: false,
            blockedByBrowser: false,
        };
    }
    componentDidMount() {
        this.openPopup();
        this.setState({ isComponentMounted: true });
    }
    openPopup() {
        const { title, size, onClose, onOpen } = this.props;
        const windowVariableName = `window_${title}`;
        this._container = Inspector._CreatePopup(title, windowVariableName, size.width, size.height, true);
        if (this._container) {
            this._host = this._container.ownerDocument.createElement("div");
            this._host.id = "host";
            this._host.style.width = "auto";
            this._container.appendChild(this._host);
        }
        this._window = Inspector[windowVariableName];
        window.addEventListener("beforeunload", this.onBeforeUnloadListener);
        if (this._window) {
            if (onOpen) {
                onOpen(this._window);
            }
            this._window.addEventListener("keyup", (evt) => {
                if (this.props.onKeyUp) {
                    this.props.onKeyUp(evt);
                }
            });
            this._window.addEventListener("keydown", (evt) => {
                if (this.props.onKeyDown) {
                    this.props.onKeyDown(evt);
                }
            });
            this._window.addEventListener("beforeunload", () => this._window && onClose(this._window));
            this._window.addEventListener("resize", () => {
                if (this.props.onResize) {
                    this._window && this.props.onResize(this._window);
                }
            });
        }
        else {
            if (!this._window) {
                this.setState({ blockedByBrowser: true }, () => {
                    if (this.state.blockedByBrowser) {
                        Logger.Warn("Popup window couldn't be created");
                    }
                });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onBeforeUnloadListener);
        if (this._window) {
            this._window.close();
        }
    }
    getWindow() {
        return this._window;
    }
    render() {
        if (!this.state.isComponentMounted || this._container === null) {
            return null;
        }
        return ReactDOM.createPortal(this.props.children, this._host);
    }
}
//# sourceMappingURL=popupComponent.js.map