import { __decorate } from "tslib";
import { serializeAsColor3 } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Color3 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./roadProceduralTexture.fragment";
export class RoadProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "roadProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._roadColor = new Color3(0.53, 0.53, 0.53);
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setColor3("roadColor", this._roadColor);
    }
    get roadColor() {
        return this._roadColor;
    }
    set roadColor(value) {
        this._roadColor = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this road procedural texture
     * @returns a serialized road procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.RoadProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Road Procedural Texture from parsed road procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing road procedural texture information
     * @returns a parsed Road Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new RoadProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serializeAsColor3()
], RoadProceduralTexture.prototype, "roadColor", null);
RegisterClass("BABYLON.RoadProceduralTexture", RoadProceduralTexture);
//# sourceMappingURL=roadProceduralTexture.js.map