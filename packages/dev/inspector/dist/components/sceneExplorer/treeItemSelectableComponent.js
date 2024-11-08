import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TreeItemSpecializedComponent } from "./treeItemSpecializedComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tools } from "../../tools";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { setDebugNode } from "./treeNodeDebugger";
export class TreeItemSelectableComponent extends React.Component {
    constructor(props) {
        super(props);
        this._wasSelected = false;
        this.state = {
            isSelected: this.props.entity === this.props.selectedEntity,
            isExpanded: this.props.mustExpand || Tools.LookForItem(this.props.entity, this.props.selectedEntity),
        };
    }
    switchExpandedState() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!nextState.isExpanded && this.state.isExpanded) {
            return true;
        }
        if (nextProps.selectedEntity) {
            if (nextProps.entity === nextProps.selectedEntity) {
                nextState.isSelected = true;
                return true;
            }
            else {
                nextState.isSelected = false;
            }
            if (Tools.LookForItem(nextProps.entity, nextProps.selectedEntity)) {
                nextState.isExpanded = true;
                return true;
            }
        }
        return true;
    }
    scrollIntoView() {
        const element = ReactDOM.findDOMNode(this);
        if (element) {
            element.scrollIntoView(false);
        }
    }
    componentDidMount() {
        if (this.state.isSelected) {
            this.scrollIntoView();
        }
    }
    componentDidUpdate() {
        if (this.state.isSelected && !this._wasSelected) {
            this.scrollIntoView();
        }
        this._wasSelected = false;
    }
    onSelect() {
        if (!this.props.globalState.onSelectionChangedObservable) {
            return;
        }
        this._wasSelected = true;
        const entity = this.props.entity;
        // Put selected node into window.debugNode
        setDebugNode(entity);
        this.props.globalState.onSelectionChangedObservable.notifyObservers(entity);
    }
    renderChildren() {
        const entity = this.props.entity;
        if ((!entity.getChildren && !entity.children) || !this.state.isExpanded) {
            return null;
        }
        const children = Tools.SortAndFilter(entity, entity.getChildren ? entity.getChildren() : entity.children);
        return children.map((item, i) => {
            return (_jsx(TreeItemSelectableComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, mustExpand: this.props.mustExpand, extensibilityGroups: this.props.extensibilityGroups, selectedEntity: this.props.selectedEntity, offset: this.props.offset + 2, entity: item, filter: this.props.filter }, i));
        });
    }
    render() {
        const marginStyle = {
            paddingLeft: 10 * (this.props.offset + 0.5) + "px",
        };
        const entity = this.props.entity;
        const chevron = this.state.isExpanded ? _jsx(FontAwesomeIcon, { icon: faMinus }) : _jsx(FontAwesomeIcon, { icon: faPlus });
        const children = entity.getClassName() === "MultiMaterial" ? [] : Tools.SortAndFilter(entity, entity.getChildren ? entity.getChildren() : entity.children);
        const hasChildren = children.length > 0;
        if (!entity.reservedDataStore) {
            entity.reservedDataStore = {};
        }
        entity.reservedDataStore.setExpandedState = (value) => {
            this.setState({ isExpanded: value });
        };
        entity.reservedDataStore.isExpanded = this.state.isExpanded;
        if (this.props.filter) {
            const lowerCaseFilter = this.props.filter.toLowerCase();
            if (!entity.name || entity.name.toLowerCase().indexOf(lowerCaseFilter) === -1) {
                if (!hasChildren) {
                    return null;
                }
                if (entity.getDescendants) {
                    if (entity.getDescendants(false, (n) => {
                        return n.name && n.name.toLowerCase().indexOf(lowerCaseFilter) !== -1;
                    }).length === 0) {
                        return null;
                    }
                }
            }
        }
        return (_jsxs("div", { children: [_jsxs("div", { className: this.state.isSelected ? "itemContainer selected" : "itemContainer", style: marginStyle, children: [hasChildren && (_jsx("div", { className: "arrow icon", onClick: () => this.switchExpandedState(), children: chevron })), _jsx(TreeItemSpecializedComponent, { globalState: this.props.globalState, gizmoCamera: this.props.gizmoCamera, extensibilityGroups: this.props.extensibilityGroups, label: entity.name, entity: entity, onClick: () => this.onSelect() })] }), this.renderChildren()] }));
    }
}
//# sourceMappingURL=treeItemSelectableComponent.js.map