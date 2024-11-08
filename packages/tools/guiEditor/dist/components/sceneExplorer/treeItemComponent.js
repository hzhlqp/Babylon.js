import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { TreeItemSelectableComponent } from "./treeItemSelectableComponent";
import { Tools } from "../../tools";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import expandedIcon from "../../imgs/expandedIcon.svg";
import collapsedIcon from "../../imgs/collapsedIcon.svg";
class TreeItemExpandableHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    expandAll() {
        this.props.onExpandAll(!this.props.isExpanded);
    }
    render() {
        const chevron = this.props.isExpanded ? _jsx("img", { src: expandedIcon, className: "icon" }) : _jsx("img", { src: collapsedIcon, className: "icon" });
        return (_jsxs("div", { className: "expandableHeader", children: [_jsxs("div", { className: "text", children: [_jsx("div", { className: "arrow icon", onClick: () => this.props.onClick(), children: chevron }), _jsx("div", { className: "text-value", children: this.props.label })] }), _jsx("div", { className: "expandAll icon", onClick: () => this.expandAll(), title: this.props.isExpanded ? "Collapse all" : "Expand all", children: chevron })] }));
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
        this.state = { isExpanded: true, mustExpand: true };
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
            for (const item of items) {
                if (Tools.LookForItems(item, nextProps.selectedEntities)) {
                    nextState.isExpanded = true;
                    return true;
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
        const sortedItems = Tools.SortAndFilter(null, items)[0].getChildren();
        return (_jsx("div", { children: sortedItems.map((item) => {
                return (_jsx(TreeItemSelectableComponent, { extensibilityGroups: this.props.extensibilityGroups, offset: this.props.offset + 1, selectedEntities: this.props.selectedEntities, entity: item, globalState: this.props.globalState, filter: this.props.filter }, item.uniqueId !== undefined && item.uniqueId !== null ? item.uniqueId : item.name));
            }) }));
    }
}
TreeItemComponent._ContextMenuUniqueIdGenerator = 0;
//# sourceMappingURL=treeItemComponent.js.map