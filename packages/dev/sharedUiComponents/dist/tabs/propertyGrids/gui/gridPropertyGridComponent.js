import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../../../tabs/propertyGrids/gui/commonControlPropertyGridComponent";
import { LineContainerComponent } from "../../../lines/lineContainerComponent";
import { TextLineComponent } from "../../../lines/textLineComponent";
export class GridPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    renderRows() {
        const grid = this.props.grid;
        const rows = [];
        for (let index = 0; index < grid.rowCount; index++) {
            rows.push(grid.getRowDefinition(index));
        }
        return rows.map((rd, i) => {
            return _jsx(TextLineComponent, { label: `Row ${i}`, value: rd.toString(grid.host, 2), underline: i === grid.rowCount - 1 }, `r${i}`);
        });
    }
    renderColumns() {
        const grid = this.props.grid;
        const cols = [];
        for (let index = 0; index < grid.columnCount; index++) {
            cols.push(grid.getColumnDefinition(index));
        }
        return cols.map((cd, i) => {
            return _jsx(TextLineComponent, { label: `Column ${i}`, value: cd.toString(grid.host, 2) }, `c${i}`);
        });
    }
    render() {
        const grid = this.props.grid;
        const cols = [];
        for (let index = 0; index < grid.rowCount; index++) {
            cols.push(grid.getColumnDefinition(index));
        }
        return (_jsxs(_Fragment, { children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, control: grid, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsxs(LineContainerComponent, { title: "GRID", children: [this.renderRows(), this.renderColumns()] })] }));
    }
}
//# sourceMappingURL=gridPropertyGridComponent.js.map