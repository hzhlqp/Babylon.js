import { Color3 } from "core/Maths/math.color";
import type { Texture } from "core/Materials/Textures/texture";
import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import type { Scene } from "core/scene";
import type { Nullable } from "core/types";
import "./roadProceduralTexture.fragment";
export declare class RoadProceduralTexture extends ProceduralTexture {
    private _roadColor;
    constructor(name: string, size: number, scene?: Nullable<Scene>, fallbackTexture?: Texture, generateMipMaps?: boolean);
    updateShaderUniforms(): void;
    get roadColor(): Color3;
    set roadColor(value: Color3);
    /**
     * Serializes this road procedural texture
     * @returns a serialized road procedural texture object
     */
    serialize(): any;
    /**
     * Creates a Road Procedural Texture from parsed road procedural texture data
     * @param parsedTexture defines parsed texture data
     * @param scene defines the current scene
     * @param rootUrl defines the root URL containing road procedural texture information
     * @returns a parsed Road Procedural Texture
     */
    static Parse(parsedTexture: any, scene: Scene, rootUrl: string): RoadProceduralTexture;
}
