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
    updatePreviewContent(nodeData, contentArea) {
        contentArea.classList.add("output-block");
    }
}
//# sourceMappingURL=outputDisplayManager.js.map