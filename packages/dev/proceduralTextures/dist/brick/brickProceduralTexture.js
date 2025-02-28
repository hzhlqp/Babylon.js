import { __decorate } from "tslib";
import { serialize, serializeAsColor3 } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Color3 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./brickProceduralTexture.fragment";
export class BrickProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "brickProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._numberOfBricksHeight = 15;
        this._numberOfBricksWidth = 5;
        this._jointColor = new Color3(0.72, 0.72, 0.72);
        this._brickColor = new Color3(0.77, 0.47, 0.4);
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("numberOfBricksHeight", this._numberOfBricksHeight);
        this.setFloat("numberOfBricksWidth", this._numberOfBricksWidth);
        this.setColor3("brickColor", this._brickColor);
        this.setColor3("jointColor", this._jointColor);
    }
    get numberOfBricksHeight() {
        return this._numberOfBricksHeight;
    }
    set numberOfBricksHeight(value) {
        this._numberOfBricksHeight = value;
        this.updateShaderUniforms();
    }
    get numberOfBricksWidth() {
        return this._numberOfBricksWidth;
    }
    set numberOfBricksWidth(value) {
        this._numberOfBricksWidth = value;
        this.updateShaderUniforms();
    }
    get jointColor() {
        return this._jointColor;
    }
    set jointColor(value) {
        this._jointColor = value;
        this.updateShaderUniforms();
    }
    get brickColor() {
        return this._brickColor;
    }
    set brickColor(value) {
        this._brickColor = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this brick procedural texture
     * @returns a serialized brick procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.BrickProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Brick Procedural Texture from parsed brick procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing brick procedural texture information
     * @returns a parsed Brick Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new BrickProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serialize()
], BrickProceduralTexture.prototype, "numberOfBricksHeight", null);
__decorate([
    serialize()
], BrickProceduralTexture.prototype, "numberOfBricksWidth", null);
__decorate([
    serializeAsColor3()
], BrickProceduralTexture.prototype, "jointColor", null);
__decorate([
    serializeAsColor3()
], BrickProceduralTexture.prototype, "brickColor", null);
RegisterClass("BABYLON.BrickProceduralTexture", BrickProceduralTexture);
//# sourceMappingURL=brickProceduralTexture.js.map