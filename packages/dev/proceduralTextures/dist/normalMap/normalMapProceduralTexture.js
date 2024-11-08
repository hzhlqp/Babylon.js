import { __decorate } from "tslib";
import { serializeAsTexture } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./normalMapProceduralTexture.fragment";
export class NormalMapProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "normalMapProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setTexture("baseSampler", this._baseTexture);
        this.setFloat("size", this.getRenderSize());
    }
    render(useCameraPostProcess) {
        super.render(useCameraPostProcess);
    }
    resize(size, generateMipMaps) {
        super.resize(size, generateMipMaps);
        // We need to update the "size" uniform
        this.updateShaderUniforms();
    }
    isReady() {
        if (!this._baseTexture || !this._baseTexture.isReady()) {
            return false;
        }
        return super.isReady();
    }
    get baseTexture() {
        return this._baseTexture;
    }
    set baseTexture(texture) {
        this._baseTexture = texture;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this normal map procedural texture
     * @returns a serialized normal map procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.NormalMapProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Normal Map Procedural Texture from parsed normal map procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing normal map procedural texture information
     * @returns a parsed Normal Map Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new NormalMapProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serializeAsTexture()
], NormalMapProceduralTexture.prototype, "baseTexture", null);
RegisterClass("BABYLON.NormalMapProceduralTexture", NormalMapProceduralTexture);
//# sourceMappingURL=normalMapProceduralTexture.js.map