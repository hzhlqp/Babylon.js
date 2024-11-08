import { __decorate } from "tslib";
import { serialize } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Color3 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./marbleProceduralTexture.fragment";
export class MarbleProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "marbleProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._numberOfTilesHeight = 3;
        this._numberOfTilesWidth = 3;
        this._amplitude = 9.0;
        this._jointColor = new Color3(0.72, 0.72, 0.72);
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("numberOfTilesHeight", this._numberOfTilesHeight);
        this.setFloat("numberOfTilesWidth", this._numberOfTilesWidth);
        this.setFloat("amplitude", this._amplitude);
        this.setColor3("jointColor", this._jointColor);
    }
    get numberOfTilesHeight() {
        return this._numberOfTilesHeight;
    }
    set numberOfTilesHeight(value) {
        this._numberOfTilesHeight = value;
        this.updateShaderUniforms();
    }
    get amplitude() {
        return this._amplitude;
    }
    set amplitude(value) {
        this._amplitude = value;
        this.updateShaderUniforms();
    }
    get numberOfTilesWidth() {
        return this._numberOfTilesWidth;
    }
    set numberOfTilesWidth(value) {
        this._numberOfTilesWidth = value;
        this.updateShaderUniforms();
    }
    get jointColor() {
        return this._jointColor;
    }
    set jointColor(value) {
        this._jointColor = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this marble procedural texture
     * @returns a serialized marble procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.MarbleProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Marble Procedural Texture from parsed marble procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing marble procedural texture information
     * @returns a parsed Marble Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new MarbleProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serialize()
], MarbleProceduralTexture.prototype, "numberOfTilesHeight", null);
__decorate([
    serialize()
], MarbleProceduralTexture.prototype, "amplitude", null);
__decorate([
    serialize()
], MarbleProceduralTexture.prototype, "numberOfTilesWidth", null);
__decorate([
    serialize()
], MarbleProceduralTexture.prototype, "jointColor", null);
RegisterClass("BABYLON.MarbleProceduralTexture", MarbleProceduralTexture);
//# sourceMappingURL=marbleProceduralTexture.js.map