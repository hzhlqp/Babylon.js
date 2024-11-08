import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { LayoutContext } from "./LayoutContext";
import { FlexibleColumn } from "./FlexibleColumn";
import { FlexibleDropZone } from "./FlexibleDropZone";
import { FlexibleTabsContainer } from "./FlexibleTabsContainer";
import style from "./FlexibleGridContainer.modules.scss";
/**
 * Component responsible for mapping the layout to the actual components
 * @returns GridContainer element
 */
export const FlexibleGridContainer = () => {
    const context = useContext(LayoutContext);
    const { layout } = context;
    const columns = layout && layout.columns
        ? layout.columns.map((column, columnIdx) => {
            return (_jsx(FlexibleColumn, { width: column.width, children: column.rows.map((row, rowIdx) => {
                    return (_jsx("div", { style: { height: row.height }, children: _jsx(FlexibleDropZone, { rowNumber: rowIdx, columnNumber: columnIdx, children: _jsx(FlexibleTabsContainer, { tabs: row.tabs, selectedTab: row.selectedTab, rowIndex: rowIdx, columnIndex: columnIdx }) }) }, row.id));
                }) }, column.id));
        })
        : [];
    return _jsx("div", { className: style.flexibleGrid, children: columns });
};
//# sourceMappingURL=FlexibleGridContainer.js.map