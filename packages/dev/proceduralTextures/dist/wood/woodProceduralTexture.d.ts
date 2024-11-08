import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./woodProceduralTexture.fragment";
export declare class WoodProceduralTexture extends ProceduralTexture {
    private _ampScale;
    private _woodColor;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get ampScale(): number;
    set ampScale(value: number);
    get woodColor(): Color3;
    set woodColor(value: Color3);
    /**
     * Serializes this wood procedural texture
     * @returns a serialized wood procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Wood Procedural Texture from parsed wood procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing wood procedural texture information
     * @returns a parsed Wood Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): WoodProceduralTexture;
}
