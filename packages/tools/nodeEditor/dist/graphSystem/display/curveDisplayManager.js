import { CurveBlockTypes } from "core/Materials/Node/Blocks/curveBlock";
import styles from "./curveDisplayManager.modules.scss";
export class CurveDisplayManager {
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return false;
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    getBackgroundColor() {
        return "#405C86";
    }
    updatePreviewContent(nodeData, contentArea) {
        const curveBlock = nodeData.data;
        contentArea.classList.add(styles["curve-block"]);
        contentArea.innerHTML = CurveBlockTypes[curveBlock.type];
    }
}
//# sourceMappingURL=curveDisplayManager.js.map