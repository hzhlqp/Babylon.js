import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faBan, faExpandArrowsAlt, faCompress } from "@fortawesome/free-solid-svg-icons";
import { TreeItemSelectableComponent } from "./treeItemSelectableComponent";
import { Tools } from "../../tools";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
class TreeItemExpandableHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    expandAll() {
        this.props.onExpandAll(!this.props.isExpanded);
    }
    render() {
        const chevron = this.props.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        const expandAll = this.props.isExpanded ? _jsx(FontAwesomeIcon, { icon: faCompress }) : _jsx(FontAwesomeIcon, { icon: faExpandArrowsAlt });
        return (_jsxs("div", { className: "expandableHeader", children: [_jsxs("div", { className: "text", children: [_jsx("div", { className: "arrow icon", onClick: () => this.props.onClick(), children: chevron }), _jsx("div", { className: "text-value", children: this.props.label })] }), _jsx("div", { className: "expandAll icon", onClick: () => this.expandAll(), title: this.props.isExpanded ? "Collapse all" : "Expand all", children: expandAll })] }));
    }
}
class TreeItemRootHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsx("div", { className: "expandableHeader", children: _jsxs("div", { className: "text", children: [_jsx("div", { className: "arrow icon", children: _jsx(FontAwesomeIcon, { icon: faBan }) }), _jsx("div", { className: "text-value", children: this.props.label })] }) }));
    }
}
export class TreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false, mustExpand: false };
    }
    switchExpandedState() {
        this.setState({ isExpanded: !this.state.isExpanded, mustExpand: false });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!nextState.isExpanded && this.state.isExpanded) {
            return true;
        }
        const items = nextProps.items;
        if (items && items.length) {
            if (nextProps.selectedEntity) {
                for (const item of items) {
                    if (Tools.LookForItem(item, nextProps.selectedEntity)) {
                        nextState.isExpanded = true;
                        return true;
                    }
                }
            }
        }
        return true;
    }
    expandAll(expand) {
        this.setState({ isExpanded: expand, mustExpand: expand });
    }
    renderContextMenu() {
        if (!this.props.contextMenuItems) {
            TreeItemComponent._ContextMenuUniqueIdGenerator++;
            return null;
        }
        return (_jsx(ContextMenu, { id: "contextmenu#" + TreeItemComponent._ContextMenuUniqueIdGenerator++, className: "context-menu", children: this.props.contextMenuItems.map((c) => {
                return (_jsx(MenuItem, { onClick: () => c.action(), children: c.label }, c.label));
            }) }));
    }
    render() {
        let items = this.props.items;
        const marginStyle = {
            paddingLeft: 10 * (this.props.offset + 0.5) + "px",
        };
        if (!items) {
            if (this.props.forceSubitems) {
                items = [];
            }
            else {
                return (_jsx("div", { className: "groupContainer", style: marginStyle, children: _jsx("div", { children: this.props.label }) }));
            }
        }
        if (!items.length) {
            return (_jsx("div", { className: "groupContainer", style: marginStyle, children: _jsxs(ContextMenuTrigger, { id: "contextmenu#" + TreeItemComponent._ContextMenuUniqueIdGenerator, children: [this.renderContextMenu(), _jsx(TreeItemRootHeaderComponent, { label: this.props.label })] }) }));
        }
        if (!this.state.isExpanded) {
            return (_jsx("div", { className: "groupContainer", style: marginStyle, children: _jsxs(ContextMenuTrigger, { id: "contextmenu#" + TreeItemComponent._ContextMenuUniqueIdGenerator, children: [this.renderContextMenu(), _jsx(TreeItemExpandableHeaderComponent, { isExpanded: false, label: this.props.label, onClick: () => this.switchExpandedState(), onExpandAll: (expand) => this.expandAll(expand) })] }) }));
        }
        const sortedItems = Tools.SortAndFilter(null, items);
        return (_jsxs("div", { children: [_jsx("div", { className: "groupContainer", style: marginStyle, children: _jsxs(ContextMenuTrigger, { id: "contextmenu#" + TreeItemComponent._ContextMenuUniqueIdGenerator, children: [this.renderContextMenu(), _jsx(TreeItemExpandableHeaderComponent, { isExpanded: this.state.isExpanded, label: this.props.label, onClick: () => this.switchExpandedState(), onExpandAll: (expand) => this.expandAll(expand) })] }) }), sortedItems.map((item) => {
                    return (_jsx(TreeItemSelectableComponent, { mustExpand: this.state.mustExpand, extensibilityGroups: this.props.extensibilityGroups, offset: this.props.offset + 1, selectedEntity: this.props.selectedEntity, entity: item, globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, filter: this.props.filter }, item.uniqueId !== undefined && item.uniqueId !== null ? item.uniqueId : item.name));
                })] }));
    }
}
TreeItemComponent._ContextMenuUniqueIdGenerator = 0;
//# sourceMappingURL=treeItemComponent.js.map