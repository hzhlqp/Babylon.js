import { __decorate } from "tslib";
import { serialize, serializeAsColor4 } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Color4 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./cloudProceduralTexture.fragment";
export class CloudProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "cloudProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._skyColor = new Color4(0.15, 0.68, 1.0, 1.0);
        this._cloudColor = new Color4(1, 1, 1, 1.0);
        this._amplitude = 1;
        this._numOctaves = 4;
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setColor4("skyColor", this._skyColor);
        this.setColor4("cloudColor", this._cloudColor);
        this.setFloat("amplitude", this._amplitude);
        this.setInt("numOctaves", this._numOctaves);
    }
    get skyColor() {
        return this._skyColor;
    }
    set skyColor(value) {
        this._skyColor = value;
        this.updateShaderUniforms();
    }
    get cloudColor() {
        return this._cloudColor;
    }
    set cloudColor(value) {
        this._cloudColor = value;
        this.updateShaderUniforms();
    }
    get amplitude() {
        return this._amplitude;
    }
    set amplitude(value) {
        this._amplitude = value;
        this.updateShaderUniforms();
    }
    get numOctaves() {
        return this._numOctaves;
    }
    set numOctaves(value) {
        this._numOctaves = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this cloud procedural texture
     * @returns a serialized cloud procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.CloudProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Cloud Procedural Texture from parsed cloud procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing cloud procedural texture information
     * @returns a parsed Cloud Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new CloudProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serializeAsColor4()
], CloudProceduralTexture.prototype, "skyColor", null);
__decorate([
    serializeAsColor4()
], CloudProceduralTexture.prototype, "cloudColor", null);
__decorate([
    serialize()
], CloudProceduralTexture.prototype, "amplitude", null);
__decorate([
    serialize()
], CloudProceduralTexture.prototype, "numOctaves", null);
RegisterClass("BABYLON.CloudProceduralTexture", CloudProceduralTexture);
//# sourceMappingURL=cloudProceduralTexture.js.map