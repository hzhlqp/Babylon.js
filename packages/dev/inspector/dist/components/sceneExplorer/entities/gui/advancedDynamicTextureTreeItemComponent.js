import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faImage, faCrosshairs, faPen } from "@fortawesome/free-solid-svg-icons";
import { TreeItemLabelComponent } from "../../treeItemLabelComponent";
import { ExtensionsComponent } from "../../extensionsComponent";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditAdvancedDynamicTexture } from "./guiTools";
export class AdvancedDynamicTextureTreeItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isInPickingMode: false };
    }
    componentWillUnmount() {
        const adt = this.props.texture;
        if (this._onControlPickedObserver) {
            adt.onControlPickedObservable.remove(this._onControlPickedObserver);
            this._onControlPickedObserver = null;
        }
    }
    onPickingMode() {
        const adt = this.props.texture;
        if (this._onControlPickedObserver) {
            adt.onControlPickedObservable.remove(this._onControlPickedObserver);
            this._onControlPickedObserver = null;
        }
        if (!this.state.isInPickingMode) {
            this._onControlPickedObserver = adt.onControlPickedObservable.add((control) => {
                if (!this.props.onSelectionChangedObservable) {
                    return;
                }
                if (control.getClassName() === "ScrollViewerWindow") {
                    control = control.getAscendantOfClass("ScrollViewer");
                }
                this.props.onSelectionChangedObservable.notifyObservers(control);
            });
        }
        this.setState({ isInPickingMode: !this.state.isInPickingMode });
    }
    render() {
        return (_jsxs("div", { className: "adtextureTools", children: [_jsx(TreeItemLabelComponent, { label: this.props.texture.name, onClick: () => this.props.onClick(), icon: faImage, color: "mediumpurple" }), _jsx("div", { className: "icon edit", onClick: () => EditAdvancedDynamicTexture(this.props.texture, true), title: "Edit", children: _jsx(FontAwesomeIcon, { icon: faPen }) }), _jsx("div", { className: this.state.isInPickingMode ? "pickingMode selected icon" : "pickingMode icon", onClick: () => this.onPickingMode(), title: "Turn picking mode on/off", children: _jsx(FontAwesomeIcon, { icon: faCrosshairs }) }), _jsx(ExtensionsComponent, { target: this.props.texture, extensibilityGroups: this.props.extensibilityGroups })] }));
    }
}
//# sourceMappingURL=advancedDynamicTextureTreeItemComponent.js.map