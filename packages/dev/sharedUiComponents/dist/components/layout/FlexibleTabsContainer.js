import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { FlexibleTab } from "./FlexibleTab";
import { LayoutContext } from "./LayoutContext";
import style from "./FlexibleTabsContainer.modules.scss";
import dragIcon from "../../imgs/dragDotsIcon_white.svg";
import { getPosInLayout, removeLayoutRowAndRedistributePercentages } from "./utils";
import { DraggableIcon } from "./DraggableIcon";
import { ElementTypes } from "./types";
/**
 * This component contains a set of tabs of which only one is visible at a time.
 * The tabs can also be dragged from and to different containers.
 * @param props properties
 * @returns tabs container element
 */
export const FlexibleTabsContainer = (props) => {
    const { layout, setLayout } = useContext(LayoutContext);
    const { tabs, selectedTab } = props;
    const selectedTabId = props.selectedTab !== undefined ? props.selectedTab : tabs[0].id;
    const selectedTabArray = tabs.filter((tab) => tab.id === selectedTabId);
    const selectedTabObject = selectedTabArray.length > 0 ? selectedTabArray[0] : null;
    const selectTab = (tabId) => {
        const layoutPos = getPosInLayout(layout, props.columnIndex, props.rowIndex);
        layoutPos.selectedTab = tabId;
        setLayout({ ...layout });
    };
    const addTabAfter = (droppedTabItem, dropZoneTabId) => {
        // Get layout element corresponding to dropped tabs
        const layoutDropped = getPosInLayout(layout, droppedTabItem.columnNumber, droppedTabItem.rowNumber);
        // Get layout element corresponding to dropzone
        const layoutDropZone = getPosInLayout(layout, props.columnIndex, props.rowIndex);
        for (const { id } of droppedTabItem.tabs) {
            const droppedTabIndex = layoutDropped.tabs.findIndex((tab) => tab.id === id);
            const droppedTab = layoutDropped.tabs[droppedTabIndex];
            // Add dropped tab after dropZoneTabId
            const dropZoneIndex = layoutDropZone.tabs.findIndex((tab) => tab.id === dropZoneTabId);
            layoutDropZone.tabs.splice(dropZoneIndex + 1, 0, droppedTab);
            // Remove dropped tab from its original position
            layoutDropped.tabs.splice(droppedTabIndex, 1);
        }
        if (layoutDropped.tabs.length === 0) {
            // Check if the layout that was dropped from is empty now
            removeLayoutRowAndRedistributePercentages(layout, droppedTabItem.columnNumber, droppedTabItem.rowNumber);
        }
        else if (droppedTabItem.tabs.map((tab) => tab.id).includes(layoutDropped.selectedTab)) {
            //Check if the layout that was dropped from's active tab is still in the layout
            layoutDropped.selectedTab = layoutDropped.tabs[0].id;
        }
        // Update layout
        setLayout({ ...layout });
    };
    return (_jsxs("div", { className: style.rootContainer, children: [_jsxs("div", { draggable: false, className: style.tabsLineContainer, children: [_jsx("div", { className: style.tabsContainer, children: tabs.map((tab) => {
                            return (_jsx(FlexibleTab, { title: tab.title, selected: tab.id === selectedTab, onClick: () => selectTab(tab.id), item: { rowNumber: props.rowIndex, columnNumber: props.columnIndex, tabs: [{ id: tab.id }] }, onTabDroppedAction: (item) => addTabAfter(item, tab.id) }, tab.id));
                        }) }), _jsx(DraggableIcon, { src: dragIcon, item: { rowNumber: props.rowIndex, columnNumber: props.columnIndex, tabs: tabs.map((t) => ({ id: t.id })) }, type: ElementTypes.TAB_GROUP })] }), _jsx("div", { className: style.contentContainer, children: selectedTabObject?.component })] }));
};
//# sourceMappingURL=FlexibleTabsContainer.js.map