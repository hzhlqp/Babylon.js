export class LoopDisplayManager {
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return true;
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    getBackgroundColor() {
        return "rgb(86, 185, 120)";
    }
    updatePreviewContent(nodeData, contentArea) { }
}
//# sourceMappingURL=loopDisplayManager.js.map