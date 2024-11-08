export class PBRDisplayManager {
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
        return "#6174FA";
    }
    updatePreviewContent(nodeData, contentArea) {
        contentArea.classList.add("pbr-block");
    }
}
//# sourceMappingURL=pbrDisplayManager.js.map