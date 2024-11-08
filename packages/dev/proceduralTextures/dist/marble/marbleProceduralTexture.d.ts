import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./marbleProceduralTexture.fragment";
export declare class MarbleProceduralTexture extends ProceduralTexture {
    private _numberOfTilesHeight;
    private _numberOfTilesWidth;
    private _amplitude;
    private _jointColor;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get numberOfTilesHeight(): number;
    set numberOfTilesHeight(value: number);
    get amplitude(): number;
    set amplitude(value: number);
    get numberOfTilesWidth(): number;
    set numberOfTilesWidth(value: number);
    get jointColor(): Color3;
    set jointColor(value: Color3);
    /**
     * Serializes this marble procedural texture
     * @returns a serialized marble procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Marble Procedural Texture from parsed marble procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing marble procedural texture information
     * @returns a parsed Marble Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): MarbleProceduralTexture;
}
