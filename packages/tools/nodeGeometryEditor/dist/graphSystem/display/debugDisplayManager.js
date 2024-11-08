import { BlockTools } from "../../blockTools";
import styles from "./debugDisplayManager.modules.scss";
export class DebugDisplayManager {
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
        const debugBlock = nodeData.data;
        return BlockTools.GetColorFromConnectionNodeType(debugBlock.input.type);
    }
    updatePreviewContent(_nodeData, _contentArea) { }
    updateFullVisualContent(data, visualContent) {
        const visual = visualContent.visual;
        const headerContainer = visualContent.headerContainer;
        const content = visualContent.content;
        const connections = visualContent.connections;
        const selectionBorder = visualContent.selectionBorder;
        visual.classList.add(styles.debugBlock);
        headerContainer.classList.add(styles.hidden);
        content.classList.add(styles.debugContent);
        content.innerHTML = "?";
        connections.classList.add(styles.translatedConnections);
        selectionBorder.classList.add(styles.roundSelectionBorder);
    }
}
//# sourceMappingURL=debugDisplayManager.js.map