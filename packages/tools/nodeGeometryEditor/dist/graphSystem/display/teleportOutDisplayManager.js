import { BlockTools } from "../../blockTools";
export class TeleportOutDisplayManager {
    constructor() {
        this._hasHighlights = false;
    }
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return true;
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    getBackgroundColor(nodeData) {
        const block = nodeData.data;
        return `linear-gradient(to right, white, ${BlockTools.GetColorFromConnectionNodeType(block.output.type)})`;
    }
    updatePreviewContent(nodeData, contentArea) { }
    onSelectionChanged(nodeData, selectedData, manager) {
        const block = nodeData.data;
        if (selectedData !== nodeData) {
            if (this._hasHighlights) {
                let removeHighlight;
                if (selectedData && selectedData.data.getClassName() === "TeleportOutBlock") {
                    const otherTeleport = selectedData.data;
                    removeHighlight = otherTeleport.entryPoint !== block.entryPoint;
                }
                else {
                    removeHighlight = true;
                }
                if (removeHighlight) {
                    manager.onHighlightNodeObservable.notifyObservers({ data: block.entryPoint, active: false });
                }
                this._hasHighlights = false;
            }
            return;
        }
        if (block.entryPoint) {
            manager.onHighlightNodeObservable.notifyObservers({ data: block.entryPoint, active: true });
            this._hasHighlights = true;
        }
    }
    onDispose(nodeData, manager) {
        const block = nodeData.data;
        if (block.entryPoint) {
            manager.onHighlightNodeObservable.notifyObservers({ data: block.entryPoint, active: false });
        }
    }
}
//# sourceMappingURL=teleportOutDisplayManager.js.map