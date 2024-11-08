import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { GUIEditorTool } from "./globalState";
import { PropertyTabComponent } from "./components/propertyTab/propertyTabComponent";
import { Portal } from "./portal";
import { LogComponent } from "./components/log/logComponent";
import { DataStorage } from "core/Misc/dataStorage";
import { GUINodeTools } from "./guiNodeTools";
import { WorkbenchComponent } from "./diagram/workbench";
import { MessageDialog } from "shared-ui-components/components/MessageDialog";
import { SceneExplorerComponent } from "./components/sceneExplorer/sceneExplorerComponent";
import { CommandBarComponent } from "./components/commandBarComponent";
import { GizmoWrapper } from "./diagram/gizmoWrapper";
import { ArtBoardComponent } from "./diagram/artBoard";
import { ControlTypes } from "./controlTypes";
import "./main.scss";
import "./scss/header.scss";
import toolbarExpandIcon from "./imgs/toolbarExpandIcon.svg";
import toolbarCollapseIcon from "./imgs/toolbarCollapseIcon.svg";
import { Logger } from "core/Misc/logger";
export class WorkbenchEditor extends React.Component {
    componentDidMount() {
        if (navigator.userAgent.indexOf("Mobile") !== -1) {
            (this.props.globalState.hostDocument || document).querySelector(".blocker").style.visibility = "visible";
        }
        document.addEventListener("keydown", this.addToolControls);
        document.addEventListener("keyup", this.removePressToolControls);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.addToolControls);
        document.removeEventListener("keyup", this.removePressToolControls);
        if (this._onErrorMessageObserver) {
            this.props.globalState.onErrorMessageDialogRequiredObservable.remove(this._onErrorMessageObserver);
        }
    }
    constructor(props) {
        super(props);
        this._leftWidth = DataStorage.ReadNumber("LeftWidth", 200);
        this._rightWidth = DataStorage.ReadNumber("RightWidth", 300);
        this.addToolControls = (evt) => {
            // If the event target is a text input, we're currently focused on it, and the user
            // just wants to type normal text
            if (evt.target && evt.target instanceof HTMLInputElement && evt.target.type === "text") {
                return;
            }
            switch (evt.key) {
                case "s": //select
                case "S":
                    this.props.globalState.tool = GUIEditorTool.SELECT;
                    break;
                case "p": //pan
                case "P":
                case " ":
                    this.props.globalState.tool = GUIEditorTool.PAN;
                    break;
                case "z": //zoom
                case "Z":
                    this.props.globalState.tool = GUIEditorTool.ZOOM;
                    break;
                case "g": //outlines
                case "G":
                    this.props.globalState.outlines = !this.props.globalState.outlines;
                    break;
                case "f": //fit to window
                case "F":
                    this.props.globalState.onFitControlsToWindowObservable.notifyObservers();
                    break;
            }
        };
        this.removePressToolControls = (evt) => {
            if (evt.key === " ") {
                this.props.globalState.restorePreviousTool();
            }
        };
        this.handlePopUp = () => {
            this.setState({
                showPreviewPopUp: true,
            });
            this.props.globalState.hostWindow.addEventListener("beforeunload", this.handleClosingPopUp);
        };
        this.handleClosingPopUp = () => {
            this._popUpWindow.close();
        };
        this.createPopupWindow = (title, windowVariableName, width = 500, height = 500) => {
            const windowCreationOptionsList = {
                width: width,
                height: height,
                top: (this.props.globalState.hostWindow.innerHeight - width) / 2 + window.screenY,
                left: (this.props.globalState.hostWindow.innerWidth - height) / 2 + window.screenX,
            };
            const windowCreationOptions = Object.keys(windowCreationOptionsList)
                .map((key) => key + "=" + windowCreationOptionsList[key])
                .join(",");
            const popupWindow = this.props.globalState.hostWindow.open("", title, windowCreationOptions);
            if (!popupWindow) {
                return null;
            }
            const parentDocument = popupWindow.document;
            parentDocument.title = title;
            parentDocument.body.style.width = "100%";
            parentDocument.body.style.height = "100%";
            parentDocument.body.style.margin = "0";
            parentDocument.body.style.padding = "0";
            const parentControl = parentDocument.createElement("div");
            parentControl.style.width = "100%";
            parentControl.style.height = "100%";
            parentControl.style.margin = "0";
            parentControl.style.padding = "0";
            parentControl.style.display = "grid";
            parentControl.style.gridTemplateRows = "40px auto";
            parentControl.id = "gui-editor-workbench-root";
            parentControl.className = "right-panel";
            popupWindow.document.body.appendChild(parentControl);
            this.copyStyles(this.props.globalState.hostWindow.document, parentDocument);
            this[windowVariableName] = popupWindow;
            this._popUpWindow = popupWindow;
            return popupWindow;
        };
        this.copyStyles = (sourceDoc, targetDoc) => {
            const styleContainer = [];
            for (let index = 0; index < sourceDoc.styleSheets.length; index++) {
                const styleSheet = sourceDoc.styleSheets[index];
                try {
                    if (styleSheet.href) {
                        // for <link> elements loading CSS from a URL
                        const newLinkEl = sourceDoc.createElement("link");
                        newLinkEl.rel = "stylesheet";
                        newLinkEl.href = styleSheet.href;
                        targetDoc.head.appendChild(newLinkEl);
                        styleContainer.push(newLinkEl);
                    }
                    else if (styleSheet.cssRules) {
                        // for <style> elements
                        const newStyleEl = sourceDoc.createElement("style");
                        for (const cssRule of styleSheet.cssRules) {
                            newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
                        }
                        targetDoc.head.appendChild(newStyleEl);
                        styleContainer.push(newStyleEl);
                    }
                }
                catch (e) {
                    Logger.Log(e);
                }
            }
        };
        this._rootRef = React.createRef();
        this.state = {
            showPreviewPopUp: false,
            toolbarExpand: true,
            message: "",
        };
        this.props.globalState.onBackgroundColorChangeObservable.add(() => this.forceUpdate());
        this.props.globalState.onDropObservable.add(() => {
            if (this._draggedItem != null) {
                this.props.globalState.draggedControl = this.onCreate(this._draggedItem);
            }
            this._draggedItem = null;
        });
        this._onErrorMessageObserver = this.props.globalState.onErrorMessageDialogRequiredObservable.add((message) => {
            this.setState({ message });
        });
    }
    showWaitScreen() {
        this.props.globalState.hostDocument.querySelector(".wait-screen")?.classList.remove("hidden");
    }
    hideWaitScreen() {
        this.props.globalState.hostDocument.querySelector(".wait-screen")?.classList.add("hidden");
    }
    onPointerDown(evt) {
        if (evt.button !== 0)
            return;
        this._moveInProgress = true;
        evt.currentTarget.setPointerCapture(evt.pointerId);
    }
    onPointerUp(evt) {
        if (evt.button !== 0)
            return;
        this._moveInProgress = false;
        evt.currentTarget.releasePointerCapture(evt.pointerId);
    }
    resizeColumns(evt, forLeft = true) {
        if (!this._moveInProgress) {
            return;
        }
        const rootElement = evt.currentTarget.ownerDocument.getElementById("gui-editor-workbench-root");
        const maxWidth = this.props.globalState.hostWindow.innerWidth;
        if (forLeft) {
            this._leftWidth = Math.max(150, Math.min(maxWidth - this._rightWidth, evt.clientX - this._rootRef.current.clientLeft));
            DataStorage.WriteNumber("LeftWidth", this._leftWidth);
        }
        else {
            this._rightWidth = Math.max(250, Math.min(maxWidth - this._leftWidth, this._rootRef.current.clientLeft + this._rootRef.current.clientWidth - evt.clientX));
            DataStorage.WriteNumber("RightWidth", this._rightWidth);
        }
        rootElement.style.gridTemplateColumns = this.buildColumnLayout();
        this.props.globalState.onWindowResizeObservable.notifyObservers();
    }
    buildColumnLayout() {
        return `${this._leftWidth}px 1fr ${this._rightWidth}px`;
    }
    switchExpandedState() {
        this.setState({ toolbarExpand: !this.state.toolbarExpand });
        if (!this.state.toolbarExpand) {
            this._leftWidth = this._leftWidth - 50;
        }
        else {
            this._leftWidth = this._leftWidth + 50;
        }
    }
    render() {
        const classForElement = this.state.toolbarExpand ? "left-panel" : "left-panel expand";
        return (_jsxs(Portal, { globalState: this.props.globalState, children: [_jsx("div", { id: "ge-header", children: _jsx("div", { className: "command-bar", children: _jsx(CommandBarComponent, { globalState: this.props.globalState }) }) }), _jsxs("div", { id: "gui-editor-workbench-root", style: {
                        gridTemplateColumns: this.buildColumnLayout(),
                    }, onMouseDown: (evt) => {
                        if (evt.target.nodeName === "INPUT") {
                            return;
                        }
                    }, ref: this._rootRef, onPointerUp: (evt) => this.onPointerUp(evt), children: [_jsxs("div", { className: classForElement, children: [_jsx(SceneExplorerComponent, { globalState: this.props.globalState, noExpand: true }), this.createToolbar(), _jsx("div", { id: "leftGrab", onPointerDown: (evt) => this.onPointerDown(evt), onPointerMove: (evt) => this.resizeColumns(evt) })] }), _jsx(SceneExplorerComponent, { globalState: this.props.globalState, noExpand: true }), this.createToolbar(), _jsxs("div", { className: "diagram-container", onDrop: (event) => {
                                event.preventDefault();
                                this.props.globalState.onDropObservable.notifyObservers();
                                this.props.globalState.onParentingChangeObservable.notifyObservers(null);
                            }, onDragOver: (event) => {
                                event.preventDefault();
                            }, style: {
                                backgroundColor: this.props.globalState.backgroundColor.toHexString(),
                            }, children: [_jsx(ArtBoardComponent, { globalState: this.props.globalState }), _jsx(WorkbenchComponent, { ref: "workbenchCanvas", globalState: this.props.globalState }), _jsx(GizmoWrapper, { globalState: this.props.globalState })] }), _jsxs("div", { className: "right-panel", children: [_jsx("div", { id: "rightGrab", onPointerDown: (evt) => this.onPointerDown(evt), onPointerMove: (evt) => this.resizeColumns(evt, false) }), _jsx(PropertyTabComponent, { globalState: this.props.globalState })] }), _jsx(LogComponent, { globalState: this.props.globalState })] }), _jsx(MessageDialog, { message: this.state.message, isError: true }), _jsx("div", { className: "blocker", children: "GUI Editor runs only on desktop" }), _jsx("div", { className: "wait-screen hidden", children: "Processing...please wait" })] }));
    }
    onCreate(value) {
        const guiElement = GUINodeTools.CreateControlFromString(value);
        const newGuiNode = this.props.globalState.workbench.appendBlock(guiElement);
        this.props.globalState.setSelection([newGuiNode]);
        this.props.globalState.onPointerUpObservable.notifyObservers(null);
        this.forceUpdate();
        return newGuiNode;
    }
    createBlackLine() {
        const icon = this.state.toolbarExpand ? _jsx("img", { src: toolbarExpandIcon, className: "icon" }) : _jsx("img", { src: toolbarCollapseIcon, className: "icon" });
        return (_jsx("div", { className: "blackLine", children: _jsx("div", { className: "arrow", onClick: () => this.switchExpandedState(), children: icon }) }));
    }
    createToolbarHelper(ct) {
        return ct.map((type) => {
            return (_jsx("div", { className: "toolbar-label", onDragStart: () => {
                    this._draggedItem = type.className;
                }, onClick: () => {
                    this.onCreate(type.className);
                }, title: type.className, children: type.icon && (_jsx("div", { className: "toolbar-icon", draggable: true, children: _jsx("img", { src: type.icon, alt: type.className, width: "40px", height: "40px" }) })) }, type.className));
        });
    }
    createToolbar() {
        if (this.state.toolbarExpand) {
            return (_jsx(_Fragment, { children: _jsxs("div", { className: "toolbarGrab", children: [this.createBlackLine(), _jsx("div", { className: "toolbar-content-sub1", children: this.createToolbarHelper(ControlTypes) })] }) }));
        }
        else {
            return (_jsx(_Fragment, { children: _jsxs("div", { className: "toolbarGrab expanded", children: [this.createBlackLine(), _jsxs("div", { className: "toolbar-content-sub1", children: [this.createToolbarHelper(ControlTypes.slice(0, Math.ceil(ControlTypes.length / 2))), this.createToolbarHelper(ControlTypes.slice(Math.ceil(ControlTypes.length / 2)))] })] }) }));
        }
    }
}
//# sourceMappingURL=workbenchEditor.js.map