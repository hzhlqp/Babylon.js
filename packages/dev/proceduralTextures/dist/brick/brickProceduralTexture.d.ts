import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./brickProceduralTexture.fragment";
export declare class BrickProceduralTexture extends ProceduralTexture {
    private _numberOfBricksHeight;
    private _numberOfBricksWidth;
    private _jointColor;
    private _brickColor;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get numberOfBricksHeight(): number;
    set numberOfBricksHeight(value: number);
    get numberOfBricksWidth(): number;
    set numberOfBricksWidth(value: number);
    get jointColor(): Color3;
    set jointColor(value: Color3);
    get brickColor(): Color3;
    set brickColor(value: Color3);
    /**
     * Serializes this brick procedural texture
     * @returns a serialized brick procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Brick Procedural Texture from parsed brick procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing brick procedural texture information
     * @returns a parsed Brick Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): BrickProceduralTexture;
}
