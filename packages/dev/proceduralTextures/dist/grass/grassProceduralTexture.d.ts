import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./grassProceduralTexture.fragment";
export declare class GrassProceduralTexture extends ProceduralTexture {
    private _grassColors;
    private _groundColor;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get grassColors(): Color3[];
    set grassColors(value: Color3[]);
    get groundColor(): Color3;
    set groundColor(value: Color3);
    /**
     * Serializes this grass procedural texture
     * @returns a serialized grass procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Grass Procedural Texture from parsed grass procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing grass procedural texture information
     * @returns a parsed Grass Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): GrassProceduralTexture;
}
