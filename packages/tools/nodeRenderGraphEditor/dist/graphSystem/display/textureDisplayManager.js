export class TextureDisplayManager {
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
        return "#323232";
    }
    updatePreviewContent(nodeData, contentArea) { }
}
//# sourceMappingURL=textureDisplayManager.js.map