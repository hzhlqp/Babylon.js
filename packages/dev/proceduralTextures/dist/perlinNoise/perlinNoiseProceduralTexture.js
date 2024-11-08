import { __decorate } from "tslib";
import { serialize } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./perlinNoiseProceduralTexture.fragment";
export class PerlinNoiseProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "perlinNoiseProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this.time = 0.0;
        this.timeScale = 1.0;
        this.translationSpeed = 1.0;
        this._currentTranslation = 0;
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("size", this.getRenderSize());
        const scene = this.getScene();
        if (!scene) {
            return;
        }
        const deltaTime = scene.getEngine().getDeltaTime();
        this.time += deltaTime;
        this.setFloat("time", (this.time * this.timeScale) / 1000);
        this._currentTranslation += (deltaTime * this.translationSpeed) / 1000.0;
        this.setFloat("translationSpeed", this._currentTranslation);
    }
    render(useCameraPostProcess) {
        this.updateShaderUniforms();
        super.render(useCameraPostProcess);
    }
    resize(size, generateMipMaps) {
        super.resize(size, generateMipMaps);
    }
    /**
     * Serializes this perlin noise procedural texture
     * @returns a serialized perlin noise procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.PerlinNoiseProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Perlin Noise Procedural Texture from parsed perlin noise procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing perlin noise procedural texture information
     * @returns a parsed Perlin Noise Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new PerlinNoiseProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serialize()
], PerlinNoiseProceduralTexture.prototype, "time", void 0);
__decorate([
    serialize()
], PerlinNoiseProceduralTexture.prototype, "timeScale", void 0);
__decorate([
    serialize()
], PerlinNoiseProceduralTexture.prototype, "translationSpeed", void 0);
RegisterClass("BABYLON.PerlinNoiseProceduralTexture", PerlinNoiseProceduralTexture);
//# sourceMappingURL=perlinNoiseProceduralTexture.js.map