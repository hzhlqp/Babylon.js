import styles from "./remapDisplayManager.modules.scss";
export class RemapDisplayManager {
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
        return "#4086BB";
    }
    _extractInputValue(connectionPoint) {
        const connectedBlock = connectionPoint.connectedPoint.ownerBlock;
        if (connectedBlock.isInput) {
            const inputBlock = connectedBlock;
            if (inputBlock.isUniform && !inputBlock.isSystemValue) {
                return inputBlock.value;
            }
        }
        return "?";
    }
    updatePreviewContent(nodeData, contentArea) {
        const remapBlock = nodeData.data;
        const sourceRangeX = remapBlock.sourceMin.isConnected ? this._extractInputValue(remapBlock.sourceMin) : remapBlock.sourceRange.x;
        const sourceRangeY = remapBlock.sourceMax.isConnected ? this._extractInputValue(remapBlock.sourceMax) : remapBlock.sourceRange.y;
        const targetRangeX = remapBlock.targetMin.isConnected ? this._extractInputValue(remapBlock.targetMin) : remapBlock.targetRange.x;
        const targetRangeY = remapBlock.targetMax.isConnected ? this._extractInputValue(remapBlock.targetMax) : remapBlock.targetRange.y;
        contentArea.classList.add(styles["remap-block"]);
        contentArea.innerHTML = `[${sourceRangeX}, ${sourceRangeY}] -> [${targetRangeX}, ${targetRangeY}]`;
    }
}
//# sourceMappingURL=remapDisplayManager.js.map