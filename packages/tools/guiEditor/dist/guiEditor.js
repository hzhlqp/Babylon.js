import * as React from "react";
import * as ReactDOM from "react-dom";
import { GlobalState } from "./globalState";
import { WorkbenchEditor } from "./workbenchEditor";
import { Popup } from "shared-ui-components/lines/popup";
/**
 * Class used to create a gui editor
 */
export class GUIEditor {
    /**
     * Show the gui editor
     * @param options defines the options to use to configure the gui editor
     * @param embed defines whether editor is being opened from the Playground
     */
    static async Show(options, embed) {
        let hostElement = options.hostElement;
        // if we are in a standalone window and we have some current state, just load the GUI from the snippet server, don't do anything else
        if (this._CurrentState && hostElement) {
            if (options.currentSnippetToken) {
                try {
                    this._CurrentState.workbench.loadFromSnippet(options.currentSnippetToken);
                }
                catch (error) {
                    //swallow and continue
                }
            }
            return;
        }
        if (!hostElement) {
            const popupWindow = Popup["gui-editor"];
            if (popupWindow) {
                popupWindow.close();
            }
            hostElement = Popup.CreatePopup("BABYLON.JS GUI EDITOR", "gui-editor", 1200, 800);
        }
        const globalState = new GlobalState();
        if (options.liveGuiTexture) {
            globalState.liveGuiTexture = options.liveGuiTexture;
        }
        globalState.hostElement = hostElement;
        globalState.hostDocument = hostElement.ownerDocument;
        globalState.customSave = options.customSave;
        globalState.customLoad = options.customLoad;
        globalState.hostWindow = hostElement.ownerDocument.defaultView;
        globalState.registerEventListeners();
        const graphEditor = React.createElement(WorkbenchEditor, {
            globalState: globalState,
        });
        ReactDOM.render(graphEditor, hostElement);
        // create the middle workbench canvas
        if (!globalState.guiTexture) {
            globalState.workbench.createGUICanvas(embed);
            if (options.currentSnippetToken) {
                try {
                    await globalState.workbench.loadFromSnippet(options.currentSnippetToken);
                }
                catch (error) {
                    //swallow and continue
                }
            }
        }
        if (options.customLoadObservable) {
            options.customLoadObservable.add(() => {
                globalState.onResetRequiredObservable.notifyObservers();
                globalState.onBuiltObservable.notifyObservers();
            });
        }
        this._CurrentState = globalState;
        // Close the popup window when the page is refreshed or scene is disposed
        const popupWindow = Popup["gui-editor"];
        if (popupWindow) {
            window.onbeforeunload = () => {
                const popupWindow = Popup["gui-editor"];
                if (popupWindow) {
                    popupWindow.close();
                }
            };
        }
        globalState.hostWindow.addEventListener("beforeunload", () => {
            globalState.onPopupClosedObservable.notifyObservers();
            globalState.dispose();
        });
    }
}
//# sourceMappingURL=guiEditor.js.map