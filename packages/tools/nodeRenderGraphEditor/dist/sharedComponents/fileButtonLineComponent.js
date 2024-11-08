import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class FileButtonLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._uploadRef = React.createRef();
    }
    onChange(evt) {
        const files = evt.target.files;
        if (files && files.length) {
            this.props.onClick(files[0]);
        }
        evt.target.value = "";
    }
    render() {
        return (_jsxs("div", { className: "buttonLine", children: [_jsx("label", { htmlFor: this.props.uploadName ? this.props.uploadName : "file-upload", className: "file-upload", children: this.props.label }), _jsx("input", { ref: this._uploadRef, id: this.props.uploadName ? this.props.uploadName : "file-upload", type: "file", accept: this.props.accept, onChange: (evt) => this.onChange(evt) })] }));
    }
}
//# sourceMappingURL=fileButtonLineComponent.js.map