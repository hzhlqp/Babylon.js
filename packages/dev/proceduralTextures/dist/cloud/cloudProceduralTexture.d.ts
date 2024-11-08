import { Color4 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./cloudProceduralTexture.fragment";
export declare class CloudProceduralTexture extends ProceduralTexture {
    private _skyColor;
    private _cloudColor;
    private _amplitude;
    private _numOctaves;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get skyColor(): Color4;
    set skyColor(value: Color4);
    get cloudColor(): Color4;
    set cloudColor(value: Color4);
    get amplitude(): number;
    set amplitude(value: number);
    get numOctaves(): number;
    set numOctaves(value: number);
    /**
     * Serializes this cloud procedural texture
     * @returns a serialized cloud procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Cloud Procedural Texture from parsed cloud procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing cloud procedural texture information
     * @returns a parsed Cloud Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): CloudProceduralTexture;
}
