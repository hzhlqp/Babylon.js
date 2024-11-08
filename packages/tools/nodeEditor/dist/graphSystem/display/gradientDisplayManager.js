import styles from "./gradientDisplayManager.modules.scss";
export class GradientDisplayManager {
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return false;
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    getBackgroundColor(nodeData) {
        const gradientBlock = nodeData.data;
        const gradients = gradientBlock.colorSteps.map((c) => `rgb(${c.color.r * 255}, ${c.color.g * 255}, ${c.color.b * 255}) ${c.step * 100}%`);
        return gradients.length ? `linear-gradient(90deg, ${gradients.join(", ")})` : "black";
    }
    updatePreviewContent(nodeData, contentArea) {
        contentArea.classList.add(styles.gradientBlock);
    }
}
//# sourceMappingURL=gradientDisplayManager.js.map