import { BlockTools } from "../../blockTools";
import styles from "./inputDisplayManager.modules.scss";
import { NodeRenderGraphBlockConnectionPointTypes } from "core/FrameGraph/Node/Types/nodeRenderGraphTypes";
export class InputDisplayManager {
    getHeaderClass(_nodeData) {
        return "";
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    shouldDisplayPortLabels() {
        return false;
    }
    static GetBaseType(type) {
        return NodeRenderGraphBlockConnectionPointTypes[type];
    }
    getBackgroundColor(nodeData) {
        let color = "";
        const inputBlock = nodeData.data;
        switch (inputBlock.type) {
            default:
                color = BlockTools.GetColorFromConnectionNodeType(inputBlock.type);
                break;
        }
        return color;
    }
    updatePreviewContent(nodeData, contentArea) {
        let value = "";
        const inputBlock = nodeData.data;
        switch (inputBlock.type) {
            case NodeRenderGraphBlockConnectionPointTypes.Texture:
            case NodeRenderGraphBlockConnectionPointTypes.TextureDepthStencilAttachment:
                value = `${inputBlock.isExternal ? "external" : "internal"}`;
                break;
        }
        contentArea.innerHTML = value;
        contentArea.classList.add(styles["input-block"]);
    }
}
//# sourceMappingURL=inputDisplayManager.js.map