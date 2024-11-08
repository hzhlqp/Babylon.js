import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class FileButtonLine extends React.Component {
    constructor(props) {
        super(props);
        this._id = FileButtonLine._IDGenerator++;
        this._uploadInputRef = React.createRef();
    }
    onChange(evt) {
        const files = evt.target.files;
        if (files && files.length) {
            this.props.onClick(files[0]);
        }
        evt.target.value = "";
    }
    render() {
        return (_jsxs("div", { className: "buttonLine", children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel, className: "icon" }), _jsx("label", { htmlFor: "file-upload" + this._id, className: "file-upload", children: this.props.label }), _jsx("input", { ref: this._uploadInputRef, id: "file-upload" + this._id, type: "file", accept: this.props.accept, onChange: (evt) => this.onChange(evt) })] }));
    }
}
FileButtonLine._IDGenerator = 0;
//# sourceMappingURL=fileButtonLineComponent.js.map