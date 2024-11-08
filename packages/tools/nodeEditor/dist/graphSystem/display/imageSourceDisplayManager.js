import { TextureLineComponent } from "../../sharedComponents/textureLineComponent";
import localStyles from "./imageSourceDisplayManager.modules.scss";
import commonStyles from "./common.modules.scss";
export class ImageSourceDisplayManager {
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
    updatePreviewContent(nodeData, contentArea) {
        const imageSourceBlock = nodeData.data;
        if (!this._previewCanvas) {
            contentArea.classList.add(commonStyles["texture-block"]);
            contentArea.classList.add(localStyles["image-source-block"]);
            this._previewCanvas = contentArea.ownerDocument.createElement("canvas");
            this._previewImage = contentArea.ownerDocument.createElement("img");
            contentArea.appendChild(this._previewImage);
            this._previewImage.classList.add(commonStyles.empty);
        }
        if (imageSourceBlock.texture) {
            TextureLineComponent.UpdatePreview(this._previewCanvas, imageSourceBlock.texture, 140, {
                face: 0,
                displayRed: true,
                displayAlpha: true,
                displayBlue: true,
                displayGreen: true,
            }, () => {
                this._previewImage.src = this._previewCanvas.toDataURL("image/png");
                this._previewImage.classList.remove(commonStyles.empty);
            });
        }
        else {
            this._previewImage.classList.add(commonStyles.empty);
        }
    }
}
//# sourceMappingURL=imageSourceDisplayManager.js.map