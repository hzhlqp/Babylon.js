import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class DraggableLineComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsx("div", { className: "draggableLine", title: this.props.tooltip, draggable: true, onDragStart: (event) => {
                event.dataTransfer.setData("babylonjs-render-graph-node", this.props.data);
            }, children: this.props.data.replace("Block", "") }));
    }
}
//# sourceMappingURL=draggableLineComponent.js.map