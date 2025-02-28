import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./starfieldProceduralTexture.fragment";
export declare class StarfieldProceduralTexture extends ProceduralTexture {
    private _time;
    private _alpha;
    private _beta;
    private _zoom;
    private _formuparam;
    private _stepsize;
    private _tile;
    private _brightness;
    private _darkmatter;
    private _distfading;
    private _saturation;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get time(): number;
    set time(value: number);
    get alpha(): number;
    set alpha(value: number);
    get beta(): number;
    set beta(value: number);
    get formuparam(): number;
    set formuparam(value: number);
    get stepsize(): number;
    set stepsize(value: number);
    get zoom(): number;
    set zoom(value: number);
    get tile(): number;
    set tile(value: number);
    get brightness(): number;
    set brightness(value: number);
    get darkmatter(): number;
    set darkmatter(value: number);
    get distfading(): number;
    set distfading(value: number);
    get saturation(): number;
    set saturation(value: number);
    /**
     * Serializes this starfield procedural texture
     * @returns a serialized starfield procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Starfield Procedural Texture from parsed startfield procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing startfield procedural texture information
     * @returns a parsed Starfield Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): StarfieldProceduralTexture;
}
