export class OutputDisplayManager {
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
        return "rgb(106, 44, 131)";
    }
    updatePreviewContent(nodeData, contentArea) { }
}
//# sourceMappingURL=outputDisplayManager.js.map