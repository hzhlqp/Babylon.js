import { TextureBlock } from "core/Materials/Node/Blocks/Dual/textureBlock";
import { RefractionBlock } from "core/Materials/Node/Blocks/PBR/refractionBlock";
import { ReflectionTextureBlock } from "core/Materials/Node/Blocks/Dual/reflectionTextureBlock";
import { TextureLineComponent } from "../../sharedComponents/textureLineComponent";
import { CurrentScreenBlock } from "core/Materials/Node/Blocks/Dual/currentScreenBlock";
import { ParticleTextureBlock } from "core/Materials/Node/Blocks/Particle/particleTextureBlock";
import { ReflectionBlock } from "core/Materials/Node/Blocks/PBR/reflectionBlock";
import { TriPlanarBlock } from "core/Materials/Node/Blocks/triPlanarBlock";
import localStyles from "./textureDisplayManager.modules.scss";
import commonStyles from "./common.modules.scss";
export class TextureDisplayManager {
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return true;
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    getBackgroundColor(nodeData) {
        const block = nodeData.data;
        return block.getClassName() === "RefractionBlock" || block.getClassName() === "ReflectionBlock" ? "#6174FA" : "#323232";
    }
    updatePreviewContent(nodeData, contentArea) {
        const block = nodeData.data;
        const textureBlock = block;
        if (!this._previewCanvas) {
            contentArea.classList.add(commonStyles["texture-block"]);
            if (block instanceof TextureBlock) {
                contentArea.classList.add(localStyles["regular-texture-block"]);
            }
            if (block instanceof ReflectionTextureBlock || block instanceof ReflectionBlock) {
                contentArea.classList.add(localStyles["reflection-block"]);
            }
            if (block instanceof CurrentScreenBlock || block instanceof ParticleTextureBlock) {
                contentArea.classList.add(localStyles["reduced-texture-block"]);
            }
            if (block instanceof TriPlanarBlock) {
                contentArea.classList.add(localStyles["triplanar-texture-block"]);
            }
            if (block instanceof RefractionBlock) {
                contentArea.classList.add(localStyles["refraction-texture-block"]);
            }
            this._previewCanvas = contentArea.ownerDocument.createElement("canvas");
            this._previewImage = contentArea.ownerDocument.createElement("img");
            contentArea.appendChild(this._previewImage);
            this._previewImage.classList.add(commonStyles.empty);
        }
        if (textureBlock.texture) {
            TextureLineComponent.UpdatePreview(this._previewCanvas, textureBlock.texture, 140, {
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
//# sourceMappingURL=textureDisplayManager.js.map