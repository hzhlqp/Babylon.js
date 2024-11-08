import { BlockTools } from "../../blockTools";
import styles from "./elbowDisplayManager.modules.scss";
export class ElbowDisplayManager {
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
        const elbowBlock = nodeData.data;
        return BlockTools.GetColorFromConnectionNodeType(elbowBlock.input.type);
    }
    updatePreviewContent(_nodeData, _contentArea) { }
    updateFullVisualContent(data, visualContent) {
        const visual = visualContent.visual;
        const headerContainer = visualContent.headerContainer;
        const content = visualContent.content;
        const connections = visualContent.connections;
        const selectionBorder = visualContent.selectionBorder;
        visual.classList.add(styles.elbowBlock);
        headerContainer.classList.add(styles.hidden);
        content.classList.add(styles.hidden);
        connections.classList.add(styles.translatedConnections);
        selectionBorder.classList.add(styles.roundSelectionBorder);
    }
}
//# sourceMappingURL=elbowDisplayManager.js.map