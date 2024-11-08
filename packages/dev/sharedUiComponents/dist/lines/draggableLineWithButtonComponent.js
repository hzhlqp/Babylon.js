import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
export class DraggableLineWithButtonComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsxs("div", { className: "draggableLine withButton", title: this.props.tooltip, draggable: true, onDragStart: (event) => {
                event.dataTransfer.setData(this.props.format, this.props.data);
            }, children: [this.props.data.substring(0, this.props.data.length - (this.props.lenSuffixToRemove ?? 6)), _jsx("div", { className: "icon", onClick: () => {
                        this.props.onIconClick(this.props.data);
                    }, title: this.props.iconTitle, children: _jsx("img", { className: "img", title: this.props.iconTitle, src: this.props.iconImage }) })] }));
    }
}
//# sourceMappingURL=draggableLineWithButtonComponent.js.map