import * as React from "react";
import * as ReactDOM from "react-dom";
import { GlobalState } from "./globalState";
import { GraphEditor } from "./graphEditor";
import { Popup } from "./sharedComponents/popup";
import { SerializationTools } from "./serializationTools";
import { PreviewType } from "./components/preview/previewType";
import { DataStorage } from "core/Misc/dataStorage";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { RegisterToDisplayManagers } from "./graphSystem/registerToDisplayLedger";
import { RegisterToPropertyTabManagers } from "./graphSystem/registerToPropertyLedger";
import { RegisterTypeLedger } from "./graphSystem/registerToTypeLedger";
/**
 * Class used to create a node editor
 */
export class NodeEditor {
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options) {
        // Initial setup
        RegisterToDisplayManagers();
        RegisterToPropertyTabManagers();
        RegisterTypeLedger();
        if (this._CurrentState) {
            const popupWindow = Popup["node-editor"];
            if (popupWindow) {
                popupWindow.close();
            }
        }
        let hostElement = options.hostElement;
        if (!hostElement) {
            hostElement = Popup.CreatePopup("BABYLON.JS NODE EDITOR", "node-editor", 1000, 800);
        }
        const globalState = new GlobalState();
        globalState.nodeMaterial = options.nodeMaterial;
        globalState.mode = options.nodeMaterial.mode;
        globalState.hostElement = hostElement;
        globalState.hostDocument = hostElement.ownerDocument;
        globalState.customSave = options.customSave;
        globalState.hostWindow = hostElement.ownerDocument.defaultView;
        globalState.stateManager.hostDocument = globalState.hostDocument;
        if (options.backgroundColor) {
            globalState.backgroundColor = options.backgroundColor;
        }
        const graphEditor = React.createElement(GraphEditor, {
            globalState: globalState,
        });
        ReactDOM.render(graphEditor, hostElement);
        if (options.customLoadObservable) {
            options.customLoadObservable.add((data) => {
                SerializationTools.Deserialize(data, globalState);
                globalState.mode = options.nodeMaterial.mode;
                globalState.onResetRequiredObservable.notifyObservers(false);
                globalState.onBuiltObservable.notifyObservers();
            });
        }
        this._CurrentState = globalState;
        globalState.hostWindow.addEventListener("beforeunload", () => {
            globalState.onPopupClosedObservable.notifyObservers();
        });
        // Close the popup window when the page is refreshed or scene is disposed
        const popupWindow = Popup["node-editor"];
        if (globalState.nodeMaterial && popupWindow) {
            globalState.nodeMaterial.getScene().onDisposeObservable.addOnce(() => {
                if (popupWindow) {
                    popupWindow.close();
                }
            });
            window.onbeforeunload = () => {
                const popupWindow = Popup["node-editor"];
                if (popupWindow) {
                    popupWindow.close();
                }
            };
        }
        window.addEventListener("beforeunload", () => {
            if (DataStorage.ReadNumber("PreviewType", PreviewType.Box) === PreviewType.Custom) {
                DataStorage.WriteNumber("PreviewType", globalState.mode === NodeMaterialModes.Material ? PreviewType.Box : PreviewType.Bubbles);
            }
        });
    }
}
//# sourceMappingURL=nodeEditor.js.map