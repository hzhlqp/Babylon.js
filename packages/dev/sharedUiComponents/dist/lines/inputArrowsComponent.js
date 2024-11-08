import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import upArrowIcon from "./valueUpArrowIcon.svg";
import downArrowIcon from "./valueDownArrowIcon.svg";
export class InputArrowsComponent extends React.Component {
    constructor() {
        super(...arguments);
        this._arrowsRef = React.createRef();
        this._drag = (event) => {
            this.props.incrementValue(-event.movementY);
        };
        this._releaseListener = () => {
            this.props.setDragging(false);
            this._arrowsRef.current?.ownerDocument.exitPointerLock();
            this._arrowsRef.current?.ownerDocument.defaultView.removeEventListener("pointerup", this._releaseListener);
            this._arrowsRef.current?.ownerDocument.removeEventListener("pointerlockchange", this._lockChangeListener);
            this._arrowsRef.current?.ownerDocument.defaultView.removeEventListener("mousemove", this._drag);
        };
        this._lockChangeListener = () => {
            if (this._arrowsRef.current?.ownerDocument.pointerLockElement !== this._arrowsRef.current) {
                this._releaseListener();
            }
        };
    }
    render() {
        return (_jsxs("div", { className: "arrows", ref: this._arrowsRef, onPointerDown: () => {
                this._arrowsRef.current?.ownerDocument.addEventListener("pointerlockchange", this._lockChangeListener);
                this._arrowsRef.current?.ownerDocument.defaultView.addEventListener("pointerup", this._releaseListener);
                this._arrowsRef.current?.ownerDocument.defaultView.addEventListener("mousemove", this._drag);
                this.props.setDragging(true);
                this._arrowsRef.current?.requestPointerLock();
            }, onDragStart: (evt) => evt.preventDefault(), children: [_jsx("img", { className: "upArrowIcon", src: upArrowIcon, alt: "Increase Value" }), _jsx("img", { className: "downArrowIcon", src: downArrowIcon, alt: "Increase Value" })] }));
    }
}
//# sourceMappingURL=inputArrowsComponent.js.map