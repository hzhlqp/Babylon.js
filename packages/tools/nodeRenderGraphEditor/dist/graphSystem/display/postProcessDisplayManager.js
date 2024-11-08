export class PostProcessDisplayManager {
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
        return "#84995c";
    }
    updatePreviewContent(nodeData, contentArea) { }
}
//# sourceMappingURL=postProcessDisplayManager.js.map