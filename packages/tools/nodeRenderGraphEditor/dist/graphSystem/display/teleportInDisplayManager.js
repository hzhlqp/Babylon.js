import { BlockTools } from "../../blockTools";
export class TeleportInDisplayManager {
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
        return `linear-gradient(to right, ${BlockTools.GetColorFromConnectionNodeType(block.input.type)}, white)`;
    }
    updatePreviewContent(nodeData, contentArea) { }
    onSelectionChanged(nodeData, selectedData, manager) {
        const block = nodeData.data;
        if (selectedData !== nodeData) {
            if (this._hasHighlights) {
                for (const endpoint of block.endpoints) {
                    manager.onHighlightNodeObservable.notifyObservers({ data: endpoint, active: false });
                }
                this._hasHighlights = false;
            }
            return;
        }
        for (const endpoint of block.endpoints) {
            manager.onHighlightNodeObservable.notifyObservers({ data: endpoint, active: true });
        }
        this._hasHighlights = true;
    }
    onDispose(nodeData, manager) {
        const block = nodeData.data;
        for (const endpoint of block.endpoints) {
            manager.onHighlightNodeObservable.notifyObservers({ data: endpoint, active: false });
        }
    }
}
//# sourceMappingURL=teleportInDisplayManager.js.map