export class DiscardDisplayManager {
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
        return "#540b0b";
    }
    updatePreviewContent(nodeData, contentArea) {
        contentArea.classList.add("discard-block");
    }
}
//# sourceMappingURL=discardDisplayManager.js.map