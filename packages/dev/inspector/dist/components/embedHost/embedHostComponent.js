import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { HeaderComponent } from "../headerComponent";
import { Resizable } from "re-resizable";
import { SceneExplorerComponent } from "../sceneExplorer/sceneExplorerComponent";
import { ActionTabsComponent } from "../actionTabs/actionTabsComponent";
const Split = require("split.js").default;
const ResizableCasted = Resizable;
import "./embedHost.scss";
export class EmbedHostComponent extends React.Component {
    constructor(props) {
        super(props);
        this._once = true;
        this._splitRef = React.createRef();
        this._topPartRef = React.createRef();
        this._bottomPartRef = React.createRef();
    }
    componentDidMount() {
        const container = this._splitRef.current;
        if (!container) {
            return;
        }
        Split([this._topPartRef.current, this._bottomPartRef.current], {
            direction: "vertical",
            minSize: [200, 200],
            gutterSize: 4,
        });
    }
    renderContent() {
        if (this.props.popupMode) {
            return (_jsxs("div", { id: "split", className: "splitPopup", children: [_jsx("div", { id: "topPart", children: _jsx(SceneExplorerComponent, { scene: this.props.scene, extensibilityGroups: this.props.extensibilityGroups, additionalNodes: this.props.additionalNodes, popupMode: true, globalState: this.props.globalState, noHeader: true }) }), _jsx("div", { id: "separator" }), _jsx("div", { id: "bottomPart", style: { marginTop: "4px", overflow: "hidden" }, children: _jsx(ActionTabsComponent, { scene: this.props.scene, popupMode: true, globalState: this.props.globalState, noHeader: true, initialTab: this.props.initialTab }) })] }));
        }
        return (_jsxs("div", { ref: this._splitRef, id: "split", className: "noPopup", children: [_jsx("div", { id: "topPart", ref: this._topPartRef, children: _jsx(SceneExplorerComponent, { scene: this.props.scene, extensibilityGroups: this.props.extensibilityGroups, additionalNodes: this.props.additionalNodes, globalState: this.props.globalState, popupMode: true, noHeader: true }) }), _jsx("div", { id: "bottomPart", ref: this._bottomPartRef, style: { marginTop: "4px", overflow: "hidden" }, children: _jsx(ActionTabsComponent, { scene: this.props.scene, globalState: this.props.globalState, popupMode: true, noHeader: true, initialTab: this.props.initialTab }) })] }));
    }
    render() {
        if (this.props.popupMode) {
            return (_jsxs("div", { id: "embed", children: [_jsx(HeaderComponent, { title: "INSPECTOR", noClose: this.props.noClose, noExpand: this.props.noExpand, handleBack: true, onClose: () => this.props.onClose(), onPopup: () => this.props.onPopup(), onSelectionChangedObservable: this.props.globalState.onSelectionChangedObservable }), this.renderContent()] }));
        }
        if (this._once) {
            this._once = false;
            // A bit hacky but no other way to force the initial width to 300px and not auto
            setTimeout(() => {
                const element = document.getElementById("embed");
                if (!element) {
                    return;
                }
                element.style.width = "300px";
            }, 150);
        }
        return (_jsxs(ResizableCasted, { id: "embed", minWidth: 300, maxWidth: 600, defaultSize: { height: "100%" }, minHeight: "100%", enable: { top: false, right: false, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }, children: [_jsx(HeaderComponent, { title: "INSPECTOR", noClose: this.props.noClose, noExpand: this.props.noExpand, handleBack: true, onClose: () => this.props.onClose(), onPopup: () => this.props.onPopup(), onSelectionChangedObservable: this.props.globalState.onSelectionChangedObservable }), this.renderContent()] }));
    }
}
//# sourceMappingURL=embedHostComponent.js.map