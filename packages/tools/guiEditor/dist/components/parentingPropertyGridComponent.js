import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { Tools } from "../tools";
import { Vector2 } from "core/Maths/math.vector";
export class ParentingPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    updateGridPosition() {
        const grid = this.props.control.parent;
        if (grid) {
            this._changeCell(grid, this.props.control, new Vector2(this._rowNumber, this._columnNumber));
        }
    }
    getCellInfo() {
        const cellInfo = Tools.GetCellInfo(this.props.control.parent, this.props.control);
        this._rowNumber = cellInfo.x;
        this._columnNumber = cellInfo.y;
    }
    _changeCell(grid, draggedControl, newCell) {
        const index = grid.children.indexOf(draggedControl);
        grid.removeControl(draggedControl);
        Tools.ReorderGrid(grid, index, draggedControl, newCell);
    }
    render() {
        this.getCellInfo();
        return (_jsxs("div", { className: "pane", children: [_jsx("hr", { className: "ge" }), _jsx(TextLineComponent, { tooltip: "", label: "GRID PARENTING", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Row #", target: this, propertyName: "_rowNumber", isInteger: true, min: 0, onChange: () => {
                                this.updateGridPosition();
                            } }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Column #", target: this, propertyName: "_columnNumber", isInteger: true, min: 0, onChange: () => {
                                this.updateGridPosition();
                            } })] })] }));
    }
}
//# sourceMappingURL=parentingPropertyGridComponent.js.map