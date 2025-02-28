import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tools } from "../../tools";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { DragOverLocation } from "../../globalState";
import { ControlTreeItemComponent } from "./entities/gui/controlTreeItemComponent";
import { Container } from "gui/2D/controls/container";
import expandedIcon from "../../imgs/expandedIcon.svg";
import collapsedIcon from "../../imgs/collapsedIcon.svg";
// eslint-disable-next-line @typescript-eslint/naming-convention
const CONTROL_HEIGHT = 32;
export class TreeItemSelectableComponent extends React.Component {
    constructor(props) {
        super(props);
        /** flag flipped onDragEnter if dragOver is already true
         * prevents dragLeave from immediately setting dragOver to false
         * required to make dragging work as expected
         * see: see: https://github.com/transformation-dev/matrx/tree/master/packages/dragster
         */
        this._secondDragEnter = false;
        this.state = {
            expand: true,
            dragOver: false,
            dragOverLocation: DragOverLocation.NONE,
            isHovered: false,
            isSelected: this.props.selectedEntities.includes(this.props.entity),
            blockDrag: false,
        };
        this._onSelectionChangedObservable = props.globalState.onSelectionChangedObservable.add(() => {
            this.setState({ isSelected: this.props.globalState.selectedControls.includes(this.props.entity) });
        });
        this._onDraggingEndObservable = props.globalState.onDraggingEndObservable.add(() => {
            this.setState({ dragOverLocation: DragOverLocation.NONE });
        });
        this._onDraggingStartObservable = props.globalState.onDraggingStartObservable.add(() => {
            this.forceUpdate();
        });
    }
    switchExpandedState() {
        this.props.entity.reservedDataStore.setExpandedState(!this.props.entity.reservedDataStore.isExpanded);
        this.setState({ expand: !this.state.expand });
    }
    shouldComponentUpdate(nextProps, nextState) {
        //if the next entity is going to be selected then we want to highlight it so update
        if (nextProps.selectedEntities.includes(nextProps.entity)) {
            nextState.isSelected = true;
            return true;
        }
        else {
            nextState.isSelected = false;
        }
        if (Tools.LookForItems(nextProps.entity, nextProps.selectedEntities)) {
            return true;
        }
        return true;
    }
    scrollIntoView() {
        const element = ReactDOM.findDOMNode(this);
        if (element) {
            element.scrollIntoView(false);
        }
    }
    componentWillUnmount() {
        this.props.globalState.onSelectionChangedObservable.remove(this._onSelectionChangedObservable);
        this.props.globalState.onDraggingEndObservable.remove(this._onDraggingEndObservable);
        this.props.globalState.onDraggingStartObservable.remove(this._onDraggingStartObservable);
    }
    onSelect() {
        const entity = this.props.entity;
        this.props.globalState.select(entity);
        this.props.globalState.selectionLock = true;
    }
    renderChildren(isExpanded, offset = true) {
        const entity = this.props.entity;
        if ((!entity.getChildren && !entity.children) || !isExpanded) {
            return null;
        }
        const children = Tools.SortAndFilter(entity, entity.getChildren ? entity.getChildren() : entity.children);
        if (entity.typeName === "StackPanel" || entity.typeName === "VirtualKeyboard") {
            children.reverse();
        }
        return children.map((item, i) => {
            if (item.name == "Art-Board-Background") {
                return null;
            }
            return (_jsx(TreeItemSelectableComponent, { globalState: this.props.globalState, mustExpand: this.props.mustExpand, extensibilityGroups: this.props.extensibilityGroups, selectedEntities: this.props.selectedEntities, offset: this.props.offset + (offset ? 2 : 0), entity: item, filter: this.props.filter }, i));
        });
    }
    render() {
        if (this.props.entity === this.props.globalState.workbench.trueRootContainer ||
            this.props.entity === this.props.globalState.workbench.visibleRegionContainer ||
            this.props.entity === this.props.globalState.workbench.panAndZoomContainer) {
            return this.renderChildren(true, false);
        }
        const marginStyle = {
            paddingLeft: 10 * (this.props.offset + 0.5) - 20 + "px",
        };
        const lineMarginStyle = {
            marginLeft: 10 * (this.props.offset + 0.5) - 20 + "px",
        };
        let entity = this.props.entity;
        if (!entity.reservedDataStore) {
            entity.reservedDataStore = {
                isExpanded: true,
                setExpandedState: (expanded) => (entity.reservedDataStore.isExpanded = expanded),
            };
        }
        const isExpanded = entity.reservedDataStore.isExpanded || Tools.LookForItems(this.props.entity, this.props.selectedEntities);
        entity.reservedDataStore.isExpanded = isExpanded;
        const chevron = isExpanded ? _jsx("img", { src: expandedIcon, className: "icon" }) : _jsx("img", { src: collapsedIcon, className: "icon" });
        let children = entity.getClassName() === "MultiMaterial" ? [] : Tools.SortAndFilter(entity, entity.getChildren ? entity.getChildren() : entity.children);
        let hasChildren = children.length > 0;
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
        let className = "itemContainer"; //setting class name plus whatever extras based on states
        className += this.state.isSelected && this.props.globalState.draggedControl === null ? " selected" : "";
        className += this.state.isHovered && this.props.globalState.draggedControl === null ? " hover" : "";
        className += this.state.dragOver && this.state.dragOverLocation == DragOverLocation.CENTER && entity instanceof Container ? " parent" : "";
        className += this.props.globalState.draggedControl === this.props.entity ? " dragged" : "";
        className += this.state.dragOver && this.state.dragOverLocation == DragOverLocation.ABOVE && entity.parent ? " seAbove" : "";
        className += this.state.dragOver && this.state.dragOverLocation == DragOverLocation.BELOW && entity.parent ? " seBelow" : "";
        const styleName = className === "itemContainer seAbove" || className === "itemContainer seBelow" ? lineMarginStyle : marginStyle;
        return (_jsxs("div", { children: [_jsxs("div", { className: className, style: styleName, onPointerUp: () => {
                        this.onSelect();
                    }, onPointerEnter: () => this.setState({ isHovered: true }), onPointerLeave: () => this.setState({ isHovered: false }), onDragStart: () => {
                        this.props.globalState.draggedControl = this.props.entity;
                        this.props.globalState.onDraggingStartObservable.notifyObservers();
                    }, onDragEnd: () => {
                        this.props.globalState.onDraggingEndObservable.notifyObservers();
                    }, draggable: entity.parent && !this.state.blockDrag, onDrop: (event) => {
                        this.drop();
                        event.preventDefault();
                    }, onDragEnter: (event) => {
                        event.preventDefault();
                        this.dragOver(event);
                    }, onDragOver: (event) => this.updateDragOverLocation(event), onDragLeave: () => {
                        // don't immediately set dragOver to false
                        if (this._secondDragEnter) {
                            this._secondDragEnter = false;
                        }
                        else {
                            this.setState({ dragOver: false });
                        }
                    }, children: [hasChildren && (_jsx("div", { className: "arrow icon", onClick: (event) => {
                                this.switchExpandedState();
                                if (event.shiftKey) {
                                    while (hasChildren) {
                                        this.renderChildren(true);
                                        entity = entity.children[0];
                                        children =
                                            entity.getClassName() === "MultiMaterial"
                                                ? []
                                                : Tools.SortAndFilter(entity, entity.getChildren ? entity.getChildren() : entity.children);
                                        hasChildren = children.length > 0;
                                        entity.reservedDataStore.isExpanded = true;
                                    }
                                }
                            }, children: chevron })), _jsx(ControlTreeItemComponent, { globalState: this.props.globalState, extensibilityGroups: this.props.extensibilityGroups, control: entity, onClick: () => { }, isHovered: this.state.isHovered, isDragOver: this.state.dragOver, dragOverLocation: this.state.dragOverLocation, onRenamingStateChanged: (isRenaming) => {
                                this.setState({ blockDrag: isRenaming });
                            } })] }), this.renderChildren(isExpanded)] }));
    }
    dragOver(event) {
        this.updateDragOverLocation(event);
        // if we've already hovered the element, record a new drag event
        if (this.state.dragOver) {
            this._secondDragEnter = true;
        }
        else {
            this.setState({ dragOver: true });
        }
    }
    updateDragOverLocation(event) {
        //check the positions of the mouse cursor.
        const target = event.target;
        const rect = target.getBoundingClientRect();
        const y = event.clientY - rect.top;
        if (this.props.entity instanceof Container) {
            if (y < CONTROL_HEIGHT / 5) {
                //split in fifths
                this.setState({ dragOverLocation: DragOverLocation.ABOVE });
            }
            else if (y > (4 * CONTROL_HEIGHT) / 5) {
                this.setState({ dragOverLocation: DragOverLocation.BELOW });
            }
            else {
                this.setState({ dragOverLocation: DragOverLocation.CENTER });
            }
        }
        else {
            if (y < CONTROL_HEIGHT / 2) {
                //split in half
                this.setState({ dragOverLocation: DragOverLocation.ABOVE });
            }
            else {
                this.setState({ dragOverLocation: DragOverLocation.BELOW });
            }
        }
    }
    drop() {
        this.props.globalState.onDropObservable.notifyObservers();
        const control = this.props.entity;
        if (this.props.globalState.draggedControl != control) {
            this.props.globalState.draggedControlDirection = this.state.dragOverLocation;
            this.props.globalState.onParentingChangeObservable.notifyObservers(this.props.entity);
        }
        this.props.globalState.draggedControl = null;
        this.setState({ dragOverLocation: DragOverLocation.NONE, dragOver: false });
        this._secondDragEnter = false;
    }
}
//# sourceMappingURL=treeItemSelectableComponent.js.map