import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styles from "./FileButtonLineComponent.modules.scss";
export class FileButtonLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this._id = FileButtonLineComponent._IDGenerator++;
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
        return (_jsxs("div", { className: styles.buttonLine, children: [this.props.icon && _jsx("img", { src: this.props.icon, title: this.props.iconLabel, alt: this.props.iconLabel }), _jsx("label", { htmlFor: "file-upload" + this._id, className: styles.fileUpload, children: this.props.label }), _jsx("input", { ref: this._uploadInputRef, id: "file-upload" + this._id, type: "file", accept: this.props.accept, onChange: (evt) => this.onChange(evt) })] }));
    }
}
FileButtonLineComponent._IDGenerator = 0;
//# sourceMappingURL=FileButtonLineComponent.js.map