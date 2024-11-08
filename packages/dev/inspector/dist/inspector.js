import * as React from "react";
import * as ReactDOM from "react-dom";
import { Observable } from "core/Misc/observable";
import { EngineStore } from "core/Engines/engineStore";
import { SceneLoader } from "core/Loading/sceneLoader";
import { ActionTabsComponent } from "./components/actionTabs/actionTabsComponent";
import { SceneExplorerComponent } from "./components/sceneExplorer/sceneExplorerComponent";
import { EmbedHostComponent } from "./components/embedHost/embedHostComponent";
import { GlobalState } from "./components/globalState";
import { PopupComponent } from "./components/popupComponent";
export class Inspector {
    static MarkLineContainerTitleForHighlighting(title) {
        this._GlobalState.selectedLineContainerTitles = [];
        this._GlobalState.selectedLineContainerTitles.push(title);
    }
    static MarkMultipleLineContainerTitlesForHighlighting(titles) {
        this._GlobalState.selectedLineContainerTitles = [];
        this._GlobalState.selectedLineContainerTitles.push(...titles);
    }
    static _CopyStyles(sourceDoc, targetDoc) {
        for (let index = 0; index < sourceDoc.styleSheets.length; index++) {
            const styleSheet = sourceDoc.styleSheets[index];
            try {
                if (styleSheet.cssRules) {
                    // for <style> elements
                    const newStyleEl = sourceDoc.createElement("style");
                    for (const cssRule of styleSheet.cssRules) {
                        // write the text of each rule into the body of the style element
                        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
                    }
                    targetDoc.head.appendChild(newStyleEl);
                }
                else if (styleSheet.href) {
                    // for <link> elements loading CSS from a URL
                    const newLinkEl = sourceDoc.createElement("link");
                    newLinkEl.rel = "stylesheet";
                    newLinkEl.href = styleSheet.href;
                    targetDoc.head.appendChild(newLinkEl);
                }
            }
            catch (e) { }
        }
    }
    static PopupEmbed() {
        const scene = this._Scene;
        const options = this._EmbedOptions;
        if (!options) {
            return;
        }
        ReactDOM.unmountComponentAtNode(this._EmbedHost);
        if (options.popup) {
            this._EmbedHostWindow.close();
        }
        this._RemoveElementFromDOM(this._EmbedHost);
        options.popup = !options.popup;
        options.embedMode = true;
        options.showExplorer = true;
        options.showInspector = true;
        options.embedHostWidth = options.popup ? "100%" : "auto";
        Inspector.Show(scene, options);
    }
    static PopupSceneExplorer() {
        const scene = this._Scene;
        const options = this._SceneExplorerOptions;
        if (!options) {
            return;
        }
        ReactDOM.unmountComponentAtNode(this._SceneExplorerHost);
        this._RemoveElementFromDOM(this._SceneExplorerHost);
        if (options.popup) {
            this._SceneExplorerWindow.close();
        }
        options.popup = !options.popup;
        options.showExplorer = true;
        options.showInspector = false;
        options.explorerWidth = options.popup ? "100%" : "300px";
        Inspector.Show(scene, options);
    }
    static PopupInspector() {
        const scene = this._Scene;
        const options = this._InspectorOptions;
        if (!options) {
            return;
        }
        ReactDOM.unmountComponentAtNode(this._ActionTabsHost);
        this._RemoveElementFromDOM(this._ActionTabsHost);
        if (options.popup) {
            this._ActionTabsWindow.close();
        }
        options.popup = !options.popup;
        options.showExplorer = false;
        options.showInspector = true;
        options.inspectorWidth = options.popup ? "100%" : "300px";
        Inspector.Show(scene, options);
    }
    static _CreateSceneExplorer(scene, options, parentControlExplorer) {
        // Duplicating the options as they can be different for each pane
        if (options.original) {
            options = {
                original: false,
                popup: options.popup,
                overlay: options.overlay,
                showExplorer: options.showExplorer,
                showInspector: options.showInspector,
                additionalNodes: options.additionalNodes,
                embedMode: options.embedMode,
                handleResize: options.handleResize,
                enablePopup: options.enablePopup,
                enableClose: options.enableClose,
                explorerExtensibility: options.explorerExtensibility,
                gizmoCamera: options.gizmoCamera,
                contextMenu: options.contextMenu,
                contextMenuOverride: options.contextMenuOverride,
            };
        }
        this._EmbedOptions = null;
        this._SceneExplorerOptions = options;
        // Prepare the scene explorer host
        if (parentControlExplorer) {
            this._SceneExplorerHost = parentControlExplorer.ownerDocument.createElement("div");
            this._SceneExplorerHost.id = "scene-explorer-host";
            this._SceneExplorerHost.style.width = options.explorerWidth || "auto";
            if (!options.popup) {
                parentControlExplorer.insertBefore(this._SceneExplorerHost, this._NewCanvasContainer);
            }
            else {
                parentControlExplorer.appendChild(this._SceneExplorerHost);
            }
            if (!options.overlay) {
                this._SceneExplorerHost.style.position = "relative";
            }
        }
        // Scene
        if (this._SceneExplorerHost) {
            this._OpenedPane++;
            const sceneExplorerElement = React.createElement(SceneExplorerComponent, {
                scene,
                contextMenu: options.contextMenu,
                contextMenuOverride: options.contextMenuOverride,
                gizmoCamera: options.gizmoCamera,
                globalState: this._GlobalState,
                extensibilityGroups: options.explorerExtensibility,
                additionalNodes: options.additionalNodes,
                noClose: !options.enableClose,
                noExpand: !options.enablePopup,
                popupMode: options.popup,
                onPopup: () => {
                    this.PopupSceneExplorer();
                },
                onClose: () => {
                    ReactDOM.unmountComponentAtNode(this._SceneExplorerHost);
                    Inspector._OpenedPane--;
                    this._RemoveElementFromDOM(this._SceneExplorerHost);
                    this._Cleanup();
                    if (options.popup) {
                        this._SceneExplorerWindow.close();
                    }
                    this._GlobalState.onSceneExplorerClosedObservable.notifyObservers();
                },
            });
            ReactDOM.render(sceneExplorerElement, this._SceneExplorerHost);
        }
    }
    static _CreateActionTabs(scene, options, parentControlActions) {
        options.original = false;
        this._EmbedOptions = null;
        this._InspectorOptions = options;
        // Prepare the inspector host
        if (parentControlActions) {
            const host = parentControlActions.ownerDocument.createElement("div");
            host.id = "inspector-host";
            host.style.width = options.inspectorWidth || "auto";
            parentControlActions.appendChild(host);
            this._ActionTabsHost = host;
            if (!options.overlay) {
                this._ActionTabsHost.style.position = "relative";
            }
        }
        if (this._ActionTabsHost) {
            this._OpenedPane++;
            const actionTabsElement = React.createElement(ActionTabsComponent, {
                globalState: this._GlobalState,
                scene: scene,
                noClose: !options.enableClose,
                noExpand: !options.enablePopup,
                popupMode: options.popup,
                onPopup: () => {
                    this.PopupInspector();
                },
                onClose: () => {
                    ReactDOM.unmountComponentAtNode(this._ActionTabsHost);
                    Inspector._OpenedPane--;
                    this._Cleanup();
                    this._RemoveElementFromDOM(this._ActionTabsHost);
                    if (options.popup) {
                        this._ActionTabsWindow.close();
                    }
                    this._GlobalState.onActionTabsClosedObservable.notifyObservers();
                },
                initialTab: options.initialTab,
            });
            ReactDOM.render(actionTabsElement, this._ActionTabsHost);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static _CreateEmbedHost(scene, options, parentControl, onSelectionChangedObservable) {
        this._EmbedOptions = options;
        this._SceneExplorerOptions = null;
        this._InspectorOptions = null;
        // Prepare the inspector host
        if (parentControl) {
            const host = parentControl.ownerDocument.createElement("div");
            host.id = "embed-host";
            host.style.width = options.embedHostWidth || "auto";
            parentControl.appendChild(host);
            this._EmbedHost = host;
            if (!options.overlay) {
                this._EmbedHost.style.position = "relative";
            }
        }
        if (this._EmbedHost) {
            this._OpenedPane++;
            const embedHostElement = React.createElement(EmbedHostComponent, {
                globalState: this._GlobalState,
                scene: scene,
                extensibilityGroups: options.explorerExtensibility,
                additionalNodes: options.additionalNodes,
                noExpand: !options.enablePopup,
                noClose: !options.enableClose,
                popupMode: options.popup,
                onPopup: () => {
                    this.PopupEmbed();
                },
                onClose: () => {
                    ReactDOM.unmountComponentAtNode(this._EmbedHost);
                    this._OpenedPane = 0;
                    this._Cleanup();
                    this._RemoveElementFromDOM(this._EmbedHost);
                    if (options.popup) {
                        this._EmbedHostWindow.close();
                    }
                    this._GlobalState.onSceneExplorerClosedObservable.notifyObservers();
                    this._GlobalState.onActionTabsClosedObservable.notifyObservers();
                },
                initialTab: options.initialTab,
            });
            ReactDOM.render(embedHostElement, this._EmbedHost);
        }
    }
    static _CreatePopup(title, windowVariableName, width = 300, height = 800, lateBinding) {
        const windowCreationOptionsList = {
            width: width,
            height: height,
            top: (window.innerHeight - width) / 2 + window.screenY,
            left: (window.innerWidth - height) / 2 + window.screenX,
        };
        const windowCreationOptions = Object.keys(windowCreationOptionsList)
            .map((key) => key + "=" + windowCreationOptionsList[key])
            .join(",");
        const popupWindow = window.open("", title, windowCreationOptions);
        if (!popupWindow) {
            return null;
        }
        const parentDocument = popupWindow.document;
        // Font
        const newLinkEl = parentDocument.createElement("link");
        newLinkEl.rel = "stylesheet";
        newLinkEl.href = "https://use.typekit.net/cta4xsb.css";
        parentDocument.head.appendChild(newLinkEl);
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
        popupWindow.document.body.appendChild(parentControl);
        this._CopyStyles(window.document, parentDocument);
        if (lateBinding) {
            setTimeout(() => {
                // need this for late bindings
                this._CopyStyles(window.document, parentDocument);
            }, 0);
        }
        this[windowVariableName] = popupWindow;
        return parentControl;
    }
    static get IsVisible() {
        return this._OpenedPane > 0;
    }
    static EarlyAttachToLoader() {
        if (!this._GlobalState.onPluginActivatedObserver) {
            this._GlobalState.onPluginActivatedObserver = SceneLoader.OnPluginActivatedObservable.add((rawLoader) => {
                this._GlobalState.resetGLTFValidationResults();
                const loader = rawLoader;
                if (loader.name === "gltf") {
                    this._GlobalState.prepareGLTFPlugin(loader);
                }
            });
        }
    }
    static Show(scene, userOptions) {
        const options = {
            original: true,
            popup: false,
            overlay: false,
            showExplorer: true,
            showInspector: true,
            embedMode: false,
            enableClose: true,
            handleResize: true,
            enablePopup: true,
            ...userOptions,
        };
        // load the font, unless asked to skip it
        if (!options.skipDefaultFontLoading && !globalThis?.BABYLON_SKIP_FONT_LOADING) {
            const font = document.createElement("link");
            font.rel = "stylesheet";
            font.href = "https://use.typekit.net/cta4xsb.css";
            document.head.appendChild(font);
        }
        // Prepare state
        if (!this._GlobalState.onPropertyChangedObservable) {
            this._GlobalState.init(this.OnPropertyChangedObservable);
        }
        if (!this._GlobalState.onSelectionChangedObservable) {
            this._GlobalState.onSelectionChangedObservable = this.OnSelectionChangeObservable;
        }
        // Make sure it is not already opened
        if (this.IsVisible && options.original) {
            this.Hide();
        }
        if (!scene) {
            scene = EngineStore.LastCreatedScene;
        }
        this._Scene = scene;
        const rootElement = scene ? scene.getEngine().getInputElement() : EngineStore.LastCreatedEngine.getInputElement();
        if (options.embedMode && options.showExplorer && options.showInspector) {
            if (options.popup) {
                this._CreateEmbedHost(scene, options, this._CreatePopup("INSPECTOR", "_EmbedHostWindow"), Inspector.OnSelectionChangeObservable);
                this._EmbedHostWindow.addEventListener("beforeunload", () => this._GlobalState.onSceneExplorerClosedObservable.notifyObservers());
                this._EmbedHostWindow.addEventListener("beforeunload", () => this._GlobalState.onActionTabsClosedObservable.notifyObservers());
            }
            else {
                if (!rootElement) {
                    return;
                }
                let parentControl = (options.globalRoot ? options.globalRoot : rootElement.parentElement);
                if (!options.overlay && !this._NewCanvasContainer) {
                    this._CreateCanvasContainer(parentControl);
                }
                else if (!options.overlay && this._NewCanvasContainer && this._NewCanvasContainer.parentElement) {
                    // the root is now the parent of the canvas container
                    parentControl = this._NewCanvasContainer.parentElement;
                }
                if (this._NewCanvasContainer) {
                    // If we move things around, let's control the resize
                    if (options.handleResize && scene) {
                        this._OnBeforeRenderObserver = scene.onBeforeRenderObservable.add(() => {
                            scene.getEngine().resize();
                        });
                    }
                }
                this._CreateEmbedHost(scene, options, parentControl, Inspector.OnSelectionChangeObservable);
            }
        }
        else if (options.popup) {
            if (options.showExplorer) {
                if (this._SceneExplorerHost) {
                    this._SceneExplorerHost.style.width = "0";
                }
                this._CreateSceneExplorer(scene, options, this._CreatePopup("SCENE EXPLORER", "_SceneExplorerWindow"));
                this._SceneExplorerWindow.addEventListener("beforeunload", () => this._GlobalState.onSceneExplorerClosedObservable.notifyObservers());
            }
            if (options.showInspector) {
                if (this._ActionTabsHost) {
                    this._ActionTabsHost.style.width = "0";
                }
                this._CreateActionTabs(scene, options, this._CreatePopup("INSPECTOR", "_ActionTabsWindow"));
                this._ActionTabsWindow.addEventListener("beforeunload", () => this._GlobalState.onActionTabsClosedObservable.notifyObservers());
            }
        }
        else {
            let parentControl = (options.globalRoot ? options.globalRoot : rootElement.parentElement);
            if (!options.overlay && !this._NewCanvasContainer) {
                this._CreateCanvasContainer(parentControl);
            }
            else if (!options.overlay && this._NewCanvasContainer && this._NewCanvasContainer.parentElement) {
                // the root is now the parent of the canvas container
                parentControl = this._NewCanvasContainer.parentElement;
            }
            if (this._NewCanvasContainer) {
                // If we move things around, let's control the resize
                if (options.handleResize && scene) {
                    this._OnBeforeRenderObserver = scene.onBeforeRenderObservable.add(() => {
                        scene.getEngine().resize();
                    });
                }
            }
            if (options.showExplorer) {
                this._CreateSceneExplorer(scene, options, parentControl);
            }
            if (options.showInspector) {
                this._CreateActionTabs(scene, options, parentControl);
            }
        }
    }
    static _SetNewScene(scene) {
        this._Scene = scene;
        this._GlobalState.onNewSceneObservable.notifyObservers(scene);
    }
    static _CreateCanvasContainer(parentControl) {
        // Create a container for previous elements
        this._NewCanvasContainer = parentControl.ownerDocument.createElement("div");
        this._NewCanvasContainer.style.display = parentControl.style.display;
        parentControl.style.display = "flex";
        while (parentControl.childElementCount > 0) {
            const child = parentControl.childNodes[0];
            parentControl.removeChild(child);
            this._NewCanvasContainer.appendChild(child);
        }
        parentControl.appendChild(this._NewCanvasContainer);
        this._NewCanvasContainer.style.width = "100%";
        this._NewCanvasContainer.style.height = "100%";
    }
    static _DestroyCanvasContainer() {
        if (!this._NewCanvasContainer) {
            return;
        }
        const parentControl = this._NewCanvasContainer.parentElement;
        while (this._NewCanvasContainer.childElementCount > 0) {
            const child = this._NewCanvasContainer.childNodes[0];
            this._NewCanvasContainer.removeChild(child);
            parentControl.appendChild(child);
        }
        parentControl.removeChild(this._NewCanvasContainer);
        parentControl.style.display = this._NewCanvasContainer.style.display;
        this._NewCanvasContainer = null;
    }
    static _Cleanup() {
        if (Inspector._OpenedPane !== 0) {
            return;
        }
        // Gizmo disposal
        this._GlobalState.lightGizmos.forEach((g) => {
            if (g.light) {
                this._GlobalState.enableLightGizmo(g.light, false);
            }
        });
        this._GlobalState.cameraGizmos.forEach((g) => {
            if (g.camera) {
                this._GlobalState.enableCameraGizmo(g.camera, false);
            }
        });
        if (this._Scene && this._Scene.reservedDataStore && this._Scene.reservedDataStore.gizmoManager) {
            this._Scene.reservedDataStore.gizmoManager.dispose();
            this._Scene.reservedDataStore.gizmoManager = null;
        }
        if (this._NewCanvasContainer) {
            this._DestroyCanvasContainer();
        }
        if (this._OnBeforeRenderObserver && this._Scene) {
            this._Scene.onBeforeRenderObservable.remove(this._OnBeforeRenderObserver);
            this._OnBeforeRenderObserver = null;
            this._Scene.getEngine().resize();
        }
        this._GlobalState.onInspectorClosedObservable.notifyObservers(this._Scene);
    }
    static _RemoveElementFromDOM(element) {
        if (element && element.parentElement) {
            element.parentElement.removeChild(element);
        }
    }
    static Hide() {
        if (this._ActionTabsHost) {
            ReactDOM.unmountComponentAtNode(this._ActionTabsHost);
            this._RemoveElementFromDOM(this._ActionTabsHost);
            this._ActionTabsHost = null;
            this._GlobalState.onActionTabsClosedObservable.notifyObservers();
        }
        if (this._SceneExplorerHost) {
            ReactDOM.unmountComponentAtNode(this._SceneExplorerHost);
            if (this._SceneExplorerHost.parentElement) {
                this._SceneExplorerHost.parentElement.removeChild(this._SceneExplorerHost);
            }
            this._SceneExplorerHost = null;
            this._GlobalState.onSceneExplorerClosedObservable.notifyObservers();
        }
        if (this._EmbedHost) {
            ReactDOM.unmountComponentAtNode(this._EmbedHost);
            if (this._EmbedHost.parentElement) {
                this._EmbedHost.parentElement.removeChild(this._EmbedHost);
            }
            this._EmbedHost = null;
            this._GlobalState.onActionTabsClosedObservable.notifyObservers();
            this._GlobalState.onSceneExplorerClosedObservable.notifyObservers();
        }
        Inspector._OpenedPane = 0;
        this._Cleanup();
        if (!this._GlobalState.onPluginActivatedObserver) {
            SceneLoader.OnPluginActivatedObservable.remove(this._GlobalState.onPluginActivatedObserver);
            this._GlobalState.onPluginActivatedObserver = null;
        }
    }
    static _CreatePersistentPopup(config, hostElement) {
        if (this._PersistentPopupHost) {
            this._ClosePersistentPopup();
        }
        this._PersistentPopupHost = hostElement.ownerDocument.createElement("div");
        const popupElement = React.createElement(PopupComponent, config.props, config.children);
        ReactDOM.render(popupElement, this._PersistentPopupHost);
        if (config.closeWhenSceneExplorerCloses) {
            this._OnSceneExplorerClosedObserver = this._GlobalState.onSceneExplorerClosedObservable.add(() => this._ClosePersistentPopup());
        }
        if (config.closeWhenActionTabsCloses) {
            this._OnActionTabsClosedObserver = this._GlobalState.onActionTabsClosedObservable.add(() => this._ClosePersistentPopup());
        }
    }
    static _ClosePersistentPopup() {
        if (this._PersistentPopupHost) {
            ReactDOM.unmountComponentAtNode(this._PersistentPopupHost);
            this._PersistentPopupHost.remove();
            this._PersistentPopupHost = null;
        }
        if (this._OnSceneExplorerClosedObserver) {
            this._GlobalState.onSceneExplorerClosedObservable.remove(this._OnSceneExplorerClosedObserver);
            this._OnSceneExplorerClosedObserver = null;
        }
        if (this._OnActionTabsClosedObserver) {
            this._GlobalState.onActionTabsClosedObservable.remove(this._OnActionTabsClosedObserver);
            this._OnActionTabsClosedObserver = null;
        }
    }
}
Inspector._OpenedPane = 0;
Inspector.OnSelectionChangeObservable = new Observable();
Inspector.OnPropertyChangedObservable = new Observable();
Inspector._GlobalState = new GlobalState();
Inspector._SceneExplorerOptions = null;
Inspector._InspectorOptions = null;
Inspector._EmbedOptions = null;
Inspector.EarlyAttachToLoader();
//# sourceMappingURL=inspector.js.map