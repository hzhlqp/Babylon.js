import { __decorate } from "tslib";
import { serialize, serializeAsColor3 } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Color3 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./woodProceduralTexture.fragment";
export class WoodProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "woodProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._ampScale = 100.0;
        this._woodColor = new Color3(0.32, 0.17, 0.09);
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("ampScale", this._ampScale);
        this.setColor3("woodColor", this._woodColor);
    }
    get ampScale() {
        return this._ampScale;
    }
    set ampScale(value) {
        this._ampScale = value;
        this.updateShaderUniforms();
    }
    get woodColor() {
        return this._woodColor;
    }
    set woodColor(value) {
        this._woodColor = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this wood procedural texture
     * @returns a serialized wood procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.WoodProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Wood Procedural Texture from parsed wood procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing wood procedural texture information
     * @returns a parsed Wood Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new WoodProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serialize()
], WoodProceduralTexture.prototype, "ampScale", null);
__decorate([
    serializeAsColor3()
], WoodProceduralTexture.prototype, "woodColor", null);
RegisterClass("BABYLON.WoodProceduralTexture", WoodProceduralTexture);
//# sourceMappingURL=woodProceduralTexture.js.map