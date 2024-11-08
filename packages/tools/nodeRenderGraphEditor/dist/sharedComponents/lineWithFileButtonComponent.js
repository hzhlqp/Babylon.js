import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DataStorage } from "core/Misc/dataStorage";
export class LineWithFileButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        const initialState = DataStorage.ReadBoolean(this.props.title, !this.props.closed);
        this.state = { isExpanded: initialState };
        this._uploadRef = React.createRef();
    }
    onChange(evt) {
        const files = evt.target.files;
        if (files && files.length) {
            this.props.onIconClick(files[0]);
        }
        evt.target.value = "";
    }
    switchExpandedState() {
        const newState = !this.state.isExpanded;
        DataStorage.WriteBoolean(this.props.title, newState);
        this.setState({ isExpanded: newState });
    }
    render() {
        return (_jsxs("div", { className: "nonDraggableLine withButton", children: [this.props.label, _jsx("div", { className: "icon", title: this.props.title, children: _jsx("img", { className: "img", src: this.props.iconImage }) }), _jsxs("div", { className: "buttonLine", title: this.props.title, children: [_jsx("label", { htmlFor: this.props.uploadName ? this.props.uploadName : "file-upload", className: "file-upload" }), _jsx("input", { ref: this._uploadRef, id: this.props.uploadName ? this.props.uploadName : "file-upload", type: "file", accept: this.props.accept, onChange: (evt) => this.onChange(evt) })] })] }));
    }
}
//# sourceMappingURL=lineWithFileButtonComponent.js.map