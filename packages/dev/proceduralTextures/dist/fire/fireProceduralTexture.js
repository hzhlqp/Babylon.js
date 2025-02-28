import { __decorate } from "tslib";
import { serialize, serializeAsVector2 } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { Vector2 } from "core/Maths/math.vector";
import { Color3 } from "core/Maths/math.color";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./fireProceduralTexture.fragment";
export class FireProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "fireProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._time = 0.0;
        this._speed = new Vector2(0.5, 0.3);
        this._autoGenerateTime = true;
        this._alphaThreshold = 0.5;
        this._fireColors = FireProceduralTexture.RedFireColors;
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("time", this._time);
        this.setVector2("speed", this._speed);
        this.setColor3("c1", this._fireColors[0]);
        this.setColor3("c2", this._fireColors[1]);
        this.setColor3("c3", this._fireColors[2]);
        this.setColor3("c4", this._fireColors[3]);
        this.setColor3("c5", this._fireColors[4]);
        this.setColor3("c6", this._fireColors[5]);
        this.setFloat("alphaThreshold", this._alphaThreshold);
    }
    render(useCameraPostProcess) {
        const scene = this.getScene();
        if (this._autoGenerateTime && scene) {
            this._time += scene.getAnimationRatio() * 0.03;
            this.updateShaderUniforms();
        }
        super.render(useCameraPostProcess);
    }
    static get PurpleFireColors() {
        return [new Color3(0.5, 0.0, 1.0), new Color3(0.9, 0.0, 1.0), new Color3(0.2, 0.0, 1.0), new Color3(1.0, 0.9, 1.0), new Color3(0.1, 0.1, 1.0), new Color3(0.9, 0.9, 1.0)];
    }
    static get GreenFireColors() {
        return [new Color3(0.5, 1.0, 0.0), new Color3(0.5, 1.0, 0.0), new Color3(0.3, 0.4, 0.0), new Color3(0.5, 1.0, 0.0), new Color3(0.2, 0.0, 0.0), new Color3(0.5, 1.0, 0.0)];
    }
    static get RedFireColors() {
        return [new Color3(0.5, 0.0, 0.1), new Color3(0.9, 0.0, 0.0), new Color3(0.2, 0.0, 0.0), new Color3(1.0, 0.9, 0.0), new Color3(0.1, 0.1, 0.1), new Color3(0.9, 0.9, 0.9)];
    }
    static get BlueFireColors() {
        return [new Color3(0.1, 0.0, 0.5), new Color3(0.0, 0.0, 0.5), new Color3(0.1, 0.0, 0.2), new Color3(0.0, 0.0, 1.0), new Color3(0.1, 0.2, 0.3), new Color3(0.0, 0.2, 0.9)];
    }
    get autoGenerateTime() {
        return this._autoGenerateTime;
    }
    set autoGenerateTime(value) {
        this._autoGenerateTime = value;
    }
    get fireColors() {
        return this._fireColors;
    }
    set fireColors(value) {
        this._fireColors = value;
        this.updateShaderUniforms();
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
        this.updateShaderUniforms();
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.updateShaderUniforms();
    }
    get alphaThreshold() {
        return this._alphaThreshold;
    }
    set alphaThreshold(value) {
        this._alphaThreshold = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this fire procedural texture
     * @returns a serialized fire procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.FireProceduralTexture";
        serializationObject.fireColors = [];
        for (let i = 0; i < this._fireColors.length; i++) {
            serializationObject.fireColors.push(this._fireColors[i].asArray());
        }
        return serializationObject;
    }
    /**
     * Creates a Fire Procedural Texture from parsed fire procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing fire procedural texture information
     * @returns a parsed Fire Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new FireProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        const colors = [];
        for (let i = 0; i < parsedTexture.fireColors.length; i++) {
            colors.push(Color3.FromArray(parsedTexture.fireColors[i]));
        }
        texture.fireColors = colors;
        return texture;
    }
}
__decorate([
    serialize()
], FireProceduralTexture.prototype, "autoGenerateTime", null);
__decorate([
    serialize()
], FireProceduralTexture.prototype, "time", null);
__decorate([
    serializeAsVector2()
], FireProceduralTexture.prototype, "speed", null);
__decorate([
    serialize()
], FireProceduralTexture.prototype, "alphaThreshold", null);
RegisterClass("BABYLON.FireProceduralTexture", FireProceduralTexture);
//# sourceMappingURL=fireProceduralTexture.js.map