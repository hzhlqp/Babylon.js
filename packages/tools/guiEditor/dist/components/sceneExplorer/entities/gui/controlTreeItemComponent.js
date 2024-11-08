import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TreeItemLabelComponent } from "../../treeItemLabelComponent";
import { ExtensionsComponent } from "../../extensionsComponent";
import * as React from "react";
import { DragOverLocation } from "../../../../globalState";
import { Container } from "gui/2D/controls/container";
import { ControlTypes } from "../../../../controlTypes";
import visibilityNotActiveIcon from "../../../../imgs/visibilityNotActiveIcon.svg";
import visibilityActiveIcon from "../../../../imgs/visibilityActiveIcon.svg";
import makeComponentIcon from "../../../../imgs/makeComponentIcon.svg";
import makeChildOfContainerIcon from "../../../../imgs/makeChildOfContainerIcon.svg";
export class ControlTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        const control = this.props.control;
        this.state = { isActive: control.isHighlighted, isVisible: control.isVisible, isRenaming: false };
        this._onIsVisibleChangedObserver = control.onIsVisibleChangedObservable.add((isVisible) => {
            this.setState({ isVisible });
        });
    }
    componentWillUnmount() {
        if (this._onIsVisibleChangedObserver) {
            this.props.control.onIsVisibleChangedObservable.remove(this._onIsVisibleChangedObserver);
        }
    }
    highlight() {
        const control = this.props.control;
        control.isHighlighted = !control.isHighlighted;
        this.setState({ isActive: control.isHighlighted });
    }
    switchVisibility() {
        const newState = !this.state.isVisible;
        this.setState({ isVisible: newState });
        this.props.control.isVisible = newState;
    }
    onRename(name) {
        this.props.control.name = name;
        this.props.globalState.onPropertyGridUpdateRequiredObservable.notifyObservers();
    }
    render() {
        const control = this.props.control;
        let bracket = "";
        if (control.parent?.typeName === "Grid") {
            bracket = control.parent.getChildCellInfo(this.props.control);
        }
        const draggingSelf = this.props.globalState.draggedControl === control;
        const controlType = ControlTypes.find((type) => type.className === control.getClassName());
        return (_jsxs("div", { className: "controlTools", children: [controlType && (_jsx("div", { className: "controlType icon", children: _jsx("img", { src: controlType.icon, alt: controlType.className }) })), _jsx(TreeItemLabelComponent, { label: control.name, bracket: bracket, onClick: () => this.props.onClick(), onChange: (name) => this.onRename(name), setRenaming: (renaming) => {
                        this.setState({ isRenaming: renaming });
                        this.props.onRenamingStateChanged(renaming);
                    }, renaming: this.state.isRenaming }), !draggingSelf && this.props.isDragOver && this.props.dragOverLocation == DragOverLocation.CENTER && control instanceof Container && (_jsx(_Fragment, { children: _jsx("div", { className: "makeChild icon", onClick: () => this.highlight(), title: "Make Child", children: _jsx("img", { src: makeChildOfContainerIcon }) }) })), !this.state.isRenaming && this.props.isHovered && this.props.globalState.draggedControl === null && this.props.dragOverLocation == DragOverLocation.NONE && (_jsxs(_Fragment, { children: [_jsx("div", { className: "addComponent icon", onClick: () => this.highlight(), title: "Add component (Not Implemented)", children: _jsx("img", { src: makeComponentIcon }) }), _jsx("div", { className: "visibility icon", onClick: () => this.switchVisibility(), title: "Set isVisible", children: _jsx("img", { src: this.state.isVisible ? visibilityActiveIcon : visibilityNotActiveIcon }) })] })), _jsx(ExtensionsComponent, { target: control, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=controlTreeItemComponent.js.map