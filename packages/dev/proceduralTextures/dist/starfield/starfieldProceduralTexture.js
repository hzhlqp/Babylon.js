import { __decorate } from "tslib";
import { serialize } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { RegisterClass } from "core/Misc/typeStore";
import "./starfieldProceduralTexture.fragment";
export class StarfieldProceduralTexture extends ProceduralTexture {
    constructor(name, size, scene = null, fallbackTexture, generateMipMaps) {
        super(name, size, "starfieldProceduralTexture", scene, fallbackTexture, generateMipMaps);
        this._time = 1;
        this._alpha = 0.5;
        this._beta = 0.8;
        this._zoom = 0.8;
        this._formuparam = 0.53;
        this._stepsize = 0.1;
        this._tile = 0.85;
        this._brightness = 0.0015;
        this._darkmatter = 0.4;
        this._distfading = 0.73;
        this._saturation = 0.85;
        this.updateShaderUniforms();
    }
    updateShaderUniforms() {
        this.setFloat("time", this._time);
        this.setFloat("alpha", this._alpha);
        this.setFloat("beta", this._beta);
        this.setFloat("zoom", this._zoom);
        this.setFloat("formuparam", this._formuparam);
        this.setFloat("stepsize", this._stepsize);
        this.setFloat("tile", this._tile);
        this.setFloat("brightness", this._brightness);
        this.setFloat("darkmatter", this._darkmatter);
        this.setFloat("distfading", this._distfading);
        this.setFloat("saturation", this._saturation);
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
        this.updateShaderUniforms();
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
        this.updateShaderUniforms();
    }
    get beta() {
        return this._beta;
    }
    set beta(value) {
        this._beta = value;
        this.updateShaderUniforms();
    }
    get formuparam() {
        return this._formuparam;
    }
    set formuparam(value) {
        this._formuparam = value;
        this.updateShaderUniforms();
    }
    get stepsize() {
        return this._stepsize;
    }
    set stepsize(value) {
        this._stepsize = value;
        this.updateShaderUniforms();
    }
    get zoom() {
        return this._zoom;
    }
    set zoom(value) {
        this._zoom = value;
        this.updateShaderUniforms();
    }
    get tile() {
        return this._tile;
    }
    set tile(value) {
        this._tile = value;
        this.updateShaderUniforms();
    }
    get brightness() {
        return this._brightness;
    }
    set brightness(value) {
        this._brightness = value;
        this.updateShaderUniforms();
    }
    get darkmatter() {
        return this._darkmatter;
    }
    set darkmatter(value) {
        this._darkmatter = value;
        this.updateShaderUniforms();
    }
    get distfading() {
        return this._distfading;
    }
    set distfading(value) {
        this._distfading = value;
        this.updateShaderUniforms();
    }
    get saturation() {
        return this._saturation;
    }
    set saturation(value) {
        this._saturation = value;
        this.updateShaderUniforms();
    }
    /**
     * Serializes this starfield procedural texture
     * @returns a serialized starfield procedural texture object
     */
    serialize() {
        const serializationObject = SerializationHelper.Serialize(this, super.serialize());
        serializationObject.customType = "BABYLON.StarfieldProceduralTexture";
        return serializationObject;
    }
    /**
     * Creates a Starfield Procedural Texture from parsed startfield procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing startfield procedural texture information
     * @returns a parsed Starfield Procedural Texture
     */
    static Parse(parsedTexture, scene, rootUrl) {
        const texture = SerializationHelper.Parse(() => new StarfieldProceduralTexture(parsedTexture.name, parsedTexture._size, scene, undefined, parsedTexture._generateMipMaps), parsedTexture, scene, rootUrl);
        return texture;
    }
}
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "time", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "alpha", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "beta", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "formuparam", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "stepsize", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "zoom", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "tile", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "brightness", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "darkmatter", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "distfading", null);
__decorate([
    serialize()
], StarfieldProceduralTexture.prototype, "saturation", null);
RegisterClass("BABYLON.StarfieldProceduralTexture", StarfieldProceduralTexture);
//# sourceMappingURL=starfieldProceduralTexture.js.map